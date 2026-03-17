const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Room = require("../models/Room");

// Create room
router.post("/create", authMiddleware, async (req, res) => {

  try {

    const room = new Room({
      name: req.body.name,
      participants: [req.user.id]
    });

    await room.save();

    res.status(201).json({
      message: "Room created successfully",
      room
    });

  } catch (error) {

    res.status(500).json({
      message: "Error creating room",
      error: error.message
    });

  }

});

// Get all rooms
router.get("/", authMiddleware , async (req, res) => {
  try {
    const rooms = await Room.find().populate("participants");

    res.status(200).json(rooms);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching rooms",
      error: error.message
    });
  }
});

module.exports = router;