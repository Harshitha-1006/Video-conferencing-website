import { useState } from "react"
import { Container, TextField, Button, Typography, Box, CircularProgress, Alert } from "@mui/material"

function Register() {

  const [darkMode, setDarkMode] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [phone, setPhone] = useState("")
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  const handleRegister = async () => {
    setLoading(true)
    setError("")
    setSuccess("")
    
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || data.error || "Registration failed")
      
      setSuccess("Registration successful! Please login.")
      // Optional: Redirect to login
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
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

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <TextField
          fullWidth label="Full Name"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{
            backgroundColor: darkMode ? "grey" : "white",
            "&:hover": { backgroundColor: "white" }
          }}
        />

        <TextField
          fullWidth
          label="Phone Number"
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          sx={{
            backgroundColor: darkMode ? "grey" : "white",
            "&:hover": { backgroundColor: "white" }
          }}
        />

        <Button
          variant="contained"
          fullWidth
          color="secondary"
          onClick={handleRegister}
          disabled={loading}
          sx={{ marginTop: "20px" }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
        </Button>
      </Container>
    </Box>
  )
}

export default Register