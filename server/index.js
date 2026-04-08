const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, ".env")
});

const fs = require("fs");
console.log("DIRNAME:", __dirname);
console.log("ENV PATH:", path.resolve(__dirname, ".env"));
console.log("ENV EXISTS:", fs.existsSync(path.resolve(__dirname, ".env")));
console.log("ENV CHECK:", process.env.MONGO_URI);

const express = require("express");
const app = express(); // ✅ CREATE EXPRESS APP HERE
const cors = require("cors");
const mongoose = require("mongoose");
const roomRoutes = require("./routes/roomRoutes");
const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileRoutes");
const recordingRoutes = require("./routes/recordingRoutes");
const errorHandler = require("./middleware/errorHandler");
const http = require("http");
const { Server } = require("socket.io");

// MIDDLEWARE
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/recordings", express.static(path.join(__dirname, "recordings")));
app.use(express.json());

// Use ENV variables
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

// Debug check
console.log("ENV CHECK:", MONGO_URI);

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/recordings", recordingRoutes);
app.use((req, res, next) => {
  next({ status: 404, message: "Route not found" });
});
app.use(errorHandler);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // later replace with frontend URL
  },
});
require("./socket/index")(io);

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});