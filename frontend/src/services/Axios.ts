import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Defined in .env file
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // Set to true if using cookies for auth
});

export default api;