module.exports = (io, router) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    let transport;

    socket.on("getRouterRtpCapabilities", (callback) => {
      callback(router.rtpCapabilities);
    });

    socket.on("createTransport", async ({ type }, callback) => {
      transport = await router.createWebRtcTransport({
        listenIps: [{ ip: "0.0.0.0", announcedIp: null }],
        enableUdp: true,
        enableTcp: true,
        preferUdp: true,
      });

      callback({
        id: transport.id,
        iceParameters: transport.iceParameters,
        iceCandidates: transport.iceCandidates,
        dtlsParameters: transport.dtlsParameters,
      });
    });

    socket.on("connectTransport", async ({ transportId, dtlsParameters }) => {
      await transport.connect({ dtlsParameters });
    });

    
    socket.on("produce", async ({ transportId, kind, rtpParameters }, callback) => {
      const producer = await transport.produce({
        kind,
        rtpParameters,
      });

      console.log("Producer created:", producer.id);

      callback({ id: producer.id });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
