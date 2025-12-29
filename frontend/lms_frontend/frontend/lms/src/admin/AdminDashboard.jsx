import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../auth/authService";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menu = [
    { label: "Dashboard", icon: "📊", id: "home", path: "/admin" },
    { label: "Faculty Management", icon: "👨‍🏫", id: "faculty", path: "/admin/faculty" },
    { label: "Student Management", icon: "👨‍🎓", id: "students", path: "/admin/students" },
    { label: "Role Management", icon: "🛡️", id: "roles", path: "/admin/roles" },
    { label: "Reports", icon: "📈", id: "reports", path: "/admin/reports" },
    { label: "System Settings", icon: "⚙️", id: "settings", path: "/admin/settings" },
    { label: "Audit Logs", icon: "📋", id: "logs", path: "/admin/logs" },
  ];

  const stats = [
    { label: "Total Faculties", value: "24", icon: "👨‍🏫", color: "#5d6bff" },
    { label: "Total Students", value: "1,245", icon: "👨‍🎓", color: "#28a745" },
    { label: "Active Users", value: "892", icon: "👥", color: "#17a2b8" },
    { label: "Pending Actions", value: "12", icon: "⏳", color: "#ffc107" },
  ];

  const quickActions = [
    { label: "Add Faculty", icon: "➕", path: "/admin/faculty/create", color: "#5d6bff" },
    { label: "Add Student", icon: "➕", path: "/admin/students/create", color: "#28a745" },
    { label: "Assign Role", icon: "🛡️", path: "/admin/roles/assign", color: "#17a2b8" },
    { label: "View Reports", icon: "📈", path: "/admin/reports", color: "#ffc107" },
  ];

  const recentActivities = [
    { id: 1, action: "Faculty Created", user: "Dr. Ahmad Raza", time: "5 min ago", status: "success" },
    { id: 2, action: "Student Enrolled", user: "Mustafa Aqeel", time: "12 min ago", status: "success" },
    { id: 3, action: "Role Changed", user: "Admin", time: "1 hour ago", status: "info" },
    { id: 4, action: "System Alert", user: "System", time: "2 hours ago", status: "warning" },
  ];

  const permissions = [
    { role: "Admin", courses: "✔", students: "✔", reports: "✔", settings: "✔" },
    { role: "Faculty", courses: "✔", students: "✔", reports: "❌", settings: "❌" },
    { role: "Student", courses: "❌", students: "❌", reports: "❌", settings: "❌" },
  ];

  return (
    <div style={styles.shell}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logoBox}>🛠 LMS ADMIN</div>
        <nav style={styles.nav}>
          {menu.map((item) => (
            <div
              key={item.id}
              style={{
                ...styles.navItem,
                ...(hoveredNav === item.id ? styles.navItemHover : {})
              }}
              onClick={() => navigate(item.path)}
              onMouseEnter={() => setHoveredNav(item.id)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <span style={{ ...styles.navIcon, color: hoveredNav === item.id ? '#2563EB' : '#1e293b' }}>{item.icon}</span>
              <span style={styles.navLabel}>{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      <div style={styles.mainWrapper}>
        {/* Top Navigation */}
        <header style={styles.topNav}>
          <h2 style={styles.pageTitle}>🛠 Admin Dashboard</h2>
          <div style={styles.topNavRight}>
            <div style={styles.profileBtn} onClick={() => setShowProfileMenu(!showProfileMenu)}>
              <div style={styles.avatar}>A</div>
              <span>Admin</span>
            </div>
            {showProfileMenu && (
              <div style={styles.dropdown}>
                <div style={styles.dropdownItem} onClick={() => navigate("/admin/profile")}>
                  👤 Profile
                </div>
                <div style={styles.dropdownItem} onClick={() => navigate("/admin/settings")}>
                  ⚙️ Settings
                </div>
                <div style={styles.dropdownItem} onClick={handleLogout}>
                  🚪 Logout
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main style={styles.main}>
          {/* System Health Stats */}
          <section style={styles.statsGrid}>
            {stats.map((stat, i) => (
              <div key={i} style={{ ...styles.statCard, borderLeft: `4px solid ${stat.color}` }}>
                <div style={styles.statIcon}>{stat.icon}</div>
                <div>
                  <div style={styles.statValue}>{stat.value}</div>
                  <div style={styles.statLabel}>{stat.label}</div>
                </div>
              </div>
            ))}
          </section>

          {/* Quick Actions */}
          <section style={styles.quickActionsSection}>
            <h3 style={styles.sectionTitle}>Quick Actions</h3>
            <div style={styles.quickActionsGrid}>
              {quickActions.map((action, i) => (
                <button key={i} style={{ ...styles.quickBtn, background: action.color }} onClick={() => navigate(action.path)}>
                  {action.icon} {action.label}
                </button>
              ))}
            </div>
          </section>

          {/* Permissions Matrix */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>📋 Permissions Matrix</h3>
            <div style={styles.table}>
              <div style={styles.tableHeader}>
                <div style={styles.th}>Role</div>
                <div style={styles.th}>Courses</div>
                <div style={styles.th}>Students</div>
                <div style={styles.th}>Reports</div>
                <div style={styles.th}>Settings</div>
              </div>
              {permissions.map((perm, i) => (
                <div key={i} style={styles.tableRow}>
                  <div style={styles.td}>{perm.role}</div>
                  <div style={{ ...styles.td, color: perm.courses === "✔" ? "#28a745" : "#dc3545" }}>{perm.courses}</div>
                  <div style={{ ...styles.td, color: perm.students === "✔" ? "#28a745" : "#dc3545" }}>{perm.students}</div>
                  <div style={{ ...styles.td, color: perm.reports === "✔" ? "#28a745" : "#dc3545" }}>{perm.reports}</div>
                  <div style={{ ...styles.td, color: perm.settings === "✔" ? "#28a745" : "#dc3545" }}>{perm.settings}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Activities */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>📊 Recent Activities</h3>
            <div style={styles.activityList}>
              {recentActivities.map((activity) => (
                <div key={activity.id} style={styles.activityItem}>
                  <div style={styles.activityContent}>
                    <div style={styles.activityAction}>{activity.action}</div>
                    <div style={styles.activityMeta}>{activity.user} • {activity.time}</div>
                  </div>
                  <span style={{ ...styles.activityBadge, background: activity.status === "success" ? "#d4edda" : activity.status === "warning" ? "#fff3cd" : "#d1ecf1" }}>
                    {activity.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

const styles = {
  shell: { display: "flex", minHeight: "100vh", background: "#f5f7fb", fontFamily: "Inter, Poppins, system-ui, -apple-system, 'Segoe UI', sans-serif", color: "#0f172a" },
  sidebar: { width: "280px", background: "#ffffff", color: "#1e293b", padding: "24px 18px", display: "flex", flexDirection: "column", gap: "24px", overflowY: "auto", borderRight: "1px solid #e2e8f0", boxShadow: "0 6px 20px rgba(15,23,42,0.06)" },
  logoBox: { height: "60px", borderRadius: "14px", background: "linear-gradient(135deg, #1d4ed8 0%, #60a5fa 100%)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "16px", textAlign: "center", boxShadow: "0 10px 24px rgba(37,78,216,0.25)" },
  nav: { display: "flex", flexDirection: "column", gap: "8px" },
  navItem: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", borderRadius: "12px", background: "transparent", color: "#1e293b", cursor: "pointer", fontWeight: 600, fontSize: "14px", transition: "all 0.2s", borderLeft: "4px solid transparent" },
  navItemHover: { background: "#EAF2FF", color: "#1E40AF", borderLeft: "4px solid #2563EB" },
  navIcon: { fontSize: "18px" },
  navLabel: { flex: 1 },
  mainWrapper: { flex: 1, display: "flex", flexDirection: "column" },
  topNav: { background: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "18px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 6px 20px rgba(15,23,42,0.06)" },
  pageTitle: { margin: 0, fontSize: 20, fontWeight: 800, color: "#0f172a" },
  topNavRight: { position: "relative" },
  profileBtn: { display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "8px 10px", borderRadius: "12px", background: "#f8fafc", border: "1px solid #e2e8f0" },
  avatar: { width: 36, height: 36, borderRadius: "12px", background: "#1d4ed8", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 },
  dropdown: { position: "absolute", top: 40, right: 0, background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", boxShadow: "0 18px 40px rgba(15,23,42,0.12)", minWidth: 180, zIndex: 999 },
  dropdownItem: { padding: "12px 16px", cursor: "pointer", fontSize: 13, borderBottom: "1px solid #f1f5f9", transition: "background 0.2s", color: "#0f172a" },
  main: { flex: 1, padding: "28px 28px", overflow: "auto" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 16, marginBottom: 24 },
  statCard: { background: "#ffffff", borderRadius: "16px", padding: "20px", boxShadow: "0 12px 30px rgba(15,23,42,0.08)", display: "flex", gap: 16, border: "1px solid #e2e8f0" },
  statIcon: { fontSize: 40 },
  statValue: { fontSize: 24, fontWeight: 800, color: "#0f172a" },
  statLabel: { fontSize: 13, color: "#475569", marginTop: 2 },
  quickActionsSection: { marginBottom: 28 },
  quickActionsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 },
  quickBtn: { padding: "14px 16px", color: "#fff", border: "none", borderRadius: "12px", fontWeight: 700, cursor: "pointer", fontSize: 14, transition: "all 0.2s", boxShadow: "0 10px 24px rgba(37,78,216,0.25)" },
  section: { marginBottom: 28 },
  sectionTitle: { margin: "0 0 16px 0", fontSize: 16, fontWeight: 800, color: "#0f172a" },
  table: { background: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", overflow: "auto", boxShadow: "0 10px 26px rgba(15,23,42,0.08)" },
  tableHeader: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: 16, padding: "16px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", fontWeight: 700, fontSize: 13, color: "#0f172a" },
  th: { color: "#0f172a" },
  tableRow: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: 16, padding: "16px", borderBottom: "1px solid #f1f5f9", alignItems: "center", fontSize: 13, color: "#0f172a", flexWrap: "wrap" },
  td: { color: "#0f172a" },
  activityList: { background: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", overflow: "auto", boxShadow: "0 10px 26px rgba(15,23,42,0.08)" },
  activityItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", borderBottom: "1px solid #f1f5f9", flexWrap: "wrap", gap: 10 },
  activityContent: { flex: 1 },
  activityAction: { fontWeight: 700, fontSize: 13, color: "#0f172a" },
  activityMeta: { fontSize: 12, color: "#475569", marginTop: 4 },
  activityBadge: { padding: "4px 8px", borderRadius: "8px", fontSize: 11, fontWeight: 700 },
};

export default AdminDashboard;

