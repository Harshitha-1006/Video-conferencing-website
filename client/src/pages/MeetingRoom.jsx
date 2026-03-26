import { useState, useContext, useEffect } from "react"
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