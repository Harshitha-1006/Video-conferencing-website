const mediasoup = require("mediasoup");

async function createWorker() {
  const worker = await mediasoup.createWorker();

  console.log("Mediasoup Worker created");

  return worker;
}

module.exports = { createWorker };