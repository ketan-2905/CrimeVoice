import React, { useState, useEffect } from 'react';
import apiClient from '../apiClient';
import { useNavigate } from 'react-router-dom';

export default function ReportCrime() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    crimeType: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    anonymous: false
  });
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await apiClient.post('/reports', formData);
      setSubmitted(true);
      setTimeout(() => {
        navigate('/posts');
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-wrap items-center justify-center p-12 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1508780709619-79562169bc64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] before:content-[''] before:absolute before:inset-0 before:bg-black before:bg-opacity-50">
      <div className="flex-1 max-w-lg text-white z-10 animate-fade-in-left">
        <h1 className="text-4xl font-bold mb-4">Report a Crime</h1>
        <p className="text-xl leading-relaxed">
          Help us make your area safer by reporting incidents you witness or experience. Your report can be anonymous and will assist law enforcement.
        </p>
        {!isLoggedIn && (
          <div className="mt-4 p-4 bg-yellow-600 bg-opacity-70 rounded-lg">
            <p className="font-medium">You're not logged in. You can still submit an anonymous report, but logging in allows you to track your reports.</p>
            <button 
              onClick={() => navigate('/login')} 
              className="mt-2 bg-white text-yellow-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-100"
            >
              Login Now
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 max-w-lg bg-white bg-opacity-95 p-8 rounded-xl shadow-lg z-10 animate-fade-in-right">
        {!submitted ? (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="flex flex-col">
              <span className="font-medium mb-1">Title:</span>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Brief title of the incident"
                required
                className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </label>

            <label className="flex flex-col">
              <span className="font-medium mb-1">Location:</span>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City/Area/Locality"
                required
                className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </label>

            <label className="flex flex-col">
              <span className="font-medium mb-1">Date of Incident:</span>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </label>

            <label className="flex flex-col">
              <span className="font-medium mb-1">Type of Crime:</span>
              <select
                name="crimeType"
                value={formData.crimeType}
                onChange={handleChange}
                required
                className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">Select</option>
                <option value="Robbery">Robbery</option>
                <option value="Assault">Assault</option>
                <option value="Theft">Theft</option>
                <option value="Cybercrime">Cybercrime</option>
                <option value="Vandalism">Vandalism</option>
                <option value="Fraud">Fraud</option>
                <option value="Harassment">Harassment</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label className="flex flex-col">
              <span className="font-medium mb-1">Description:</span>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide details about the incident"
                required
                className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none min-h-[100px] resize-y"
              ></textarea>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="anonymous"
                checked={formData.anonymous}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="font-medium">Submit anonymously</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className={`mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>

            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </form>
        ) : (
          <div className="text-center p-8 bg-green-50 border-2 border-green-500 rounded-xl">
            <h2 className="text-2xl font-bold text-green-600 mb-2">Report Successfully Submitted!</h2>
            <p className="text-gray-700">Thank you for helping make the community safer.</p>
            <p className="text-gray-700 mt-2">Redirecting to community posts...</p>
          </div>
        )}
      </div>
    </div>
  );
}