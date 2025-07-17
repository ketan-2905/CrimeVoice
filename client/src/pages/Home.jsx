import React from "react";
import { Link } from "react-router-dom";
import useUser from "../hook/useUser";
import apiClient from "../apiClient";

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <section 
        className="bg-cover bg-center text-white text-center py-32 px-5 relative"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1508780709619-79562169bc64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Stay Aware. Stay Safe.
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Get live crime alerts, area statistics, report incidents, and read
            real experiences from your community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/report">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Report a Crime
              </button>
            </Link>
            <Link to="/heatmap">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                View Crime Map
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="flex flex-wrap justify-center gap-8 py-16 px-5 bg-white">
        <div className="bg-gray-100 p-6 w-80 rounded-xl text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <img
            src="https://images.unsplash.com/photo-1615800091263-3c4cf5360eb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
            alt="Report"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-bold mb-3 text-gray-800">Instant Reporting</h3>
          <p className="text-gray-600 leading-relaxed">
            Report incidents anonymously or with details. Track the status
            easily.
          </p>
        </div>
        
        <div className="bg-gray-100 p-6 w-80 rounded-xl text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <img
            src="https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
            alt="Heatmap"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-bold mb-3 text-gray-800">Heatmaps & Data</h3>
          <p className="text-gray-600 leading-relaxed">
            Visualize crime-prone areas and crime trends using interactive maps.
          </p>
        </div>

        <div className="bg-gray-100 p-6 w-80 rounded-xl text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <img
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
            alt="Community"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-bold mb-3 text-gray-800">Community Voices</h3>
          <p className="text-gray-600 leading-relaxed">
            Read real incidents, experiences, and updates shared by the
            community.
          </p>
        </div>
      </section>

      {/* Live Location Alert Section */}
      <section className="bg-yellow-100 text-center py-12 px-5 border-t-4 border-b-4 border-yellow-500">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Live Location Crime Alert</h2>
        <p className="text-lg mb-6 text-gray-700 max-w-2xl mx-auto">
          Allow location access to get notified if you're in a high-crime zone.
        </p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
          Enable Location Alert
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
        <p className="text-gray-300">&copy; 2025 Crime Awareness Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}
