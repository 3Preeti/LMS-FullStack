import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      // Call backend registration API - all new users register as STUDENT
      const response = await api.post("/auth/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: "STUDENT", // All public registrations default to STUDENT
      });

      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Registration error:", err);
      
      if (err.code === "ERR_NETWORK") {
        setError("Cannot connect to server. Please make sure backend is running on http://localhost:8080");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 403) {
        setError("Access denied. Backend CORS configuration needed.");
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h1 style={styles.heading}>Register</h1>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Register
        </button>

        <p style={styles.loginText}>
          Already have an account?{" "}
          <a href="/login" style={styles.link}>
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
  },
  form: {
    width: "400px",
    padding: "40px 30px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "32px",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    padding: "12px 15px",
    marginBottom: "20px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "14px",
    boxSizing: "border-box",
    background: "#fff",
    cursor: "pointer",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
  },
  loginText: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "14px",
    color: "#666",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "500",
  },
  error: {
    color: "#dc3545",
    textAlign: "center",
    marginBottom: "15px",
    fontSize: "14px",
    padding: "10px",
    background: "#f8d7da",
    borderRadius: "4px",
  },
  success: {
    color: "#155724",
    textAlign: "center",
    marginBottom: "15px",
    fontSize: "14px",
    padding: "10px",
    background: "#d4edda",
    borderRadius: "4px",
  },
};
