module.exports = (io) => {
  const rooms = {}; // in-memory storage

  io.on("connection", (socket) => {
    console.log("New socket connected:", socket.id);

    // Join room
    socket.on("joinRoom", ({ roomId, userId, role }) => {
      if (!rooms[roomId]) rooms[roomId] = { participants: {} };

      rooms[roomId].participants[socket.id] = { userId, role };
      socket.join(roomId);

      console.log(`${userId} joined room ${roomId}`);
      console.log("Current room participants:", rooms[roomId].participants);

      // Notify existing participants
      socket.to(roomId).emit("newParticipant", { socketId: socket.id, userId, role });

      // 🔹 Notify all existing participants to "consume" this new participant
      Object.keys(rooms[roomId].participants).forEach((socketId) => {
        if (socketId !== socket.id) {
          io.to(socketId).emit("consumed", {
            success: true,
            message: `Ready to receive media from ${userId}`,
            producerId: socket.id,
            kind: "video/audio", // dummy info
          });
        }
      });

      // Create transport (placeholder)
      socket.on("createTransport", async ({ roomId, userId }) => {
        console.log(`Transport requested by ${userId} in room ${roomId}`);
        socket.emit("transportCreated", { transportId: "dummy-transport-id" });
      });

      // Produce event (sending media)
      socket.on("produce", ({ roomId, userId, kind }) => {
        console.log(`${userId} wants to produce ${kind} in room ${roomId}`);
        socket.emit("produced", { success: true, kind });
      });

      // Consume event (receive media)
      socket.on("consume", ({ roomId, userId }) => {
        console.log(`${userId} requested to consume media in room ${roomId}`);
        socket.emit("consumed", { success: true, message: "Ready to receive media" });
      });
    });

    // Disconnect cleanup
    socket.on("disconnect", () => {
      for (const roomId in rooms) {
        if (rooms[roomId].participants[socket.id]) {
          const user = rooms[roomId].participants[socket.id];
          delete rooms[roomId].participants[socket.id];

          socket.to(roomId).emit("participantLeft", { socketId: socket.id, userId: user.userId });

          if (Object.keys(rooms[roomId].participants).length === 0) {
            delete rooms[roomId];
          }
        }
      }
      console.log("Socket disconnected:", socket.id);
    });
  });
};