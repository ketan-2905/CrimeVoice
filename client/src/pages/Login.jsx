import React, { useState } from 'react';
import apiClient from '../apiClient'; // adjust path if needed
import './Login.css';

export default function Login() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
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
      const response = await apiClient.post('/auth/login', formData);

      // Optionally store token
      localStorage.setItem('token', response.data.token);

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome Back</h1>
        <p>Login to your account to access all features</p>

        {!submitted ? (
          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </label>

            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </label>

            <button type="submit">Login</button>
            {error && <p className="error">{error}</p>}
          </form>
        ) : (
          <div className="login-success">
            <h2>Login Successful!</h2>
          </div>
        )}
      </div>
    </div>
  );
}
