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

// MIDDLEWARE
app.use(cors());
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

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));