import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:8080", // Spring Boot backend
});

// Request interceptor → attach JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

      if (error.response.status === 403) {
        alert("Access denied!");
      }
    }
    return Promise.reject(error);
  }
);

export default api;

