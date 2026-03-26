import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { MeetingContext } from "../context/MeetingContext";

const Navbar = () => {

  const { participants } = useContext(MeetingContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ display: "flex", justifyContent: "space-between", backgroundColor:"purple" }}>

        <Typography variant="h6">
          Mediasoup Meeting
        </Typography>

        <Typography>
          Participants: {participants.length}
        </Typography>

        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;