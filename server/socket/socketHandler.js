const rooms = {};

module.exports = (io, router) => {
  let transports = [];
  let producers = [];
  let consumers = [];
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    let roomName;

    // ---------------------------------------------------
    // Get Router Capabilities
    // ---------------------------------------------------
    socket.on("getRouterRtpCapabilities", (callback) => {
      callback(router.rtpCapabilities);
    });

    socket.on("joinRoom", ({ room }, callback) => {

      roomName = room;

      socket.join(roomName);

      if (!rooms[roomName]) {
        rooms[roomName] = [];
      }

      rooms[roomName].push(socket.id);

      console.log(`User ${socket.id} joined room ${roomName}`);

      callback(router.rtpCapabilities);

    });

    // ---------------------------------------------------
    // Get Existing Producers (For New User)
    // ---------------------------------------------------
    socket.on("getProducers", (callback) => {

      const producerList = producers
        .filter(p => p.socketId !== socket.id && rooms[roomName]?.includes(p.socketId))
        .map(p => p.producer.id);

      callback(producerList);

    });

    // ---------------------------------------------------
    // Create Transport
    // ---------------------------------------------------
    socket.on("createTransport", async ({ type }, callback) => {
      const transport = await router.createWebRtcTransport({
        listenIps: [{ ip: "0.0.0.0", announcedIp: null }],
        enableUdp: true,
        enableTcp: true,
        preferUdp: true,
      });

      transports.push({
        socketId: socket.id,
        transport,
        type,
      });

      callback({
        id: transport.id,
        iceParameters: transport.iceParameters,
        iceCandidates: transport.iceCandidates,
        dtlsParameters: transport.dtlsParameters,
      });
    });

    // ---------------------------------------------------
    // Connect Transport
    // ---------------------------------------------------
    socket.on("connectTransport", async ({ transportId, dtlsParameters }) => {
      const transportData = transports.find(
        (t) => 
          t.transport.id === transportId &&
          t.socketId === socket.id
      );

      if (!transportData) return;

      await transportData.transport.connect({ dtlsParameters });
    });

    // ---------------------------------------------------
    // Produce (User Starts Streaming)
    // ---------------------------------------------------
    socket.on(
      "produce",
      async ({ transportId, kind, rtpParameters }, callback) => {
        const transportData = transports.find(
          (t) => t.transport.id === transportId
        );

        if (!transportData) return;

        const producer = await transportData.transport.produce({
          kind,
          rtpParameters,
        });

        producers.push({
          socketId: socket.id,
          producer,
        });

        console.log("Producer created:", producer.id);

        // ✅ Notify ALL other users
        socket.to(roomName).emit("new-producer", {
          producerId: producer.id,
        });

        callback({ id: producer.id });
      }
    );

    // ---------------------------------------------------
    // Consume (Receive Stream)
    // ---------------------------------------------------
    socket.on(
      "consume",
      async ({ rtpCapabilities, producerId }, callback) => {
        let transportData = transports.find(
          (t) => t.socketId === socket.id && t.type === "recv"
        );

        if (!transportData) {
          const transport = await router.createWebRtcTransport({
            listenIps: [{ ip: "0.0.0.0", announcedIp: null }],
            enableUdp: true,
            enableTcp: true,
            preferUdp: true,
        });
        transportData = {
          socketId: socket.id,
          transport,
          type: "recv",
        };
        transports.push(transportData);
      }

      if (!router.canConsume({ producerId, rtpCapabilities })) {
        console.error("Cannot consume");
        return callback({ error: "Cannot consume" });
      }

      const consumer = await transportData.transport.consume({
        producerId,
        rtpCapabilities,
        paused: false,
      });

      consumers.push({
        socketId: socket.id,
        consumer,
      });

      callback({
        id: consumer.id,
        producerId,
        kind: consumer.kind,
        rtpParameters: consumer.rtpParameters,
      });
    }
  );

    // ---------------------------------------------------
    // Cleanup on Disconnect
    // ---------------------------------------------------
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      // Close producers
      producers = producers.filter((p) => {
        if (p.socketId === socket.id) {

          // 🔥 Notify others
          io.emit("producer-closed", {
            producerId: p.producer.id,
          });

          p.producer.close();
          return false;
        }
        return true;
      });

      // Close transports
      transports = transports.filter((t) => {
        if (t.socketId === socket.id) {
          t.transport.close();
          return false;
        }
        return true;
      });

      // Close consumers
      consumers = consumers.filter((c) => {
        if (c.socketId === socket.id) {
          c.consumer.close();
          return false;
        }
        return true;
      });
    });
    
  });
};