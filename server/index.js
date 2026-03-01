const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Direct Mongo URI
const MONGO_URI = "mongodb://localhost:27017/video_conferencing";

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB (no extra options needed in Mongoose 7+)
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));