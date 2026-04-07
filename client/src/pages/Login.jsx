import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container, TextField, Button, Typography, Box, CircularProgress, Alert } from "@mui/material"

function Login() {
  const navigate = useNavigate()

  const [darkMode, setDarkMode] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  const handleLogin = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || data.error || "Login failed")
      
      localStorage.setItem("token", data.token)
      navigate("/dashboard")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
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

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          fullWidth
          label="Email"
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

        <Button
          variant="contained"
          fullWidth
          color="secondary"
          onClick={handleLogin}
          disabled={loading}
          sx={{ marginTop: "20px" }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>

        <Button
          variant="text"
          fullWidth
          onClick={() => navigate("/register")}
          sx={{ marginTop: "10px" }}
        >
          First time here? Register
        </Button>

      </Container>
    </Box>
  )
}

export default Login