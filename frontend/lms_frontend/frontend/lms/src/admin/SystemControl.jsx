import { useEffect, useState } from "react";
import { colors, shadows, radius } from "../ui/theme";

// Feature flags stored in localStorage for demo
const FLAGS_KEY = "feature.flags";
const defaultFlags = {
  faculty: {
    createCourses: true,
    manageContent: true,
    approveRequests: true,
    viewStudents: true,
  },
};

const getFlags = () => {
  try { return JSON.parse(localStorage.getItem(FLAGS_KEY)) || defaultFlags; } catch { return defaultFlags; }
};
const setFlags = (flags) => localStorage.setItem(FLAGS_KEY, JSON.stringify(flags));

const SystemControl = () => {
  const [flags, setFlagsState] = useState(getFlags());
  const [message, setMessage] = useState("");

  useEffect(() => { setFlags(flags); }, [flags]);

  const toggleFaculty = (key) => {
    setFlagsState((prev) => ({
      ...prev,
      faculty: { ...prev.faculty, [key]: !prev.faculty[key] },
    }));
    setMessage("Feature flags updated.");
  };

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div>
          <div style={styles.heroKicker}>🛠 ADMIN</div>
          <h1 style={styles.heroTitle}>System-level control</h1>
          <p style={styles.heroSub}>Users, reports, settings, and feature flags.</p>
        </div>
      </section>

      {message && <div style={styles.message}>{message}</div>}

      <div style={styles.card}>
        <div style={styles.cardTitle}>Faculty feature flags</div>
        <div style={styles.flagsGrid}>
          <label style={styles.flagItem}>
            <input type="checkbox" checked={flags.faculty.createCourses} onChange={() => toggleFaculty("createCourses")} />
            <span>Create courses</span>
          </label>
          <label style={styles.flagItem}>
            <input type="checkbox" checked={flags.faculty.manageContent} onChange={() => toggleFaculty("manageContent")} />
            <span>Manage course content</span>
          </label>
          <label style={styles.flagItem}>
            <input type="checkbox" checked={flags.faculty.approveRequests} onChange={() => toggleFaculty("approveRequests")} />
            <span>Approve / reject student requests</span>
          </label>
          <label style={styles.flagItem}>
            <input type="checkbox" checked={flags.faculty.viewStudents} onChange={() => toggleFaculty("viewStudents")} />
            <span>View enrolled students</span>
          </label>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { padding: 24, background: colors.bg, minHeight: "100vh" },
  hero: { display: "flex", alignItems: "flex-start", justifyContent: "flex-start", flexDirection: "column", gap: 6, background: `linear-gradient(120deg, #ffb100 0%, #ffb84a 60%, #ffd27a 100%)`, color: "#fff", padding: 24, borderRadius: radius.lg, boxShadow: shadows.card, marginBottom: 16 },
  heroKicker: { opacity: 0.9, fontSize: 14 },
  heroTitle: { margin: "4px 0", fontSize: 28, fontWeight: 800 },
  heroSub: { margin: 0, opacity: 0.95 },
  message: { marginBottom: 12, color: "#856404", background: "#fff3cd", padding: "10px 14px", borderRadius: radius.sm, border: "1px solid #ffeeba" },
  card: { background: colors.card, border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: 16, boxShadow: shadows.soft, maxWidth: 700 },
  cardTitle: { fontWeight: 800, fontSize: 16, marginBottom: 10, color: colors.text },
  flagsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  flagItem: { display: "flex", alignItems: "center", gap: 8, fontSize: 14 },
};

export default SystemControl;
