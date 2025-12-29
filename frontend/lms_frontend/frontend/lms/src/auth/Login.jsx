import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(email, password);

      console.log("Login successful, redirecting to dashboard...", data);

      // Redirect based on role
      if (data.role === "ADMIN") {
        navigate("/admin");
      } else if (data.role === "FACULTY") {
        navigate("/faculty");
      } else if (data.role === "STUDENT") {
        navigate("/student");
      } else {
        navigate("/student"); // Default fallback
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password");
    }
  };


  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h1 style={styles.heading}>LMS</h1>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="text"
          placeholder="Username or Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Log In
        </button>

        <p style={styles.registerText}>
          Don't have an account? <a href="/register" style={styles.link}>Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;

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
  registerText: {
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
  },
};