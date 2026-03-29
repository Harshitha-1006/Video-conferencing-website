import { useState } from "react"
import { Container, TextField, Button, Typography, Box } from "@mui/material"

function Login() {

  const [darkMode, setDarkMode] = useState(true)

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  return (
    <Box
      sx={{
        backgroundColor: darkMode ? "black" : "#f5f5f5",
        minHeight: "100vh",
        position: "relative"
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

      <Container maxWidth="sm" sx={{ paddingTop: "120px" }}>
        
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: darkMode ? "white" : "black" }}
        >
          Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          sx={{
            backgroundColor: darkMode ? "grey" : "white",
            "&:hover": { backgroundColor: "white" }
            
          }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          sx={{
            backgroundColor: darkMode ? "grey" : "white",
            "&:hover": { backgroundColor: "white" }
          }}
        />

        <Button
          variant="contained"
          fullWidth
          color="secondary"
          sx={{ marginTop: "20px" }}
        >
          Login
        </Button>

      </Container>
    </Box>
  )
}

export default Login