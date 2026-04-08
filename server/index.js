const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, ".env")
});
const logger = require("./logger");
const fs = require("fs");
logger.info("DIRNAME:", __dirname);
logger.info("ENV PATH:", path.resolve(__dirname, ".env"));
logger.info("ENV EXISTS:", fs.existsSync(path.resolve(__dirname, ".env")));
logger.info("ENV CHECK:", process.env.MONGO_URI);

const express = require("express");
const app = express(); // ✅ CREATE EXPRESS APP HERE
const cors = require("cors");
const mongoose = require("mongoose");
const roomRoutes = require("./routes/roomRoutes");
const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileRoutes");
const http = require("http");
const { Server } = require("socket.io");
const rateLimit = require("express-rate-limit");
// MIDDLEWARE
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json());
// Use ENV variables
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

// Debug check
logger.info("ENV CHECK:", MONGO_URI);

// Connect to MongoDB
mongoose.connect(MONGO_URI)
.then(() => logger.info("MongoDB connected successfully!"))
.catch(err => logger.error("MongoDB connection error:", err));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per IP
  message: "Too many requests from this IP, please try again later.",
});

// Routes
app.use("/api/", apiLimiter);
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/files", fileRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // later replace with frontend URL
  },
});
require("./socket/index")(io);

app.use(cors({
  origin: "http://localhost:5173", // frontend Vite dev server
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Start server
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});