import React, { createContext, useState } from "react";

// Create context
export const MeetingContext = createContext();

// Provider
export const MeetingProvider = ({ children }) => {
  // Meeting state
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [participants, setParticipants] = useState([]);

  // User state
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [roomId, setRoomId] = useState("");

  // Handlers
  const toggleMic = () => setMicOn(!micOn);
  const toggleCamera = () => setCameraOn(!cameraOn);
  const leaveRoom = () => {
    window.location.href = "/dashboard";
  };

  return (
    <MeetingContext.Provider
      value={{
        micOn,
        cameraOn,
        participants,
        setParticipants,
        toggleMic,
        toggleCamera,
        leaveRoom,
        user,
        setUser,
        token,
        setToken,
        roomId,
        setRoomId,
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};