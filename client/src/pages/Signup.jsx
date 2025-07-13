import React, { useState } from 'react';
import apiClient from '../apiClient'; // ✅ Reuse Axios instance

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await apiClient.post('/auth/register', formData);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {!submitted ? (
          <>
            <h2 className="text-2xl font-bold mb-2 text-center">Create Account</h2>
            <p className="text-gray-600 mb-6 text-center">Sign up to get started</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Sign Up
              </button>

              {error && <p className="text-red-600 text-sm mt-2 text-center">{error}</p>}
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600">Registration Successful!</h2>
            <p className="mt-2 text-gray-700">You can now log in to your account.</p>
          </div>
        )}
      </div>
    </div>
  );
}
