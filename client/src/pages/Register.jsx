import { useState } from "react"
import { Container, TextField, Button, Typography, Box } from "@mui/material"

function Register() {

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
        margin:0,
        paddingTop:"100px"
      }}
    >

      {/* Theme Button */}x
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

        <Typography variant="h4" gutterBottom sx={{ color: darkMode ? "white" : "black" }}>
          Register
        </Typography>

        <TextField
          fullWidth label="Full Name"
          margin="normal"
          sx={{
            backgroundColor: darkMode ? "grey" : "white",
            "&:hover": { backgroundColor: "white" }
            
          }}
        />

        <TextField
          fullWidth
          label="Email"
          type="email"
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

        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          margin="normal"
          sx={{
            backgroundColor: darkMode ? "grey" : "white",
            "&:hover": { backgroundColor: "white" }
            
          }}
        />

        <TextField
          fullWidth
          label="Phone Number"
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
          Register
        </Button>
      </Container>
    </Box>
  )
}

export default Register