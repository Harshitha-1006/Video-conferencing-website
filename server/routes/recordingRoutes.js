const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  startRecording,
  stopRecording,
  getRecordingsByMeeting
} = require("../controllers/recordingController");

router.post("/start", authMiddleware, startRecording);
router.post("/stop", authMiddleware, stopRecording);
router.get("/:meetingId", authMiddleware, getRecordingsByMeeting);

module.exports = router;

