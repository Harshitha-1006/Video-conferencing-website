const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const { createWorker } = require("./mediasoup/worker");
const { createRouter } = require("./mediasoup/router");
const socketHandler = require("./socket/socketHandler");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let worker;
let router;

(async () => {
  worker = await createWorker();
  router = await createRouter(worker);

  socketHandler(io, router);

  server.listen(5000, () => {
    console.log("Server running on port 5000");
  });
})();