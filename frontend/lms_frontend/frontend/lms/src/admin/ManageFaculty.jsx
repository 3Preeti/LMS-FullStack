import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ManageFaculty = () => {
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", department: "", phone: "" });
  const [editingId, setEditingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    const stored = localStorage.getItem("facultyList");
    if (stored) {
      setFaculty(JSON.parse(stored));
    } else {
      const demo = [
        { id: 1, name: "Dr. Ahmad Raza", email: "ahmad@lms.edu", department: "Computer Science", phone: "+92-123-456", status: "Active", role: "Faculty" },
        { id: 2, name: "Dr. Fatima Khan", email: "fatima@lms.edu", department: "Engineering", phone: "+92-234-567", status: "Active", role: "Coordinator" },
      ];
      setFaculty(demo);
      localStorage.setItem("facultyList", JSON.stringify(demo));
    }
  }, []);

  const handleAdd = () => {
    if (!form.name || !form.email) return;
    if (editingId) {
      const updated = faculty.map((f) => f.id === editingId ? { ...f, ...form } : f);
      setFaculty(updated);
      localStorage.setItem("facultyList", JSON.stringify(updated));
      setEditingId(null);
    } else {
      const newEntry = { id: Date.now(), ...form, status: "Active", role: "Faculty" };
      const updated = [...faculty, newEntry];
      setFaculty(updated);
      localStorage.setItem("facultyList", JSON.stringify(updated));
    }
    setForm({ name: "", email: "", department: "", phone: "" });
    setFormOpen(false);
  };

  const handleRemove = (id) => {
    const updated = faculty.filter((f) => f.id !== id);
    setFaculty(updated);
    localStorage.setItem("facultyList", JSON.stringify(updated));
  };

  const handleEdit = (fac) => {
    setForm({ name: fac.name, email: fac.email, department: fac.department, phone: fac.phone });
    setEditingId(fac.id);
    setFormOpen(true);
  };

  const toggleStatus = (id) => {
    const updated = faculty.map((f) =>
      f.id === id ? { ...f, status: f.status === "Active" ? "Inactive" : "Active" } : f
    );
    setFaculty(updated);
    localStorage.setItem("facultyList", JSON.stringify(updated));
  };

  const changeRole = (id, newRole) => {
    const updated = faculty.map((f) =>
      f.id === id ? { ...f, role: newRole } : f
    );
    setFaculty(updated);
    localStorage.setItem("facultyList", JSON.stringify(updated));
  };

  const filtered = filterStatus === "All" ? faculty : faculty.filter((f) => f.status === filterStatus);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>👨‍🏫 Faculty Management</h2>
          <p style={styles.subtitle}>Create, manage, and assign roles to faculty members</p>
        </div>
        <button style={styles.addBtn} onClick={() => { setFormOpen(!formOpen); setEditingId(null); setForm({ name: "", email: "", department: "", phone: "" }); }}>
          ➕ Add Faculty
        </button>
      </div>

      {formOpen && (
        <div style={styles.formCard}>
          <h3 style={styles.formTitle}>{editingId ? "Edit Faculty" : "Add New Faculty"}</h3>
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
          <input
            type="text"
            placeholder="Department"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            style={styles.input}
          />
          <div style={styles.formButtons}>
            <button style={styles.btnPrimary} onClick={handleAdd}>
              {editingId ? "Update Faculty" : "Save Faculty"}
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
            style={{ ...styles.filterBtn, background: filterStatus === status ? "#5d6bff" : "#e4e8f0", color: filterStatus === status ? "#fff" : "#17212b" }}
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
              <th style={styles.th}>Department</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f) => (
              <tr key={f.id} style={styles.row}>
                <td style={styles.td}><strong>{f.name}</strong></td>
                <td style={styles.td}>{f.email}</td>
                <td style={styles.td}>{f.department}</td>
                <td style={styles.td}>{f.phone}</td>
                <td style={styles.td}>
                  <span style={{ ...styles.badge, background: f.status === "Active" ? "#d4edda" : "#f8d7da", color: f.status === "Active" ? "#155724" : "#721c24" }}>
                    {f.status}
                  </span>
                </td>
                <td style={styles.td}>
                  <select style={styles.roleSelect} value={f.role} onChange={(e) => changeRole(f.id, e.target.value)}>
                    <option>Faculty</option>
                    <option>Coordinator</option>
                    <option>HOD</option>
                  </select>
                </td>
                <td style={styles.td}>
                  <button style={styles.actionBtn} onClick={() => handleEdit(f)}>
                    ✏️ Edit
                  </button>
                  <button style={styles.actionBtn} onClick={() => toggleStatus(f.id)}>
                    {f.status === "Active" ? "⏸ Deactivate" : "▶ Activate"}
                  </button>
                  <button style={{ ...styles.actionBtn, color: "#dc3545" }} onClick={() => handleRemove(f.id)}>
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
  addBtn: { padding: "12px 20px", background: "#5d6bff", color: "#fff", border: "none", borderRadius: "10px", fontWeight: 700, cursor: "pointer", fontSize: 14 },
  formCard: { background: "#fff", borderRadius: "12px", padding: 20, marginBottom: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" },
  formTitle: { margin: "0 0 16px 0", fontSize: 16, fontWeight: 800, color: "#17212b" },
  input: { display: "block", width: "100%", padding: "12px 14px", marginBottom: 12, border: "1px solid #d0d8e3", borderRadius: "8px", fontSize: 13, fontFamily: "inherit", boxSizing: "border-box" },
  formButtons: { display: "flex", gap: 12 },
  btnPrimary: { padding: "10px 18px", background: "#5d6bff", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer", fontSize: 13 },
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
  roleSelect: { padding: "6px 8px", border: "1px solid #d0d8e3", borderRadius: "6px", fontSize: 12, fontFamily: "inherit", background: "#fff", cursor: "pointer" },
  actionBtn: { padding: "6px 10px", background: "transparent", border: "1px solid #d0d8e3", borderRadius: "6px", color: "#17212b", cursor: "pointer", fontWeight: 600, fontSize: 11, marginRight: 6 },
};

export default ManageFaculty;
