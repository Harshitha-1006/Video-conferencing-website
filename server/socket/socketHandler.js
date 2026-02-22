module.exports = (io, router) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("getRouterRtpCapabilities", (callback) => {
      callback(router.rtpCapabilities);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
