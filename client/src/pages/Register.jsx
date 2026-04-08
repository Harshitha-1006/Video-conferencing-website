// src/pages/Register.jsx
import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const Register = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registered successfully! Please login.");
        window.location.href = "/login";
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while registering");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: darkMode ? "black" : "#f5f5f5",
        minHeight: "100vh",
        position: "relative",
        paddingTop: "100px",
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

      <Container maxWidth="sm">
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: darkMode ? "white" : "black" }}
        >
          Register
        </Typography>

        <form onSubmit={handleRegister}>
          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{
              backgroundColor: darkMode ? "grey.800" : "white",
              "&:hover": { backgroundColor: darkMode ? "grey.700" : "white" },
            }}
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
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

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            sx={{
              backgroundColor: darkMode ? "grey.800" : "white",
              "&:hover": { backgroundColor: darkMode ? "grey.700" : "white" },
            }}
          />

          <TextField
            fullWidth
            label="Phone Number"
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
            Register
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default Register;