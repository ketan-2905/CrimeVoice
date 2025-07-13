import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="logo">Crime Awareness Portal</div>
        <nav>
          <Link to="/report">Report Crime</Link>
          <Link to="/heatmap">Heatmap</Link>
          <Link to="/posts">Community Posts</Link>
          <Link to="/login" className="login-btn">Login</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Stay Aware. Stay Safe.</h1>
          <p>Get live crime alerts, area statistics, report incidents, and read real experiences from your community.</p>
          <div className="hero-buttons">
            <Link to="/report"><button>Report a Crime</button></Link>
            <Link to="/heatmap"><button>View Crime Map</button></Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <img src="https://images.unsplash.com/photo-1615800091263-3c4cf5360eb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" alt="Report" />
          <h3>Instant Reporting</h3>
          <p>Report incidents anonymously or with details. Track the status easily.</p>
        </div>
        <div className="feature-card">
          <img src="https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" alt="Heatmap" />
          <h3>Heatmaps & Data</h3>
          <p>Visualize crime-prone areas and crime trends using interactive maps.</p>
        </div>
        {/* Live Location Alert Section */}

        <div className="feature-card">
          <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" alt="Community" />
          <h3>Community Voices</h3>
          <p>Read real incidents, experiences, and updates shared by the community.</p>
        </div>
      </section>
      <section className="live-alert">
            <h2>Live Location Crime Alert</h2>
            <p>Allow location access to get notified if you're in a high-crime zone.</p>
            <button className="alert-btn">Enable Location Alert</button>
        </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Crime Awareness Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}
