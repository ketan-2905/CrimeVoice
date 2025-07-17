import React, { useState, useEffect } from 'react';
import apiClient from '../apiClient';
import { useNavigate } from 'react-router-dom';

export default function Posts() {
  const [reports, setReports] = useState([]);
  const [userReports, setUserReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUserReportsOnly, setShowUserReportsOnly] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const userData = JSON.parse(userJson);
      setUser(userData);
      setIsLoggedIn(true);
    }
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/reports');
      setReports(response.data);
      
      if (isLoggedIn) {
        const userReportsResponse = await apiClient.get('/reports/user');
        setUserReports(userReportsResponse.data);
      }
    } catch (err) {
      console.error('Error fetching reports:', err);
      setError('Failed to load reports. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = () => {
    navigate('/report');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getTimeSince = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `${interval} year${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval} month${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval} day${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval} hour${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval} minute${interval === 1 ? '' : 's'} ago`;
    
    return `${Math.floor(seconds)} second${seconds === 1 ? '' : 's'} ago`;
  };

  const getInitials = (name) => {
    if (!name) return 'AN';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-600';
      case 'INVESTIGATING': return 'bg-blue-600';
      case 'RESOLVED': return 'bg-green-600';
      case 'DISMISSED': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const displayedReports = showUserReportsOnly ? userReports : reports;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center justify-center">
        <p className="text-red-500 text-xl mb-4">{error}</p>
        <button 
          onClick={fetchReports}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Community Reports</h1>
        <p className="text-xl text-center text-gray-300 mb-8">
          See community crime reports and stay informed about incidents in your area.
        </p>
        
        {isLoggedIn && (
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={showUserReportsOnly} 
                  onChange={() => setShowUserReportsOnly(!showUserReportsOnly)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-300">Show only my reports</span>
              </label>
            </div>
            <button 
              onClick={handleCreatePost} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              Report New Incident
            </button>
          </div>
        )}
        
        {displayedReports.length === 0 ? (
          <div className="text-center p-12 bg-gray-800 rounded-xl">
            <p className="text-xl text-gray-400">
              {showUserReportsOnly 
                ? "You haven't submitted any reports yet." 
                : "No reports have been submitted yet."}
            </p>
            <button 
              onClick={handleCreatePost} 
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Submit First Report
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {displayedReports.map((report) => (
              <div key={report.id} className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 ${report.anonymous ? 'bg-gray-600' : 'bg-blue-600'} rounded-full flex items-center justify-center text-xl font-bold`}>
                    {report.anonymous ? 'AN' : getInitials(report.user?.name)}
                  </div>
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">
                        {report.anonymous ? 'Anonymous' : report.user?.name || 'Unknown User'}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(report.status)}`}>
                        {report.status.charAt(0) + report.status.slice(1).toLowerCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">Posted {getTimeSince(report.createdAt)}</p>
                  </div>
                </div>
                <h4 className="text-lg font-medium mb-2">{report.title}</h4>
                <div className="flex gap-2 mb-2">
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded">{report.crimeType}</span>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded">{report.location}</span>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded">{formatDate(report.date)}</span>
                </div>
                <p className="text-gray-300">{report.description}</p>
                <div className="mt-4 flex gap-4">
                  <button className="text-blue-400 hover:text-blue-300 text-sm">Reply</button>
                  <button className="text-blue-400 hover:text-blue-300 text-sm">Share</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoggedIn && (
          <div className="mt-12 p-6 bg-gray-800 rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-2">Want to submit a report?</h3>
            <p className="text-gray-400 mb-4">Login to track your reports or submit anonymously</p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => navigate('/login')} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Login
              </button>
              <button 
                onClick={() => navigate('/report')} 
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Report Anonymously
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
