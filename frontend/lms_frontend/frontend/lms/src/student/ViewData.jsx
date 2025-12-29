import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { colors, shadows, radius } from "../ui/theme";

const ViewData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Prefer authenticated endpoint
        const res = await api.get("/api/students/me");
        setData(res.data);
      } catch (e) {
        // Fallback: demo static data when backend not ready
        setData({
          personal: {
            name: "Mustafa Aqeel",
            dob: "11/11/2001",
            gender: "Male",
            email: "f200117@cfd.nu.edu.pk",
            cnic: "35202-8216137-5",
            mobile: "0313-4605512",
            bloodGroup: "O",
            nationality: "Pakistan",
          },
          student: {
            rollNumber: "20F-0117",
            degree: "BSCS",
            batch: "2020",
            section: "8A",
            campus: "Chiniot Faisalabad",
            status: "Current",
          },
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div style={styles.page}>Loading...</div>;
  if (error) return <div style={styles.page}>Error: {String(error)}</div>;

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div>
          <div style={styles.heroKicker}>Profile</div>
          <h1 style={styles.heroTitle}>View own data</h1>
          <p style={styles.heroSub}>Review your profile, progress, and records.</p>
          <button style={styles.backBtn} onClick={() => navigate("/student")}>Back to dashboard</button>
        </div>
        <div style={styles.avatarLarge}>M</div>
      </section>

      <section style={styles.cardGridTwo}>
        <div style={styles.infoCard}>
          <div style={styles.cardHeader}>Personal Information</div>
          <div style={styles.infoGrid}>
            {Object.entries(data.personal).map(([k, v]) => (
              <div key={k} style={styles.infoRow}>
                <span style={styles.infoLabel}>{toLabel(k)}:</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={styles.infoCardLight}>
          <div style={styles.cardHeaderDark}>Student Information</div>
          <div style={styles.infoGrid}>
            {Object.entries(data.student).map(([k, v]) => (
              <div key={k} style={styles.infoRow}>
                <span style={styles.infoLabel}>{toLabel(k)}:</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const toLabel = (key) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (c) => c.toUpperCase());
};

const styles = {
  page: { padding: 24, background: colors.bg, minHeight: "100vh" },
  hero: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    background: `linear-gradient(120deg, ${colors.primary} 0%, #6f89ff 60%, #92a9ff 100%)`,
    color: "#fff",
    padding: 24,
    borderRadius: radius.lg,
    boxShadow: shadows.card,
  },
  heroKicker: { opacity: 0.9, fontSize: 14 },
  heroTitle: { margin: "4px 0", fontSize: 28, fontWeight: 800 },
  heroSub: { margin: 0, opacity: 0.95 },
  avatarLarge: {
    width: 120,
    height: 120,
    borderRadius: "50%",
    background: "#f7b500",
    color: "#1b2530",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: 48,
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  },
  backBtn: {
    marginTop: 12,
    padding: "10px 14px",
    background: colors.card,
    color: colors.text,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.sm,
    fontWeight: 700,
    cursor: "pointer",
  },
  cardGridTwo: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    marginTop: 16,
  },
  infoCard: {
    background: colors.primaryDark,
    color: "#fff",
    borderRadius: radius.md,
    padding: 18,
    boxShadow: "0 10px 26px rgba(82,96,199,0.25)",
  },
  infoCardLight: {
    background: colors.card,
    color: colors.text,
    borderRadius: radius.md,
    padding: 18,
    border: `1px solid ${colors.border}`,
    boxShadow: shadows.soft,
  },
  cardHeader: { fontWeight: 800, marginBottom: 10 },
  cardHeaderDark: { fontWeight: 800, marginBottom: 10, color: colors.text },
  infoGrid: { display: "grid", gridTemplateColumns: "repeat(2, minmax(180px, 1fr))", gap: "8px 14px" },
  infoRow: { display: "flex", gap: 6, fontSize: 13 },
  infoLabel: { fontWeight: 700 },
};

export default ViewData;
