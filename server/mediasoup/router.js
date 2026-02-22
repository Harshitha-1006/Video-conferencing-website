async function createRouter(worker) {
  const mediaCodecs = [
    {
      kind: "audio",
      mimeType: "audio/opus",
      clockRate: 48000,
      channels: 2,
    },
    {
      kind: "video",
      mimeType: "video/VP8",
      clockRate: 90000,
      parameters: {},
    },
  ];

  const router = await worker.createRouter({ mediaCodecs });

  console.log("Mediasoup Router created");

  return router;
}

module.exports = { createRouter };