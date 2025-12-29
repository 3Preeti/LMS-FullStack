import { useState, useEffect } from "react";

// Role assignment UI backed by localStorage so it works without the backend
const AssignRoles = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const storedFaculty = localStorage.getItem("facultyList");
    const storedStudents = localStorage.getItem("studentList");

    let allUsers = [];
    if (storedFaculty) allUsers = allUsers.concat(JSON.parse(storedFaculty).map((f) => ({ ...f, type: "Faculty" })));
    if (storedStudents) allUsers = allUsers.concat(JSON.parse(storedStudents).map((s) => ({ ...s, type: "Student" })));

    if (allUsers.length === 0) {
      allUsers = [
        { id: 1, name: "Dr. Ahmad Raza", email: "ahmad@lms.edu", type: "Faculty", role: "Faculty" },
        { id: 2, name: "Dr. Fatima Khan", email: "fatima@lms.edu", type: "Faculty", role: "Coordinator" },
        { id: 3, name: "Mustafa Aqeel", email: "mustafa@lms.edu", type: "Student", role: "Student" },
      ];
    }

    setUsers(allUsers);

    const storedRoles = localStorage.getItem("rolePermissions");
    if (storedRoles) {
      setRoles(JSON.parse(storedRoles));
    } else {
      const roleMatrix = [
        { role: "Admin", viewCourses: true, manageCourses: true, viewStudents: true, manageStudents: true, viewReports: true, settings: true },
        { role: "Faculty", viewCourses: true, manageCourses: true, viewStudents: true, manageStudents: false, viewReports: false, settings: false },
        { role: "Coordinator", viewCourses: true, manageCourses: true, viewStudents: true, manageStudents: true, viewReports: true, settings: false },
        { role: "Student", viewCourses: true, manageCourses: false, viewStudents: false, manageStudents: false, viewReports: false, settings: false },
      ];
      setRoles(roleMatrix);
      localStorage.setItem("rolePermissions", JSON.stringify(roleMatrix));
    }
  }, []);

  const changeRole = (userId, newRole) => {
    const updated = users.map((u) => (u.id === userId ? { ...u, role: newRole } : u));
    setUsers(updated);
    localStorage.setItem("userRoles", JSON.stringify(updated));
  };

  const togglePermission = (roleIndex, permission) => {
    const updated = [...roles];
    updated[roleIndex][permission] = !updated[roleIndex][permission];
    setRoles(updated);
    localStorage.setItem("rolePermissions", JSON.stringify(updated));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🛡️ Role & Access Management</h2>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>User Role Assignment</h3>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Current Role</th>
                <th style={styles.th}>Change Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} style={styles.row}>
                  <td style={styles.td}>
                    <strong>{user.name}</strong>
                  </td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>{user.type}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.badge,
                        background:
                          user.role === "Admin"
                            ? "#ff6b6b"
                            : user.role === "Coordinator"
                            ? "#ffd43b"
                            : user.role === "Faculty"
                            ? "#5d6bff"
                            : "#28a745",
                      }}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <select style={styles.roleSelect} value={user.role} onChange={(e) => changeRole(user.id, e.target.value)}>
                      {user.type === "Faculty" && (
                        <>
                          <option>Faculty</option>
                          <option>Coordinator</option>
                          <option>HOD</option>
                        </>
                      )}
                      {user.type === "Student" && <option>Student</option>}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Permission Matrix</h3>
        <div style={styles.matrixWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>View Courses</th>
                <th style={styles.th}>Manage Courses</th>
                <th style={styles.th}>View Students</th>
                <th style={styles.th}>Manage Students</th>
                <th style={styles.th}>View Reports</th>
                <th style={styles.th}>Settings</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((roleRow, idx) => (
                <tr key={idx} style={styles.row}>
                  <td style={styles.td}>
                    <strong>{roleRow.role}</strong>
                  </td>
                  <td style={{ ...styles.td, cursor: "pointer", textAlign: "center" }} onClick={() => togglePermission(idx, "viewCourses")}>
                    {roleRow.viewCourses ? "✅" : "❌"}
                  </td>
                  <td style={{ ...styles.td, cursor: "pointer", textAlign: "center" }} onClick={() => togglePermission(idx, "manageCourses")}>
                    {roleRow.manageCourses ? "✅" : "❌"}
                  </td>
                  <td style={{ ...styles.td, cursor: "pointer", textAlign: "center" }} onClick={() => togglePermission(idx, "viewStudents")}>
                    {roleRow.viewStudents ? "✅" : "❌"}
                  </td>
                  <td style={{ ...styles.td, cursor: "pointer", textAlign: "center" }} onClick={() => togglePermission(idx, "manageStudents")}>
                    {roleRow.manageStudents ? "✅" : "❌"}
                  </td>
                  <td style={{ ...styles.td, cursor: "pointer", textAlign: "center" }} onClick={() => togglePermission(idx, "viewReports")}>
                    {roleRow.viewReports ? "✅" : "❌"}
                  </td>
                  <td style={{ ...styles.td, cursor: "pointer", textAlign: "center" }} onClick={() => togglePermission(idx, "settings")}>
                    {roleRow.settings ? "✅" : "❌"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={styles.hint}>💡 Click on permissions to toggle them (click to edit)</p>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "28px", background: "#f4f6fb", minHeight: "100vh" },
  title: { margin: "0 0 24px 0", fontSize: 24, fontWeight: 800, color: "#17212b" },
  section: { background: "#fff", borderRadius: "12px", padding: 20, marginBottom: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" },
  sectionTitle: { margin: "0 0 16px 0", fontSize: 16, fontWeight: 800, color: "#17212b" },
  tableWrapper: { overflow: "auto" },
  matrixWrapper: { overflow: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  headerRow: { background: "#f8f9fa", borderBottom: "1px solid #e4e8f0" },
  th: { padding: "14px 16px", textAlign: "left", fontWeight: 700, fontSize: 13, color: "#17212b" },
  row: { borderBottom: "1px solid #f0f0f0" },
  td: { padding: "14px 16px", fontSize: 13, color: "#17212b" },
  badge: { padding: "4px 8px", borderRadius: "6px", fontWeight: 700, fontSize: 11, display: "inline-block", color: "#fff" },
  roleSelect: { padding: "6px 8px", border: "1px solid " + "#d0d8e3", borderRadius: "6px", fontSize: 12, fontFamily: "inherit", background: "#fff", cursor: "pointer" },
  hint: { margin: "16px 0 0 0", fontSize: 12, color: "#6b7684", fontStyle: "italic" },
};

export default AssignRoles;
