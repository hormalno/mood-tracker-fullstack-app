import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Defined in .env file
  headers: {
    "Content-Type": "application/json",
  }
});

// Automatically add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Or sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;