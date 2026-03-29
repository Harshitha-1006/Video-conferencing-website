import React, { useContext } from "react";
import { Box, IconButton } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { MeetingContext } from "../context/MeetingContext";

const ControlBar = () => {

  const { micOn, cameraOn, toggleMic, toggleCamera, leaveRoom } = useContext(MeetingContext);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        gap: 3,
      }}
    >
      <IconButton color="secondary" onClick={toggleMic}>
        {micOn ? <MicIcon /> : <MicOffIcon />}
      </IconButton>

      <IconButton color="secondary" onClick={toggleCamera}>
        {cameraOn ? <VideocamIcon /> : <VideocamOffIcon />}
      </IconButton>

      <IconButton color="error" onClick={leaveRoom}>
        <CallEndIcon />
      </IconButton>
    </Box>
  );
};

export default ControlBar;