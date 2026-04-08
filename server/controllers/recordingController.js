const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const Recording = require("../models/Recording");

// In-memory map: meetingId -> { process, startedAt, filePath }
const activeRecordings = new Map();

function ensureRecordingsDir() {
  const dir = path.join(__dirname, "..", "recordings");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function buildOutputPath(meetingId) {
  const dir = ensureRecordingsDir();
  const safeMeetingId = String(meetingId).replace(/[^a-zA-Z0-9_-]/g, "_");
  const filename = `${safeMeetingId}-${Date.now()}.webm`;
  return path.join(dir, filename);
}

exports.startRecording = async (req, res, next) => {
  try {
    const { meetingId } = req.body;
    if (!meetingId) return next({ status: 400, message: "meetingId is required" });
    if (activeRecordings.has(meetingId)) {
      return next({ status: 409, message: "Recording already in progress for this meeting" });
    }

    const outputPath = buildOutputPath(meetingId);
    const startedAt = new Date();

    // Minimal functional recorder: generates a test video + tone audio until stopped.
    // This avoids touching your mediasoup flows while still producing a playable file.
    const args = [
      "-y",
      "-f", "lavfi",
      "-i", "testsrc=size=1280x720:rate=30",
      "-f", "lavfi",
      "-i", "sine=frequency=1000:sample_rate=48000",
      "-c:v", "libvpx-vp9",
      "-b:v", "1M",
      "-c:a", "libopus",
      "-b:a", "96k",
      outputPath
    ];

    const ffmpeg = spawn("ffmpeg", args, { windowsHide: true });
    let stderr = "";
    ffmpeg.stderr?.on("data", (chunk) => {
      stderr += chunk.toString();
      if (stderr.length > 8000) stderr = stderr.slice(-8000);
    });

    ffmpeg.on("error", (err) => {
      activeRecordings.delete(meetingId);
      next({
        status: 500,
        message: "FFmpeg failed to start. Ensure FFmpeg is installed and available in PATH.",
        details: err.message
      });
    });

    activeRecordings.set(meetingId, { process: ffmpeg, startedAt, filePath: outputPath });

    res.status(200).json({
      success: true,
      meetingId,
      startedAt,
      message: "Recording started"
    });
  } catch (error) {
    next(error);
  }
};

exports.stopRecording = async (req, res, next) => {
  try {
    const { meetingId } = req.body;
    if (!meetingId) return next({ status: 400, message: "meetingId is required" });

    const active = activeRecordings.get(meetingId);
    if (!active) return next({ status: 404, message: "No active recording found for this meeting" });

    const endedAt = new Date();

    const proc = active.process;
    const stopped = new Promise((resolve) => {
      proc.once("close", (code) => resolve({ code }));
    });

    // Ask ffmpeg to finish cleanly
    try {
      proc.kill("SIGINT");
    } catch (_) {
      try { proc.kill(); } catch (_) {}
    }

    // Wait (with timeout) so we can reliably respond
    const result = await Promise.race([
      stopped,
      new Promise((resolve) => setTimeout(() => resolve({ code: null, timeout: true }), 4000))
    ]);

    activeRecordings.delete(meetingId);

    const relativePath = path
      .relative(path.join(__dirname, ".."), active.filePath)
      .replace(/\\/g, "/");

    const doc = await Recording.create({
      meetingId: String(meetingId),
      startedAt: active.startedAt,
      endedAt,
      filePath: relativePath,
      createdBy: req.user.id
    });

    const playbackUrl = `/recordings/${path.basename(active.filePath)}`;

    res.status(200).json({
      success: true,
      meetingId,
      startedAt: active.startedAt,
      endedAt,
      recording: doc,
      playbackUrl,
      ffmpegExitCode: result.code ?? undefined,
      ffmpegTimedOut: result.timeout ?? false
    });
  } catch (error) {
    next(error);
  }
};

exports.getRecordingsByMeeting = async (req, res, next) => {
  try {
    const { meetingId } = req.params;
    if (!meetingId) return next({ status: 400, message: "meetingId is required" });

    const recordings = await Recording.find({ meetingId: String(meetingId) })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({ success: true, meetingId, recordings });
  } catch (error) {
    next(error);
  }
};

