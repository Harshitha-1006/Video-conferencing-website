// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { MeetingContext } from "../context/MeetingContext";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const Login = () => {
  const { setUser, setToken } = useContext(MeetingContext);

  const [darkMode, setDarkMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setToken(data.token);
        setUser({ email }); // simple user object
        window.location.href = "/dashboard";
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while logging in");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: darkMode ? "black" : "#f5f5f5",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Theme Toggle Button */}
      <Button
        variant="contained"
        onClick={toggleTheme}
        color="secondary"
        sx={{ position: "absolute", top: 20, right: 20 }}
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

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              backgroundColor: darkMode ? "grey.800" : "white",
              "&:hover": { backgroundColor: darkMode ? "grey.700" : "white" },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              backgroundColor: darkMode ? "grey.800" : "white",
              "&:hover": { backgroundColor: darkMode ? "grey.700" : "white" },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="secondary"
            sx={{ marginTop: "20px" }}
          >
            Login
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default Login;