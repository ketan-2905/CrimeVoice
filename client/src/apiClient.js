// src/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // change if your server URL is different
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export default apiClient;
