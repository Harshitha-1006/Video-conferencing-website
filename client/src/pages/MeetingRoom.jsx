// src/pages/MeetingRoom.jsx
import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Typography, Box, Grid, Paper, CircularProgress, Alert } from "@mui/material";
import { MeetingContext } from "../context/MeetingContext";
import { socket } from "../socket";

import Navbar from "../components/Navbar";
import VideoTile from "../components/VideoTile";
import ControlBar from "../components/ControlBar";

const MeetingRoom = () => {
  const { roomId, user } = useContext(MeetingContext);

  const [participants, setParticipants] = useState([]);
  const [files, setFiles] = useState([]);
  const [newFile, setNewFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => setDarkMode(!darkMode);

  // Socket.io: join room, manage participants & files
  useEffect(() => {
    if (!roomId || !user) {
      setError("Missing room or user information");
      setLoading(false);
      return;
    }

    try {
      // Join room
      socket.emit("joinRoom", { roomId, userId: user.email, role: "participant" });

      // New participant joined
      socket.on("newParticipant", (data) => {
        setParticipants((prev) => [...prev, data]);
      });

      // Participant left
      socket.on("participantLeft", (data) => {
        setParticipants((prev) => prev.filter((p) => p.socketId !== data.socketId));
      });

      // New file uploaded
      socket.on("newFile", (file) => {
        setFiles((prev) => [...prev, file]);
      });

      // Add self
      setParticipants([{ socketId: "self", userId: user.email, name: "You" }]);

      // Simulate loading for UX
      setTimeout(() => setLoading(false), 800);

    } catch (err) {
      console.error(err);
      setError("Failed to join meeting");
      setLoading(false);
    }

    return () => {
      socket.off("newParticipant");
      socket.off("participantLeft");
      socket.off("newFile");
    };
  }, [roomId, user]);

  // File upload handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewFile(file);

    // Emit file upload
    socket.emit("fileUploaded", { roomId, file: { name: file.name, size: file.size } });
    setFiles((prev) => [...prev, { name: file.name, size: file.size }]);
  };

  // Placeholder media controls
  const handleProduce = (kind) => socket.emit("produce", { roomId, userId: user.email, kind });
  const handleConsume = () => socket.emit("consume", { roomId, userId: user.email });
  const handleCreateTransport = () => socket.emit("createTransport", { roomId, userId: user.email });

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
          color: "white"
        }}
      >
        <CircularProgress color="secondary" size={60} />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Joining meeting...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000"
        }}
      >
        <Alert severity="error" sx={{ width: "400px" }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <>
      <Navbar />

      <Box
        sx={{
          backgroundColor: darkMode ? "black" : "white",
          minHeight: "100vh",
          position: "relative",
          margin: 0,
          paddingTop: "80px"
        }}
      >
        {/* Theme Toggle */}
        <Button
          variant="contained"
          onClick={toggleTheme}
          color="secondary"
          sx={{ position: "absolute", top: 20, right: 20 }}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>

        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom sx={{ color: darkMode ? "white" : "black" }}>
            Meeting Room: {roomId}
          </Typography>

          {/* Participants Video Grid */}
          <Grid container spacing={2}>
            {participants.length > 0 ? (
              participants.map((p) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={p.socketId}>
                  <VideoTile name={p.name || p.userId} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Paper
                  sx={{
                    height: "200px",
                    backgroundColor: darkMode ? "#333" : "#ddd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: darkMode ? "white" : "black"
                  }}
                >
                  No participants yet
                </Paper>
              </Grid>
            )}
          </Grid>

          <ControlBar />

          {/* Files Section */}
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h6" sx={{ color: darkMode ? "white" : "black" }}>
              Files in this room:
            </Typography>
            <ul>
              {files.map((f, i) => (
                <li key={i}>{f.name} ({f.size} bytes)</li>
              ))}
            </ul>
            <input type="file" onChange={handleFileUpload} />
          </Box>

          {/* Media Controls */}
          <Box sx={{ marginTop: 4 }}>
            <Button variant="outlined" sx={{ mr: 2 }} onClick={handleCreateTransport}>
              Create Transport
            </Button>
            <Button variant="outlined" sx={{ mr: 2 }} onClick={() => handleProduce("video")}>
              Produce Video
            </Button>
            <Button variant="outlined" sx={{ mr: 2 }} onClick={() => handleProduce("audio")}>
              Produce Audio
            </Button>
            <Button variant="outlined" onClick={handleConsume}>
              Consume Media
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MeetingRoom;