import { Device } from "mediasoup-client";
import socket from "../socket";

let device;
let sendTransport;

export const loadDevice = async (routerRtpCapabilities) => {
  
  if (device && device.loaded) {
    return device; // prevent double load
  }

  device = new Device();

  await device.load({
    routerRtpCapabilities,
  });

  console.log("Device loaded:", device.rtpCapabilities);

  return device;
};

export const createSendTransport = async () => {
  return new Promise((resolve) => {
    socket.emit("createTransport", { type: "send" }, async (data) => {
      const transport = device.createSendTransport(data);

      transport.on("connect", ({ dtlsParameters }, callback, errback) => {
        socket.emit("connectTransport", {
          dtlsParameters,
          transportId: transport.id,
        });

        callback();
      });

      transport.on("produce", async (parameters, callback, errback) => {
        socket.emit(
          "produce",
          {
            transportId: transport.id,
            kind: parameters.kind,
            rtpParameters: parameters.rtpParameters,
          },
          ({ id }) => {
            callback({ id });
          }
        );
      });

      sendTransport = transport;
      resolve(transport);
    });
  });
};


export const createRecvTransport = async () => {
  return new Promise((resolve) => {
    socket.emit("createTransport", { type: "recv" }, (data) => {
      const transport = device.createRecvTransport(data);

      transport.on("connect", ({ dtlsParameters }, callback, errback) => {
        socket.emit("connectTransport", {
          transportId: transport.id,
          dtlsParameters,
        });
        callback();
      });

      resolve(transport);
    });
  });
};


export const consume = async (transport, producerId) => {
  return new Promise((resolve) => {
    socket.emit(
      "consume",
      {
        rtpCapabilities: device.rtpCapabilities,
        producerId,
      },
      async (data) => {
        const consumer = await transport.consume({
          id: data.id,
          producerId: data.producerId,
          kind: data.kind,
          rtpParameters: data.rtpParameters,
        });

        const stream = new MediaStream();
        stream.addTrack(consumer.track);

        resolve(stream);
      }
    );
  });
};


export const getSendTransport = () => sendTransport;
export const getDevice = () => device;