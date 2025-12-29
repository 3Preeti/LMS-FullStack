import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { colors, shadows, radius } from "../ui/theme";

const ApproveRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        const res = await api.get("/api/faculty/requests");
        setRequests(res.data);
      } catch (e) {
        // Fallback demo data
        setRequests([
          {
            id: 1,
            studentName: "Mustafa Aqeel",
            rollNumber: "20F-0117",
            type: "ACADEMIC",
            message: "Request for extension on assignment 3 due to medical emergency.",
            status: "PENDING",
            date: "2025-12-25",
          },
          {
            id: 2,
            studentName: "Sara Khan",
            rollNumber: "20F-0215",
            type: "GENERAL",
            message: "Request to audit CS301 course for next semester.",
            status: "PENDING",
            date: "2025-12-26",
          },
          {
            id: 3,
            studentName: "Ali Hassan",
            rollNumber: "20F-0089",
            type: "GRADE",
            message: "Request grade review for midterm exam in CS202.",
            status: "PENDING",
            date: "2025-12-27",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await api.post(`/api/requests/${id}/${action}`);
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: action.toUpperCase() } : r))
      );
      setMessage(`Request ${action}d successfully.`);
    } catch (e) {
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: action.toUpperCase() } : r))
      );
      setMessage(`Request ${action} simulated (backend not ready).`);
    }
  };

  if (loading) return <div style={styles.page}>Loading...</div>;

  const pending = requests.filter((r) => r.status === "PENDING");
  const processed = requests.filter((r) => r.status !== "PENDING");

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div>
          <div style={styles.heroKicker}>Faculty Tools</div>
          <h1 style={styles.heroTitle}>Approve / reject student requests</h1>
          <p style={styles.heroSub}>Review and respond to student submissions.</p>
        </div>
      </section>

      {message && <div style={styles.message}>{message}</div>}

      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          Pending Requests <span style={styles.count}>({pending.length})</span>
        </div>
        {pending.length === 0 ? (
          <div style={styles.empty}>No pending requests.</div>
        ) : (
          <div style={styles.list}>
            {pending.map((req) => (
              <div key={req.id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <div>
                    <span style={styles.badge}>{req.type}</span>
                    <div style={styles.studentName}>{req.studentName}</div>
                    <div style={styles.meta}>{req.rollNumber} · {req.date}</div>
                  </div>
                  <div style={styles.actions}>
                    <button
                      style={{ ...styles.btnApprove }}
                      onClick={() => handleAction(req.id, "approve")}
                    >
                      ✓ Approve
                    </button>
                    <button
                      style={{ ...styles.btnReject }}
                      onClick={() => handleAction(req.id, "reject")}
                    >
                      ✗ Reject
                    </button>
                  </div>
                </div>
                <p style={styles.message2}>{req.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {processed.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeader}>Processed Requests</div>
          <div style={styles.list}>
            {processed.map((req) => (
              <div key={req.id} style={styles.cardProcessed}>
                <div style={styles.cardHeader}>
                  <div>
                    <span style={styles.badge}>{req.type}</span>
                    <div style={styles.studentName}>{req.studentName}</div>
                    <div style={styles.meta}>{req.rollNumber} · {req.date}</div>
                  </div>
                  <span
                    style={{
                      ...styles.statusBadge,
                      ...(req.status === "APPROVED" ? styles.statusApproved : styles.statusRejected),
                    }}
                  >
                    {req.status}
                  </span>
                </div>
                <p style={styles.message2}>{req.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
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
    background: `linear-gradient(120deg, #28a745 0%, #34ce57 60%, #5ae67c 100%)`,
    color: "#fff",
    padding: 24,
    borderRadius: radius.lg,
    boxShadow: shadows.card,
    marginBottom: 16,
  },
  heroKicker: { opacity: 0.9, fontSize: 14 },
  heroTitle: { margin: "4px 0", fontSize: 28, fontWeight: 800 },
  heroSub: { margin: 0, opacity: 0.95 },
  message: { marginBottom: 12, color: "#1f6f43", background: "#d4edda", padding: "10px 14px", borderRadius: radius.sm, border: "1px solid #c3e6cb" },
  section: { marginBottom: 20 },
  sectionHeader: { fontWeight: 800, fontSize: 18, marginBottom: 12, color: colors.text },
  count: { color: colors.muted, fontWeight: 600 },
  list: { display: "flex", flexDirection: "column", gap: 12 },
  card: {
    background: colors.card,
    border: `2px solid #ffc107`,
    borderRadius: radius.md,
    padding: 16,
    boxShadow: shadows.soft,
  },
  cardProcessed: {
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.md,
    padding: 16,
    boxShadow: shadows.soft,
    opacity: 0.8,
  },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 },
  badge: {
    background: colors.primary,
    color: "#fff",
    fontSize: 11,
    padding: "4px 8px",
    borderRadius: radius.sm,
    fontWeight: 700,
    display: "inline-block",
  },
  studentName: { fontWeight: 700, fontSize: 16, marginTop: 6, color: colors.text },
  meta: { fontSize: 12, color: colors.muted, marginTop: 2 },
  message2: { color: colors.text, lineHeight: 1.5, fontSize: 13, margin: 0 },
  actions: { display: "flex", gap: 8 },
  btnApprove: {
    padding: "8px 14px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: radius.sm,
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 13,
  },
  btnReject: {
    padding: "8px 14px",
    background: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: radius.sm,
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 13,
  },
  statusBadge: {
    padding: "6px 10px",
    borderRadius: radius.sm,
    fontWeight: 700,
    fontSize: 12,
  },
  statusApproved: { background: "#d4edda", color: "#155724", border: "1px solid #c3e6cb" },
  statusRejected: { background: "#f8d7da", color: "#721c24", border: "1px solid #f5c6cb" },
  empty: { color: colors.muted, fontSize: 14, padding: 20, textAlign: "center" },
};

export default ApproveRequests;
