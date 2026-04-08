import { useState, useContext, useEffect, useMemo } from "react"
import { Container, Button, Typography, Box, Grid, Paper, CircularProgress, Alert } from "@mui/material"
import { MeetingContext } from "../context/MeetingContext"


import Navbar from "../components/Navbar"
import VideoTile from "../components/VideoTile"
import ControlBar from "../components/ControlBar"

function MeetingRoom() {

  const { participants, setParticipants } = useContext(MeetingContext)

  const [darkMode, setDarkMode] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [recording, setRecording] = useState(false)
  const [recordingBusy, setRecordingBusy] = useState(false)
  const [recordingError, setRecordingError] = useState("")
  const [playbackUrl, setPlaybackUrl] = useState("")

  const meetingId = useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    return (
      params.get("roomId") ||
      localStorage.getItem("meetingId") ||
      "default-meeting"
    )
  }, [])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  // Temporary simulation until backend sends real users
  useEffect(() => {
    try {
      const fakeUsers = [
        { id: 1, name: "You" },
        { id: 2, name: "Participant 1" },
        { id: 3, name: "Participant 2" },
        { id: 4, name: "Participant 3" }
      ]

      setParticipants(fakeUsers)  //Have to replace fakeUsers with data.users

      setTimeout(() => {
        setLoading(false)
      }, 1000)

    } catch (err) {
      setError("Failed to join meeting")
    }
  }, [setParticipants])

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("Please login first")
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }

  const handleStartRecording = async () => {
    setRecordingBusy(true)
    setRecordingError("")
    setPlaybackUrl("")
    try {
      const res = await fetch("http://localhost:5000/api/recordings/start", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ meetingId })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Failed to start recording")
      setRecording(true)
    } catch (err) {
      setRecordingError(err.message)
    } finally {
      setRecordingBusy(false)
    }
  }

  const handleStopRecording = async () => {
    setRecordingBusy(true)
    setRecordingError("")
    try {
      const res = await fetch("http://localhost:5000/api/recordings/stop", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ meetingId })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Failed to stop recording")
      setRecording(false)
      if (data.playbackUrl) {
        setPlaybackUrl(`http://localhost:5000${data.playbackUrl}`)
      }
    } catch (err) {
      setRecordingError(err.message)
    } finally {
      setRecordingBusy(false)
    }
  }

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

        {/* Theme Button */}
        <Button
          variant="contained"
          onClick={toggleTheme}
          color="secondary"
          sx={{
            position: "absolute",
            top: 20,
            right: 20
          }}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>

        <Container maxWidth="lg">

          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: darkMode ? "white" : "black" }}
          >
            Meeting Room
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2, flexWrap: "wrap" }}>
            <Typography sx={{ color: darkMode ? "white" : "black" }}>
              Meeting ID: {meetingId}
            </Typography>

            {recording && (
              <Typography sx={{ color: "#ff4d4d", fontWeight: 700 }}>
                ● Recording…
              </Typography>
            )}

            <Button
              variant="contained"
              color={recording ? "error" : "secondary"}
              onClick={recording ? handleStopRecording : handleStartRecording}
              disabled={recordingBusy}
            >
              {recordingBusy ? "Please wait..." : recording ? "Stop Recording" : "Start Recording"}
            </Button>
          </Box>

          {recordingError && <Alert severity="error" sx={{ mb: 2 }}>{recordingError}</Alert>}

          {playbackUrl && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Recording saved.{" "}
              <a href={playbackUrl} target="_blank" rel="noreferrer">
                Play / Download
              </a>
            </Alert>
          )}

          {/* Video Grid */}
          <Grid container spacing={2}>

            {participants.length > 0 ? (
              participants.map((user) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
                  <VideoTile name={user.name} />
                </Grid>
              ))
            ) : (

              <>
                <Grid item xs={12} sm={6}>
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
                    User Video
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
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
                    Participant
                  </Paper>
                </Grid>
              </>
            )}

          </Grid>

          <ControlBar />

        </Container>
      </Box>
    </>
  )
}

export default MeetingRoom