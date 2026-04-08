const File = require("../models/File");
const logger = require("../logger");
exports.uploadFile = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newFile = new File({
      filename: req.file.filename,
      originalname: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      roomId: req.body.roomId,
      uploadedBy: req.user.id, // from auth middleware
    });

    await newFile.save();

    res.status(200).json({
      message: "File uploaded successfully",
      file: newFile,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: "File upload failed",
      error: error.message,
    });
  }
};