const mongoose = require("mongoose");

const recordingSchema = new mongoose.Schema(
  {
    meetingId: { type: String, required: true, index: true },
    startedAt: { type: Date, required: true },
    endedAt: { type: Date, required: true },
    filePath: { type: String, required: true }, // relative to server root
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recording", recordingSchema);

