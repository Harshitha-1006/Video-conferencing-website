import "./MeetingRoom.css";
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
  const recvTransportRef = useRef(null);
  const joinedRef = useRef(false);
  useEffect(() => {

    const handleNewProducer = async ({ producerId }) => {
      if (!recvTransportRef.current) return;

      const stream = await consume(
        recvTransportRef.current,
        producerId
      );

      setRemoteStreams(prev => [...prev, stream]);
    };

      if (joinedRef.current) return;
      joinedRef.current = true;
    
      socket.emit("joinRoom", { room: "test-room" }, async (routerRtpCapabilities) => {
        await loadDevice(routerRtpCapabilities);
        setDeviceReady(true);

        const waitForTransport = () =>
          new Promise(resolve => {
            const interval = setInterval(() => {
              if (recvTransportRef.current) {
                clearInterval(interval);
                resolve(true);
              }
            }, 50);
          });

        await waitForTransport();
        socket.emit("getProducers", async (producerIds) => {
          for (const producerId of producerIds) {
            if (!recvTransportRef.current) return;

            const stream = await consume(
              recvTransportRef.current,
              producerId
            );

            setRemoteStreams(prev => [...prev, stream]);
          }
        });
      });

      socket.on("new-producer", handleNewProducer);

    // ✅ Cleanup
      return () => {
        socket.off("new-producer", handleNewProducer);
      };

    }, []);

  // ✅ moved inside component
  useEffect(() => {
    const setupRecvTransport = async () => {
      if (!deviceReady) return;

      recvTransportRef.current = await createRecvTransport();
      console.log("✅ Recv Transport Created Once");
    };

    setupRecvTransport();
  }, [deviceReady]);

  const startCamera = async () => {
    const transport = await createSendTransport();

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    videoRef.current.srcObject = stream;

    stream.getTracks().forEach(track => {
      transport.produce({ track });
    });

    console.log("🎥 Camera Streaming Started");
  };

  return (
    <div className="meeting-container">

      <h2>Meeting Room</h2>

      <div className="video-grid">

        {/* Local Video */}
        <div className="video-tile">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
          />
        </div>

        {/* Remote Videos */}
        {remoteStreams.map((stream, index) => (
          <div key={index} className="video-tile">
            <video
              autoPlay
              playsInline
              ref={(el) => {
                if (el) el.srcObject = stream;
              }}
            />
          </div>
        ))}

      </div>

      <div className="controls">
        {deviceReady && (
          <button onClick={startCamera}>
            Start Camera
          </button>
        )}
      </div>

    </div>
  );
};

export default MeetingRoom;