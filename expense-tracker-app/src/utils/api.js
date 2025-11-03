import axios from 'axios';

// Prefer an explicit Vite env var so we can point the frontend to a separate
// backend URL in production when needed. In a single-Vercel deployment this
// can be set to '/api' (Vercel routes) or to the full backend URL when
// backend is deployed separately.
const BASE = import.meta.env.VITE_API_BASE_URL ?? (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

const api = axios.create({
  baseURL: BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
