import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../auth/authService";

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Read feature flags
  const flags = (() => {
    try {
      const parsed = JSON.parse(localStorage.getItem("feature.flags"));
      return parsed?.faculty || { createCourses: true, manageContent: true, approveRequests: true, viewStudents: true };
    } catch {
      return { createCourses: true, manageContent: true, approveRequests: true, viewStudents: true };
    }
  })();

  const menu = [
    { label: "Dashboard", icon: "📊", id: "home", show: true },
    { label: "My Courses", icon: "📘", id: "courses", show: true },
    { label: "Course Content", icon: "📂", id: "manage", show: flags.manageContent },
    { label: "Student Requests", icon: "👨‍🎓", id: "approve", show: flags.approveRequests },
    { label: "Enrolled Students", icon: "👥", id: "students", show: flags.viewStudents },
    { label: "Reports", icon: "📈", id: "reports", show: true },
    { label: "Settings", icon: "⚙️", id: "settings", show: true },
  ].filter((m) => m.show);

  const stats = [
    { label: "My Courses", value: "12", icon: "📘", color: "#5d6bff" },
    { label: "Enrolled Students", value: "245", icon: "👨‍🎓", color: "#28a745" },
    { label: "Pending Requests", value: "8", icon: "⏳", color: "#ffc107" },
    { label: "Content Uploaded", value: "156", icon: "🧾", color: "#17a2b8" },
  ];

  const courses = [
    { id: 1, title: "React Basics", code: "CS301", enrolled: 45, status: "Active" },
    { id: 2, title: "DBMS Fundamentals", code: "CS202", enrolled: 38, status: "Active" },
    { id: 3, title: "Python Programming", code: "CS210", enrolled: 52, status: "Draft" },
  ];

  const requests = [
    { id: 1, student: "John Doe", course: "React Basics", date: "12 Sep", status: "pending" },
    { id: 2, student: "Jane Smith", course: "DBMS", date: "11 Sep", status: "pending" },
  ];

  const students = [
    { id: 1, name: "Alice Johnson", course: "React Basics", email: "alice@nu.edu.pk", progress: 75 },
    { id: 2, name: "Bob Williams", course: "DBMS", email: "bob@nu.edu.pk", progress: 92 },
    { id: 3, name: "Carol Martinez", course: "Python", email: "carol@nu.edu.pk", progress: 68 },
  ];

  const notifications = [
    { id: 1, text: "New enrollment request from Sarah Khan", time: "5 min ago" },
    { id: 2, text: "Assignment submitted by Ali Hassan", time: "1 hour ago" },
    { id: 3, text: "New comment on React Basics course", time: "2 hours ago" },
  ];

  return (
    <div style={styles.shell}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logoBox}>LMS</div>
        <nav style={styles.nav}>
          {menu.map((item) => (
            <div
              key={item.id}
              style={{
                ...styles.navItem,
                ...(hoveredNav === item.id ? styles.navItemHover : {})
              }}
              onClick={() => {
                if (item.id === "home") navigate("/faculty");
                if (item.id === "courses") navigate("/faculty");
                if (item.id === "manage") navigate("/faculty/manage-content");
                if (item.id === "approve") navigate("/faculty/approve-requests");
                if (item.id === "students") navigate("/faculty/view-students");
              }}
              onMouseEnter={() => setHoveredNav(item.id)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <span style={{ ...styles.navIcon, color: hoveredNav === item.id ? '#2563EB' : '#1e293b' }}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      <div style={styles.mainWrapper}>
        {/* Top Navigation Bar */}
        <header style={styles.topNav}>
          <div style={styles.topNavLeft}>
            <h2 style={styles.pageTitle}>Faculty Dashboard</h2>
          </div>
          <div style={styles.topNavRight}>
            {/* Notifications */}
            <div style={styles.iconWrapper}>
              <div style={styles.iconBtn} onClick={() => setShowNotifications(!showNotifications)}>
                🔔
                <span style={styles.badge}>3</span>
              </div>
              {showNotifications && (
                <div style={styles.dropdown}>
                  <div style={styles.dropdownHeader}>Notifications</div>
                  {notifications.map((n) => (
                    <div key={n.id} style={styles.notificationItem}>
                      <div style={styles.notificationText}>{n.text}</div>
                      <div style={styles.notificationTime}>{n.time}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div style={styles.iconWrapper}>
              <div style={styles.profileBtn} onClick={() => setShowProfileMenu(!showProfileMenu)}>
                <div style={styles.avatar}>F</div>
                <span>Faculty</span>
              </div>
              {showProfileMenu && (
                <div style={styles.dropdown}>
                  <div style={styles.dropdownItem} onClick={() => navigate("/faculty/profile")}>
                    👤 Profile
                  </div>
                  <div style={styles.dropdownItem} onClick={() => navigate("/faculty/settings")}>
                    ⚙️ Settings
                  </div>
                  <div style={styles.dropdownItem} onClick={handleLogout}>
                    🚪 Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main style={styles.main}>
          {/* Overview Cards */}
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
          <section style={styles.quickActions}>
            <button style={styles.ctaBtn} onClick={() => navigate("/faculty/create-courses")}>
              ➕ Create New Course
            </button>
            <button style={{ ...styles.ctaBtn, background: "#17a2b8" }} onClick={() => navigate("/faculty/manage-content")}>
              📤 Upload Content
            </button>
            <button style={{ ...styles.ctaBtn, background: "#28a745" }} onClick={() => navigate("/faculty/approve-requests")}>
              ✅ Review Student Requests
            </button>
            <button style={{ ...styles.ctaBtn, background: "#6c757d" }} onClick={() => navigate("/faculty/view-students")}>
              👥 View Students
            </button>
          </section>

          {/* My Courses Section */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>My Courses</h3>
            <div style={styles.coursesGrid}>
              {courses.map((course) => (
                <div key={course.id} style={styles.courseCard}>
                  <div style={styles.courseHeader}>
                    <span style={styles.courseCode}>{course.code}</span>
                    <span style={course.status === "Active" ? styles.statusActive : styles.statusDraft}>
                      {course.status}
                    </span>
                  </div>
                  <div style={styles.courseTitle}>{course.title}</div>
                  <div style={styles.courseMeta}>👨‍🎓 {course.enrolled} students</div>
                  <div style={styles.courseActions}>
                    <button style={styles.courseBtn}>✏️ Manage</button>
                    <button style={styles.courseBtn}>👥 Students</button>
                    <button style={styles.courseBtn}>⚙️ Settings</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Student Requests */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>Student Requests (Pending Approval)</h3>
            <div style={styles.table}>
              <div style={styles.tableHeader}>
                <div style={styles.th}>Student</div>
                <div style={styles.th}>Course</div>
                <div style={styles.th}>Date</div>
                <div style={styles.th}>Action</div>
              </div>
              {requests.map((req) => (
                <div key={req.id} style={styles.tableRow}>
                  <div style={styles.td}>{req.student}</div>
                  <div style={styles.td}>{req.course}</div>
                  <div style={styles.td}>{req.date}</div>
                  <div style={styles.tdActions}>
                    <button style={styles.approveBtn}>Approve</button>
                    <button style={styles.rejectBtn}>Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Enrolled Students */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>Enrolled Students</h3>
            <div style={styles.table}>
              <div style={styles.tableHeader}>
                <div style={styles.th}>Student Name</div>
                <div style={styles.th}>Course</div>
                <div style={styles.th}>Email</div>
                <div style={styles.th}>Progress</div>
              </div>
              {students.map((student) => (
                <div key={student.id} style={styles.tableRow}>
                  <div style={styles.td}>{student.name}</div>
                  <div style={styles.td}>{student.course}</div>
                  <div style={styles.td}>{student.email}</div>
                  <div style={styles.td}>
                    <div style={styles.progressBar}>
                      <div style={{ ...styles.progressFill, width: `${student.progress}%` }} />
                    </div>
                    <span style={styles.progressText}>{student.progress}%</span>
                  </div>
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
  shell: { display: "flex", minHeight: "100vh", width: "100%", background: "#f5f7fb", fontFamily: "Inter, Poppins, system-ui, -apple-system, 'Segoe UI', sans-serif", color: "#0f172a", paddingLeft: "260px", boxSizing: "border-box" },
  sidebar: { position: "fixed", top: 0, left: 0, height: "100vh", width: "260px", background: "#ffffff", color: "#1e293b", padding: "24px 18px", display: "flex", flexDirection: "column", gap: "24px", borderRight: "1px solid #e2e8f0", boxShadow: "0 6px 20px rgba(15,23,42,0.06)", overflowY: "auto", zIndex: 10 },
  logoBox: { height: "60px", borderRadius: "14px", background: "linear-gradient(135deg, #1d4ed8 0%, #60a5fa 100%)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "20px", boxShadow: "0 10px 24px rgba(37,78,216,0.25)" },
  nav: { display: "flex", flexDirection: "column", gap: "8px" },
  navItem: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", borderRadius: "12px", background: "transparent", color: "#1e293b", cursor: "pointer", fontWeight: 600, fontSize: "14px", transition: "all 0.2s ease", borderLeft: "4px solid transparent" },
  navItemHover: { background: "#EAF2FF", color: "#1E40AF", borderLeft: "4px solid #2563EB" },
  navIcon: { fontSize: "18px" },
  mainWrapper: { flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh", width: "100%" },
  topNav: { background: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "18px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 6px 20px rgba(15,23,42,0.06)" },
  topNavLeft: { display: "flex", alignItems: "center", gap: 16 },
  pageTitle: { margin: 0, fontSize: 20, fontWeight: 800, color: "#0f172a" },
  topNavRight: { display: "flex", alignItems: "center", gap: "18px" },
  iconWrapper: { position: "relative" },
  iconBtn: { display: "flex", alignItems: "center", gap: 6, fontSize: 20, cursor: "pointer", position: "relative" },
  badge: { position: "absolute", top: -8, right: -8, background: "#ef4444", color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 },
  dropdown: { position: "absolute", top: 40, right: 0, background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", boxShadow: "0 18px 40px rgba(15,23,42,0.12)", minWidth: 280, zIndex: 999 },
  dropdownHeader: { padding: "12px 16px", fontWeight: 700, fontSize: 13, borderBottom: "1px solid #e2e8f0", color: "#0f172a" },
  notificationItem: { padding: "12px 16px", borderBottom: "1px solid #f1f5f9", fontSize: 13, color: "#0f172a" },
  notificationText: { color: "#0f172a", marginBottom: 4 },
  notificationTime: { fontSize: 11, color: "#475569" },
  profileBtn: { display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "8px 10px", borderRadius: "12px", background: "#f8fafc", border: "1px solid #e2e8f0" },
  avatar: { width: 36, height: 36, borderRadius: "12px", background: "#1d4ed8", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 },
  dropdownItem: { padding: "12px 16px", cursor: "pointer", fontSize: 13, borderBottom: "1px solid #f1f5f9", transition: "background 0.2s", color: "#0f172a" },
  main: { flex: 1, padding: "28px 28px", overflowY: "auto" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 16, marginBottom: 24 },
  statCard: { background: "#ffffff", borderRadius: "16px", padding: "20px", boxShadow: "0 12px 30px rgba(15,23,42,0.08)", display: "flex", gap: 16, border: "1px solid #e2e8f0" },
  statIcon: { fontSize: 40 },
  statValue: { fontSize: 24, fontWeight: 800, color: "#0f172a" },
  statLabel: { fontSize: 13, color: "#475569", marginTop: 2 },
  quickActions: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 28 },
  ctaBtn: { padding: "14px 16px", background: "linear-gradient(135deg, #1d4ed8, #60a5fa)", color: "#fff", border: "none", borderRadius: "12px", fontWeight: 700, cursor: "pointer", fontSize: 14, transition: "all 0.2s", boxShadow: "0 10px 24px rgba(37,78,216,0.25)" },
  section: { marginBottom: 28 },
  sectionTitle: { margin: "0 0 16px 0", fontSize: 18, fontWeight: 800, color: "#0f172a" },
  coursesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 },
  courseCard: { background: "#ffffff", borderRadius: "14px", padding: "18px", boxShadow: "0 10px 26px rgba(15,23,42,0.08)", border: "1px solid #e2e8f0" },
  courseHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 8 },
  courseCode: { background: "#1d4ed8", color: "#fff", padding: "4px 8px", borderRadius: "8px", fontSize: 11, fontWeight: 700 },
  statusActive: { background: "#dcfce7", color: "#166534", padding: "4px 8px", borderRadius: "8px", fontSize: 11, fontWeight: 700 },
  statusDraft: { background: "#fef9c3", color: "#92400e", padding: "4px 8px", borderRadius: "8px", fontSize: 11, fontWeight: 700 },
  courseTitle: { fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 8 },
  courseMeta: { fontSize: 13, color: "#475569", marginBottom: 12 },
  courseActions: { display: "flex", gap: 8, flexWrap: "wrap" },
  courseBtn: { flex: 1, minWidth: 80, padding: "8px 10px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "10px", cursor: "pointer", fontSize: 12, fontWeight: 600, transition: "all 0.2s", color: "#0f172a" },
  table: { background: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", overflow: "auto", boxShadow: "0 10px 26px rgba(15,23,42,0.08)" },
  tableHeader: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, padding: "16px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", fontWeight: 700, fontSize: 13, color: "#0f172a" },
  th: { color: "#0f172a" },
  tableRow: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, padding: "16px", borderBottom: "1px solid #f1f5f9", alignItems: "center", background: "#ffffff", flexWrap: "wrap" },
  td: { fontSize: 13, color: "#0f172a" },
  tdActions: { fontSize: 13, color: "#0f172a", display: "flex", gap: 8, flexWrap: "wrap" },
  approveBtn: { padding: "8px 14px", background: "#dcfce7", border: "1px solid #bbf7d0", color: "#166534", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: 13, transition: "all 0.2s", whiteSpace: "nowrap" },
  rejectBtn: { padding: "8px 14px", background: "#fee2e2", border: "1px solid #fecaca", color: "#991b1b", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: 13, transition: "all 0.2s", whiteSpace: "nowrap" },
  progressBar: { background: "#e2e8f0", borderRadius: "8px", height: 8, overflow: "hidden", marginBottom: 4 },
  progressFill: { background: "linear-gradient(135deg, #1d4ed8, #60a5fa)", height: "100%" },
  progressText: { fontSize: 11, color: "#475569", fontWeight: 600 },
};

export default FacultyDashboard;
