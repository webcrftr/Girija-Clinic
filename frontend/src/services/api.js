import axios from 'axios';

// Determine API Base URL
// In development, Vite proxifies /api to http://localhost:5000
// In production, VITE_API_URL environment variable is preferred
const API_URL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor to inject JWT Authorization Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('girija_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor to intercept 401s and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and reload if not on login page
      const currentPath = window.location.pathname;
      if (currentPath.startsWith('/admin') && currentPath !== '/admin/login') {
        localStorage.removeItem('girija_admin_token');
        localStorage.removeItem('girija_admin_user');
        window.location.href = '/admin/login?message=session_expired';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
