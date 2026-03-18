// const { io } = require("socket.io-client");

// const socket = io("http://localhost:5000");

// socket.on("connect", () => {
//   console.log("Connected:", socket.id);

//   // Join the test room with role as "host"
//   socket.emit("joinRoom", { roomId: "123", userId: "user1", role: "host" });

//   // Request to create transport (for now, placeholder)
//   socket.emit("createTransport", { roomId: "123", userId: "user1" });

//   // Emit produce (sending media)
//   socket.emit("produce", { roomId: "123", userId: "user1", kind: "video" });

//   // Request to consume media (for now, placeholder)
//   socket.emit("consume", { roomId: "123", userId: "user1" });
// });

// // Listen for new participant joining the room
// socket.on("newParticipant", (data) => {
//   console.log("New participant joined:", data);
// });

// // Listen for participant leaving the room
// socket.on("participantLeft", (data) => {
//   console.log("Participant left:", data);
// });

// // Listen for transport creation acknowledgment (placeholder)
// socket.on("transportCreated", (data) => {
//   console.log("Transport info received:", data);
// });

// // Listen for produce acknowledgment
// socket.on("produced", (data) => {
//   console.log("Produce acknowledged:", data);
// });

// // Listen for consume acknowledgment (placeholder)
// socket.on("consumed", (data) => {
//   console.log("Consume acknowledged:", data);
// });

const { io } = require("socket.io-client");

// Helper function to create a new test participant
function createTestParticipant(userId, role = "participant") {
  const socket = io("http://localhost:5000");

  socket.on("connect", () => {
    console.log(`[${userId}] Connected:`, socket.id);

    // Join the test room
    socket.emit("joinRoom", { roomId: "123", userId, role });

    // Request transport (placeholder)
    socket.emit("createTransport", { roomId: "123", userId });

    // Produce video & audio
    ["video", "audio"].forEach((kind) => {
      socket.emit("produce", { roomId: "123", userId, kind });
    });

    // Consume others' media (placeholder)
    socket.emit("consume", { roomId: "123", userId });
  });

  // Listen for new participants
  socket.on("newParticipant", (data) => {
    console.log(`[${userId}] New participant joined:`, data);
    // Automatically consume their media
    socket.emit("consume", { roomId: "123", userId });
  });

  // Listen for participant leaving
  socket.on("participantLeft", (data) => {
    console.log(`[${userId}] Participant left:`, data);
  });

  socket.on("transportCreated", (data) => {
    console.log(`[${userId}] Transport info received:`, data);
  });

  socket.on("produced", (data) => {
    console.log(`[${userId}] Produce acknowledged:`, data);
  });

  socket.on("consumed", (data) => {
    console.log(`[${userId}] Consume acknowledged:`, data);
  });
}

// ✅ Create multiple test participants
createTestParticipant("user1", "host");
createTestParticipant("user2");
createTestParticipant("user3");