import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Heatmap from "./pages/Heatmap";
import Home from "./pages/Home";
import ReportCrime from "./pages/ReportCrime";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Signup from "./pages/Signup";
import ProtectedRoute from "./pages/ProtectedRoute";
import Dashboard from "./pages/Dashboard"; // Import the Dashboard component
import Header from "./components/Header";

// import Graph from './pages/Graph'; // ⬅️ add this line

export default function App() {
  return (
    <Router>
     <Header />
      <Routes>
        <Route path="/heatmap" element={<Heatmap />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <ReportCrime />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
