const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const { uploadFile } = require("../controllers/fileController");
const authMiddleware = require("../middleware/authMiddleware");

// POST /api/files/upload
router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  uploadFile
);

// ✅ New download route
router.get("/download/:id", authMiddleware, async (req, res) => {
  const File = require("../models/File");
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    res.download(file.path, file.originalname);
  } catch (err) {
    res.status(500).json({ message: "Download failed", error: err.message });
  }
});

module.exports = router;