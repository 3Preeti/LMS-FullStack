import { useState, useEffect } from "react";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filterAction, setFilterAction] = useState("All");

  useEffect(() => {
    const stored = localStorage.getItem("auditLogs");
    if (stored) {
      setLogs(JSON.parse(stored));
    } else {
      const demo = [
        { id: 1, timestamp: "2024-01-15 14:30", action: "User Created", user: "Dr. Ahmad Raza", details: "Faculty account created", status: "success" },
        { id: 2, timestamp: "2024-01-15 13:15", action: "Role Changed", user: "Admin", details: "Role changed from Faculty to Coordinator", status: "success" },
        { id: 3, timestamp: "2024-01-15 12:00", action: "Login", user: "Dr. Fatima Khan", details: "User logged in successfully", status: "success" },
        { id: 4, timestamp: "2024-01-15 11:45", action: "Data Updated", user: "System", details: "Course content updated", status: "success" },
        { id: 5, timestamp: "2024-01-15 10:30", action: "Logout", user: "Dr. Ali Hassan", details: "User logged out", status: "success" },
        { id: 6, timestamp: "2024-01-15 09:15", action: "User Created", user: "Mustafa Aqeel", details: "Student account created", status: "success" },
      ];
      setLogs(demo);
      localStorage.setItem("auditLogs", JSON.stringify(demo));
    }
  }, []);

  const actions = ["All", "User Created", "Role Changed", "Login", "Logout", "Data Updated"];
  const filtered = filterAction === "All" ? logs : logs.filter((log) => log.action === filterAction);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📋 Audit Logs</h2>
      <p style={styles.subtitle}>Track all system changes and user activities</p>

      <div style={styles.filterBar}>
        <span style={styles.filterLabel}>Filter by Action:</span>
        {actions.map((action) => (
          <button
            key={action}
            style={{
              ...styles.filterBtn,
              background: filterAction === action ? "#5d6bff" : "#e4e8f0",
              color: filterAction === action ? "#fff" : "#17212b",
            }}
            onClick={() => setFilterAction(action)}
          >
            {action}
          </button>
        ))}
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>Timestamp</th>
              <th style={styles.th}>Action</th>
              <th style={styles.th}>User</th>
              <th style={styles.th}>Details</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((log) => (
              <tr key={log.id} style={styles.row}>
                <td style={styles.td}>{log.timestamp}</td>
                <td style={styles.td}>
                  <strong>{log.action}</strong>
                </td>
                <td style={styles.td}>{log.user}</td>
                <td style={styles.td}>{log.details}</td>
                <td style={styles.td}>
                  <span style={{ ...styles.badge, background: "#d4edda", color: "#155724" }}>
                    {log.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.info}>
        <div style={styles.infoBox}>
          <div style={styles.infoTitle}>Total Audit Records</div>
          <div style={styles.infoValue}>{logs.length}</div>
        </div>
        <div style={styles.infoBox}>
          <div style={styles.infoTitle}>Period</div>
          <div style={styles.infoValue}>Last 30 Days</div>
        </div>
        <div style={styles.infoBox}>
          <div style={styles.infoTitle}>Last Updated</div>
          <div style={styles.infoValue}>{new Date().toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "28px", background: "#f4f6fb", minHeight: "100vh" },
  title: { margin: "0 0 8px 0", fontSize: 24, fontWeight: 800, color: "#17212b" },
  subtitle: { margin: "0 0 24px 0", fontSize: 13, color: "#6b7684" },
  filterBar: { display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" },
  filterLabel: { fontWeight: 700, fontSize: 13, color: "#17212b" },
  filterBtn: { padding: "8px 14px", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer", fontSize: 12 },
  tableWrapper: { background: "#fff", borderRadius: "12px", border: "1px solid #e4e8f0", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", overflow: "auto", marginBottom: 24 },
  table: { width: "100%", borderCollapse: "collapse" },
  headerRow: { background: "#f8f9fa", borderBottom: "1px solid #e4e8f0" },
  th: { padding: "14px 16px", textAlign: "left", fontWeight: 700, fontSize: 13, color: "#17212b" },
  row: { borderBottom: "1px solid #f0f0f0" },
  td: { padding: "14px 16px", fontSize: 13, color: "#17212b" },
  badge: { padding: "4px 8px", borderRadius: "6px", fontWeight: 700, fontSize: 11, display: "inline-block" },
  info: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16 },
  infoBox: { background: "#fff", borderRadius: "10px", padding: 16, textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" },
  infoTitle: { fontSize: 12, color: "#6b7684", marginBottom: 8 },
  infoValue: { fontSize: 18, fontWeight: 800, color: "#5d6bff" },
};

export default AuditLogs;
