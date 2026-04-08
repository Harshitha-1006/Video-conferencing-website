// src/pages/Dashboard.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MeetingContext } from "../context/MeetingContext";
import { Container, Button, Typography, Box, TextField } from "@mui/material";

const Dashboard = () => {
  const { roomId, setRoomId, user } = useContext(MeetingContext);
  const [darkMode, setDarkMode] = useState(true);
  const [inputRoomId, setInputRoomId] = useState("");
  const navigate = useNavigate();

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleJoinRoom = () => {
    if (!inputRoomId) {
      alert("Enter a room ID");
      return;
    }
    setRoomId(inputRoomId);
    navigate("/meeting"); // redirect to MeetingRoom
  };

  const handleCreateMeeting = () => {
    // You can implement room creation logic here
    const newRoomId = "room-" + Math.floor(Math.random() * 10000);
    setRoomId(newRoomId);
    navigate("/meeting");
  };

  return (
    <Box
      sx={{
        backgroundColor: darkMode ? "black" : "white",
        minHeight: "100vh",
        position: "relative",
        margin: 0,
        paddingTop: "100px"
      }}
    >
      {/* Theme Button */}
      <Button
        variant="contained"
        onClick={toggleTheme}
        color="secondary"
        sx={{ position: "absolute", top: 20, right: 20 }}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </Button>

      <Container maxWidth="sm">
        <Typography
          variant="h3"
          sx={{ color: darkMode ? "white" : "black", marginBottom: "20px", textAlign:"center" }}
        >
          Welcome to Meet, {user?.email || "User"}!
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Join Meeting */}
          <Box sx={{ display: "flex", mb: 3 }}>
            <TextField
              label="Enter Room ID"
              variant="outlined"
              value={inputRoomId}
              onChange={(e) => setInputRoomId(e.target.value)}
              sx={{ mr: 2, backgroundColor: darkMode ? "#333" : "#fff" }}
            />
            <Button variant="contained" color="secondary" onClick={handleJoinRoom}>
              Join
            </Button>
          </Box>

          {/* Create Meeting */}
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "200px", padding: "10px" }}
            onClick={handleCreateMeeting}
          >
            Create Meeting
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;