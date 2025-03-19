import axios from 'axios';

// Use environment variable or fallback to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';
const API_TIMEOUT = process.env.REACT_APP_API_TIMEOUT || 10000;

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;