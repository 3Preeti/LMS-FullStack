import { useState, useEffect } from "react";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", rollNumber: "", section: "", batch: "" });
  const [editingId, setEditingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    const stored = localStorage.getItem("studentList");
    if (stored) {
      setStudents(JSON.parse(stored));
    } else {
      const demo = [
        { id: 1, name: "Mustafa Aqeel", email: "mustafa@lms.edu", rollNumber: "20F-0117", section: "8A", batch: "2020", status: "Active", enrollments: 5 },
        { id: 2, name: "Sara Khan", email: "sara@lms.edu", rollNumber: "20F-0215", section: "8B", batch: "2020", status: "Active", enrollments: 4 },
        { id: 3, name: "Ahmed Hassan", email: "ahmed@lms.edu", rollNumber: "21F-0089", section: "9A", batch: "2021", status: "Inactive", enrollments: 3 },
      ];
      setStudents(demo);
      localStorage.setItem("studentList", JSON.stringify(demo));
    }
  }, []);

  const handleAdd = () => {
    if (!form.name || !form.email || !form.rollNumber) return;
    if (editingId) {
      const updated = students.map((s) => s.id === editingId ? { ...s, ...form } : s);
      setStudents(updated);
      localStorage.setItem("studentList", JSON.stringify(updated));
      setEditingId(null);
    } else {
      const newEntry = { id: Date.now(), ...form, status: "Active", enrollments: 0 };
      const updated = [...students, newEntry];
      setStudents(updated);
      localStorage.setItem("studentList", JSON.stringify(updated));
    }
    setForm({ name: "", email: "", rollNumber: "", section: "", batch: "" });
    setFormOpen(false);
  };

  const handleRemove = (id) => {
    const updated = students.filter((s) => s.id !== id);
    setStudents(updated);
    localStorage.setItem("studentList", JSON.stringify(updated));
  };

  const handleEdit = (stu) => {
    setForm({ name: stu.name, email: stu.email, rollNumber: stu.rollNumber, section: stu.section, batch: stu.batch });
    setEditingId(stu.id);
    setFormOpen(true);
  };

  const toggleStatus = (id) => {
    const updated = students.map((s) =>
      s.id === id ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" } : s
    );
    setStudents(updated);
    localStorage.setItem("studentList", JSON.stringify(updated));
  };

  const filtered = filterStatus === "All" ? students : students.filter((s) => s.status === filterStatus);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>👨‍🎓 Student Management</h2>
          <p style={styles.subtitle}>Create, manage, and enroll students in courses</p>
        </div>
        <button style={styles.addBtn} onClick={() => { setFormOpen(!formOpen); setEditingId(null); setForm({ name: "", email: "", rollNumber: "", section: "", batch: "" }); }}>
          ➕ Add Student
        </button>
      </div>

      {formOpen && (
        <div style={styles.formCard}>
          <h3 style={styles.formTitle}>{editingId ? "Edit Student" : "Add New Student"}</h3>
          <div style={styles.formRow}>
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={styles.input}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={styles.input}
            />
          </div>
          <div style={styles.formRow}>
            <input
              type="text"
              placeholder="Roll Number"
              value={form.rollNumber}
              onChange={(e) => setForm({ ...form, rollNumber: e.target.value })}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Section"
              value={form.section}
              onChange={(e) => setForm({ ...form, section: e.target.value })}
              style={styles.input}
            />
          </div>
          <input
            type="text"
            placeholder="Batch Year (e.g., 2020)"
            value={form.batch}
            onChange={(e) => setForm({ ...form, batch: e.target.value })}
            style={styles.input}
          />
          <div style={styles.formButtons}>
            <button style={styles.btnPrimary} onClick={handleAdd}>
              {editingId ? "Update Student" : "Save Student"}
            </button>
            <button style={styles.btnSecondary} onClick={() => { setFormOpen(false); setEditingId(null); }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div style={styles.filterBar}>
        <span style={styles.filterLabel}>Filter by Status:</span>
        {["All", "Active", "Inactive"].map((status) => (
          <button
            key={status}
            style={{ ...styles.filterBtn, background: filterStatus === status ? "#28a745" : "#e4e8f0", color: filterStatus === status ? "#fff" : "#17212b" }}
            onClick={() => setFilterStatus(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Roll Number</th>
              <th style={styles.th}>Section</th>
              <th style={styles.th}>Batch</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Enrollments</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} style={styles.row}>
                <td style={styles.td}><strong>{s.name}</strong></td>
                <td style={styles.td}>{s.email}</td>
                <td style={styles.td}>{s.rollNumber}</td>
                <td style={styles.td}>{s.section}</td>
                <td style={styles.td}>{s.batch}</td>
                <td style={styles.td}>
                  <span style={{ ...styles.badge, background: s.status === "Active" ? "#d4edda" : "#f8d7da", color: s.status === "Active" ? "#155724" : "#721c24" }}>
                    {s.status}
                  </span>
                </td>
                <td style={styles.td}>{s.enrollments} courses</td>
                <td style={styles.td}>
                  <button style={styles.actionBtn} onClick={() => handleEdit(s)}>
                    ✏️ Edit
                  </button>
                  <button style={styles.actionBtn} onClick={() => toggleStatus(s.id)}>
                    {s.status === "Active" ? "⏸ Deactivate" : "▶ Activate"}
                  </button>
                  <button style={{ ...styles.actionBtn, color: "#dc3545" }} onClick={() => handleRemove(s.id)}>
                    🗑 Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "28px", background: "#f4f6fb", minHeight: "100vh" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 },
  title: { margin: 0, fontSize: 24, fontWeight: 800, color: "#17212b" },
  subtitle: { margin: "6px 0 0 0", fontSize: 14, color: "#6b7684" },
  addBtn: { padding: "12px 20px", background: "#28a745", color: "#fff", border: "none", borderRadius: "10px", fontWeight: 700, cursor: "pointer", fontSize: 14 },
  formCard: { background: "#fff", borderRadius: "12px", padding: 20, marginBottom: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" },
  formTitle: { margin: "0 0 16px 0", fontSize: 16, fontWeight: 800, color: "#17212b" },
  formRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 },
  input: { display: "block", padding: "12px 14px", border: "1px solid #d0d8e3", borderRadius: "8px", fontSize: 13, fontFamily: "inherit", boxSizing: "border-box", width: "100%" },
  formButtons: { display: "flex", gap: 12 },
  btnPrimary: { padding: "10px 18px", background: "#28a745", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer", fontSize: 13 },
  btnSecondary: { padding: "10px 18px", background: "#e4e8f0", color: "#17212b", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer", fontSize: 13 },
  filterBar: { display: "flex", alignItems: "center", gap: 12, marginBottom: 20 },
  filterLabel: { fontWeight: 700, fontSize: 13, color: "#17212b" },
  filterBtn: { padding: "8px 14px", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer", fontSize: 12 },
  tableWrapper: { background: "#fff", borderRadius: "12px", border: "1px solid #e4e8f0", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", overflow: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  headerRow: { background: "#f8f9fa", borderBottom: "1px solid #e4e8f0" },
  th: { padding: "14px 16px", textAlign: "left", fontWeight: 700, fontSize: 13, color: "#17212b" },
  row: { borderBottom: "1px solid #f0f0f0", transition: "background 0.2s" },
  td: { padding: "14px 16px", fontSize: 13, color: "#17212b" },
  badge: { padding: "4px 8px", borderRadius: "6px", fontSize: 12, fontWeight: 700, display: "inline-block" },
  actionBtn: { padding: "6px 10px", background: "transparent", border: "1px solid #d0d8e3", borderRadius: "6px", color: "#17212b", cursor: "pointer", fontWeight: 600, fontSize: 11, marginRight: 6 },
};

export default ManageStudents;
