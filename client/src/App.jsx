import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Heatmap from './pages/Heatmap';
import Home from './pages/Home';
import ReportCrime from './pages/ReportCrime';
import Login from './pages/Login';
import Posts from './pages/Posts';

// import Graph from './pages/Graph'; // ⬅️ add this line

export default function App() {
  return (
    <Router>
      <nav className="p-4 bg-blue-600 text-white">
          <Link to="/heatmap" className="mr-4 hover:underline">Crime Heatmap</Link>
      </nav>
      <Routes>
        <Route path="/heatmap" element={<Heatmap />} />
        <Route path='/' element={<Home />} />
        {/* <Route path='/graph' element={<Graph />} /> */}
        <Route path='/report' element={<ReportCrime />} />
        {/* <Route path='/heatmap' element={<Graph />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/posts' element={<Posts />} />
      </Routes>
    </Router>
  );
}