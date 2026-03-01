import React, { useEffect, useRef, useState } from "react";
import socket from "../socket";
import {
  loadDevice,
  createSendTransport,
  createRecvTransport,
  consume
} from "../webrtc/device";

const MeetingRoom = () => {

  const [deviceReady, setDeviceReady] = useState(false);
  const [remoteStreams, setRemoteStreams] = useState([]); // ✅ moved here
  const videoRef = useRef(null);

  useEffect(() => {
    socket.emit("getRouterRtpCapabilities", async (routerRtpCapabilities) => {
      await loadDevice(routerRtpCapabilities);
      setDeviceReady(true);
    });
  }, []);

  // ✅ moved inside component
  useEffect(() => {
    socket.on("new-producer", async ({ producerId }) => {
      const recvTransport = await createRecvTransport();
      const stream = await consume(recvTransport, producerId);

      setRemoteStreams(prev => [...prev, stream]);
    });

    // cleanup to prevent duplicate listeners
    return () => {
      socket.off("new-producer");
    };
  }, []);
  
  useEffect(() => {
    socket.emit("getProducers", async (producerIds) => {
      for (const producerId of producerIds) {
        const recvTransport = await createRecvTransport();
        const stream = await consume(recvTransport, producerId);

        setRemoteStreams((prev) => [...prev, stream]);
      }
    });
  }, [deviceReady]);

  const startCamera = async () => {
    const transport = await createSendTransport();

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    videoRef.current.srcObject = stream;

    const track = stream.getVideoTracks()[0];

    await transport.produce({ track });

    console.log("🎥 Camera Streaming Started");
  };

  return (
    <div>
      <h2>Meeting Room</h2>

      {/* Local Video */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width="400"
      />

      {/* Remote Videos */}
      {remoteStreams.map((stream, index) => (
        <video
          key={index}
          autoPlay
          playsInline
          width="300"
          ref={(el) => {
            if (el) el.srcObject = stream;
          }}
        />
      ))}

      {deviceReady && (
        <button onClick={startCamera}>
          Start Camera
        </button>
      )}
    </div>
  );
};

export default MeetingRoom;