import { useState } from "react"
import { Container, Button, Typography, Box } from "@mui/material"

function Dashboard() {

  const [darkMode, setDarkMode] = useState(true)

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

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
        sx={{
          position: "absolute",
          top: 20,
          right: 20
        }}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </Button>

      <Container maxWidth="sm">

        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: darkMode ? "white" : "black" }}
        >
        </Typography>

        <Typography
          variant="h3"
          sx={{ color: darkMode ? "white" : "black", marginBottom: "20px", textAlign:"center" }}
        >
          Welcome to Meet
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems:"center" }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginBottom: "20px", width: "200px", padding: "10px" }}
          >
            Join Meeting
          </Button>

          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "200px", padding: "10px" }}
          >
            Create Meeting
          </Button>
        </Box>

      </Container>
    </Box>
  )
}

export default Dashboard