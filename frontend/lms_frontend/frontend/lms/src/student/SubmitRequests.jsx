import { useState } from "react";
import api from "../api/axiosConfig";
import { colors, shadows, radius } from "../ui/theme";

const SubmitRequests = () => {
  const [type, setType] = useState("GENERAL");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/requests", { type, message });
      setStatus("Request submitted successfully.");
      setMessage("");
      setType("GENERAL");
    } catch (e) {
      setStatus("Request simulated (backend not ready).");
    }
  };

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div>
          <div style={styles.heroKicker}>Helpdesk</div>
          <h1 style={styles.heroTitle}>Submit requests</h1>
          <p style={styles.heroSub}>Reach admin or faculty with clear, tracked requests.</p>
        </div>
      </section>

      {status && <div style={styles.status}>{status}</div>}
      <form onSubmit={submit} style={styles.form}>
        <div style={styles.row2}>
          <div style={{ flex: 1 }}>
            <label style={styles.label}>Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} style={styles.input}>
              <option value="GENERAL">General</option>
              <option value="ACADEMIC">Academic</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div style={{ flex: 2 }}>
            <label style={styles.label}>Message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} style={{ ...styles.input, height: 140 }} />
          </div>
        </div>
        <button style={styles.btn} type="submit">Submit</button>
      </form>
    </div>
  );
};

const styles = {
  page: { padding: 24, background: colors.bg, minHeight: "100vh" },
  hero: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: 6,
    background: `linear-gradient(120deg, ${colors.primary} 0%, #6f89ff 60%, #92a9ff 100%)`,
    color: "#fff",
    padding: 24,
    borderRadius: radius.lg,
    boxShadow: shadows.card,
    marginBottom: 16,
  },
  heroKicker: { opacity: 0.9, fontSize: 14 },
  heroTitle: { margin: "4px 0", fontSize: 28, fontWeight: 800 },
  heroSub: { margin: 0, opacity: 0.95 },
  status: { marginBottom: 10, color: "#1f6f43" },
  form: { background: colors.card, border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: 16, maxWidth: 900, boxShadow: shadows.soft },
  row2: { display: "flex", gap: 16 },
  label: { fontWeight: 700, marginTop: 8, color: colors.text },
  input: { marginTop: 4, padding: "10px 12px", borderRadius: radius.sm, border: `1px solid ${colors.border}`, width: "100%" },
  btn: { marginTop: 12, padding: "10px 14px", background: colors.primary, color: "#fff", border: "none", borderRadius: radius.sm, fontWeight: 700, cursor: "pointer" },
};

export default SubmitRequests;
