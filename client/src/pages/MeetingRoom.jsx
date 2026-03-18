import React, { useEffect, useRef, useState } from "react";
import { socket } from "../socket";

const MeetingRoom = () => {
  const localVideoRef = useRef(null);
  const [remoteVideos, setRemoteVideos] = useState({}); // store remote streams keyed by socketId
  const [participants, setParticipants] = useState({}); // store participant info by socketId

  useEffect(() => {
    // 🎥 Get camera + mic
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    })
    .then((stream) => {
      console.log("Got media stream");

      // Attach stream to local video element
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // 🔥 Send produce event for video and audio
      ["video", "audio"].forEach((kind) => {
        socket.emit("produce", {
          roomId: "123",
          userId: "user1",
          kind,
        });
      });
    })
    .catch((err) => {
      console.error("Error accessing media devices:", err);
    });

    // 🔌 Socket connection
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected:", socket.id);

      // Join room as host
      socket.emit("joinRoom", {
        roomId: "123",
        userId: "user1",
        role: "host",
      });
    });

    // New participant joined
    socket.on("newParticipant", (data) => {
      console.log("New participant joined:", data);

      // Save participant info
      setParticipants((prev) => ({
        ...prev,
        [data.socketId]: data,
      }));

      // Automatically request to consume their media
      socket.emit("consume", { roomId: "123", userId: "user1", producerId: data.socketId });
    });

    // Participant left
    socket.on("participantLeft", (data) => {
      console.log("Participant left:", data);
      setRemoteVideos((prev) => {
        const updated = { ...prev };
        delete updated[data.socketId];
        return updated;
      });
      setParticipants((prev) => {
        const updated = { ...prev };
        delete updated[data.socketId];
        return updated;
      });
    });

    // Consume event
    socket.on("consumed", (data) => {
      console.log("✅ Consumed:", data);

      // For now, use a dummy MediaStream for each remote participant
      const dummyStream = new MediaStream();

      setRemoteVideos((prev) => ({
        ...prev,
        [data.producerId || `remote-${Date.now()}`]: dummyStream,
      }));
    });

    // Produce confirmation
    socket.on("produced", (data) => {
      console.log("✅ Produced:", data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Meeting Room</h2>

      {/* 🎥 Local Video */}
      <div style={{ marginBottom: "20px" }}>
        <strong>You (host)</strong>
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          style={{ width: "400px", border: "2px solid black", marginTop: "5px" }}
        />
      </div>

      {/* 🎥 Remote Videos */}
      {Object.entries(remoteVideos).map(([id, stream]) => (
        <div key={id} style={{ marginBottom: "20px" }}>
          <strong>{participants[id]?.userId || "Remote"}</strong>
          <video
            autoPlay
            playsInline
            style={{ width: "400px", border: "2px solid blue", marginTop: "5px" }}
            ref={(videoEl) => {
              if (videoEl && stream) videoEl.srcObject = stream;
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default MeetingRoom;