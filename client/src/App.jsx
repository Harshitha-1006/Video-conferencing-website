// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MeetingProvider } from "./context/MeetingContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MeetingRoom from "./pages/MeetingRoom";

function App() {
  return (
    <MeetingProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/meeting" element={<MeetingRoom />} />
        </Routes>
      </Router>
    </MeetingProvider>
  );
}

export default App;