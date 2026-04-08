const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

roomSchema.index({ roomId: 1 });
roomSchema.index({ createdAt: 1 });

module.exports = mongoose.model("Room", roomSchema);