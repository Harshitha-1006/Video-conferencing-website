import React, { useEffect, useRef, useState } from "react";
import socket from "../socket";
import { loadDevice, createSendTransport } from "../webrtc/device";

const MeetingRoom = () => {
  const [deviceReady, setDeviceReady] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    socket.emit("getRouterRtpCapabilities", async (routerRtpCapabilities) => {
      await loadDevice(routerRtpCapabilities);
      setDeviceReady(true);
    });
  }, []);

  const startCamera = async () => {
    const transport = await createSendTransport();

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    // 🎥 Show local preview
    videoRef.current.srcObject = stream;

    const track = stream.getVideoTracks()[0];

    await transport.produce({
      track,
    });

    console.log("🎥 Camera Streaming Started");
  };

  return (
    <div>
      <h2>Meeting Room</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width="400"
      />

      {deviceReady && (
        <button onClick={startCamera}>
          Start Camera
        </button>
      )}
    </div>
  );
};

export default MeetingRoom;