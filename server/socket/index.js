const logger = require("../logger");
module.exports = (io) => {
  const rooms = {}; // in-memory storage
  io.on("connection", (socket) => {
    logger.info("New socket connected:", socket.id);

    // Join room
    socket.on("joinRoom", ({ roomId, userId, role }) => {
      if (!rooms[roomId]) {
        rooms[roomId] = { participants: {} };
      }

      // Store user info on socket (IMPORTANT for cleanup)
      socket.roomId = roomId;
      socket.userId = userId;

      rooms[roomId].participants[socket.id] = { userId, role };
      socket.join(roomId);

      logger.info(`${userId} joined room ${roomId}`);
      logger.info("Participants:", rooms[roomId].participants);

      // Notify others
      socket.to(roomId).emit("newParticipant", {
        socketId: socket.id,
        userId,
        role,
      });

      // Notify existing users to consume media
      Object.keys(rooms[roomId].participants).forEach((socketId) => {
        if (socketId !== socket.id) {
          io.to(socketId).emit("consumed", {
            success: true,
            message: `Ready to receive media from ${userId}`,
            producerId: socket.id,
            kind: "video/audio",
          });
        }
      });
    });

    // Create transport
    socket.on("createTransport", ({ roomId, userId }) => {
      logger.info(`Transport requested by ${userId} in room ${roomId}`);
      socket.emit("transportCreated", {
        transportId: "dummy-transport-id",
      });
    });

    // Produce media
    socket.on("produce", ({ roomId, userId, kind }) => {
      logger.info(`${userId} producing ${kind} in room ${roomId}`);
      socket.emit("produced", { success: true, kind });
    });

    // Consume media
    socket.on("consume", ({ roomId, userId }) => {
      logger.info(`${userId} consuming media in room ${roomId}`);
      socket.emit("consumed", {
        success: true,
        message: "Ready to receive media",
      });
    });

    // File upload
    socket.on("fileUploaded", ({ roomId, file }) => {
      logger.info(`File uploaded in room ${roomId}:`, file);
      socket.to(roomId).emit("newFile", file);
    });

    // ✅ Improved Disconnect Cleanup
    socket.on("disconnect", () => {
      const roomId = socket.roomId;
      const userId = socket.userId;

      if (!roomId || !rooms[roomId]) {
        logger.info("Socket disconnected:", socket.id);
        return;
      }

      // Remove user
      delete rooms[roomId].participants[socket.id];

      // Notify others
      socket.to(roomId).emit("participantLeft", {
        socketId: socket.id,
        userId,
      });

      logger.info(`${userId} left room ${roomId}`);

      // Delete room if empty
      if (Object.keys(rooms[roomId].participants).length === 0) {
        delete rooms[roomId];
        logger.info(`Room ${roomId} deleted (empty)`);
      }

      logger.info("Socket disconnected:", socket.id);
    });
  });
};