import React, { useEffect } from "react";
import socket from "../socket";

const MeetingRoom = () => {
  useEffect(() => {
    socket.emit("getRouterRtpCapabilities", (data) => {
      console.log("Router RTP Capabilities:", data);
    });
  }, []);

  return (
    <div>
      <h2>Meeting Room</h2>
      <p>Check console for router capabilities</p>
    </div>
  );
};

export default MeetingRoom;