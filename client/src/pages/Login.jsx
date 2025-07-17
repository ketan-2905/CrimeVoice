import React, { useState } from 'react';
import apiClient from '../apiClient';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      const response = await apiClient.post('/auth/login', formData);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setSubmitted(true);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1581092919535-5c92d1352d92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')]">
      <div className="bg-white bg-opacity-95 p-10 rounded-xl shadow-lg max-w-md w-full m-4 animate-fade-in">
        {!submitted ? (
          <>
            <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
            <p className="text-gray-600 text-center mb-8">Login to your account to access all features</p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
              >
                Login
              </button>

              {error && <p className="text-red-600 text-sm text-center mt-2">{error}</p>}
            </form>
          </>
        ) : (
          <div className="text-center p-6 bg-green-50 border-2 border-green-500 rounded-xl">
            <h2 className="text-2xl font-bold text-green-600">Login Successful!</h2>
          </div>
        )}
      </div>
    </div>
  );
}
