import { jwtDecode } from "jwt-decode";

// Get token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Check login status
export const isLoggedIn = () => {
  const token = getToken();
  return !!token;
};

// Decode full JWT or mock token
export const decodeToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    // Try to decode as JWT first
    return jwtDecode(token);
  } catch (error) {
    // If JWT decode fails, try to parse as base64 encoded JSON (mock token)
    try {
      const decoded = JSON.parse(atob(token));
      return decoded;
    } catch (e) {
      return null;
    }
  }
};

// Get role from JWT or mock token
export const getUserRole = () => {
  const decoded = decodeToken();
  return decoded?.role || null;
};

// Get user email
export const getUserEmail = () => {
  const decoded = decodeToken();
  return decoded?.sub || null;
};

// Logout helper
export const logout = () => {
  localStorage.removeItem("token");
};
