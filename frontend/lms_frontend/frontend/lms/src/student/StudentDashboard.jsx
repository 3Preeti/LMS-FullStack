import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../auth/authService";

// Redesigned student dashboard that mirrors the provided structure
const StudentDashboard = () => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState(null);
  const [hoveredNav, setHoveredNav] = useState(null);

  const summaryCards = useMemo(
    () => [
      { id: "enrolled", label: "Enrolled Courses", value: 6, icon: "📘", color: "#2563eb", to: "/student/courses" },
      { id: "pending", label: "Pending Requests", value: 2, icon: "⏳", color: "#f59e0b", to: "/student/requests" },
      { id: "completed", label: "Completed Courses", value: 14, icon: "🎯", color: "#16a34a", to: "/student/courses" },
      { id: "alerts", label: "Notifications", value: 4, icon: "🔔", color: "#ef4444", to: "/student" },
    ],
    []
  );

  const courses = useMemo(
    () => [
      { id: 1, title: "Data Structures", instructor: "Dr. Khan", status: "Enrolled", category: "CS", faculty: "Computer Science" },
      { id: 2, title: "UI/UX Design", instructor: "Sarah Ali", status: "Pending", category: "Design", faculty: "Arts" },
      { id: 3, title: "Operating Systems", instructor: "Prof. Hammad", status: "Available", category: "CS", faculty: "Computer Science" },
      { id: 4, title: "Marketing 101", instructor: "Mr. Aslam", status: "Available", category: "Business", faculty: "Management" },
    ],
    []
  );

  const enrollments = useMemo(
    () => [
      { id: 11, course: "Data Structures", instructor: "Dr. Khan", status: "Enrolled", progress: 65 },
      { id: 12, course: "UI/UX Design", instructor: "Sarah Ali", status: "Pending", progress: 10 },
      { id: 13, course: "Operating Systems", instructor: "Prof. Hammad", status: "Completed", progress: 100 },
    ],
    []
  );

  const requests = useMemo(
    () => [
      { id: "R-2310", type: "Course enrollment", course: "Operating Systems", status: "Pending", time: "2h ago" },
      { id: "R-2309", type: "Course drop", course: "Calculus II", status: "Approved", time: "1d ago" },
      { id: "R-2308", type: "Access request", course: "Data Structures", status: "Rejected", time: "3d ago" },
    ],
    []
  );

  const notifications = useMemo(
    () => [
      { id: "N-31", text: "Enrollment approved for Operating Systems", kind: "success" },
      { id: "N-30", text: "Data Structures: Assignment 2 updated", kind: "info" },
      { id: "N-29", text: "UI/UX Design request is pending review", kind: "pending" },
      { id: "N-28", text: "Reminder: Submit course drop justification", kind: "warning" },
    ],
    []
  );

  const sidebar = [
    { id: "dashboard", label: "Dashboard", icon: "🏠", to: "/student" },
    { id: "courses", label: "Browse Courses", icon: "📘", to: "/student/enroll" },
    { id: "enrollments", label: "My Enrollments", icon: "📝", to: "/student/courses" },
    { id: "requests", label: "My Requests", icon: "📩", to: "/student/requests" },
    { id: "profile", label: "My Profile", icon: "👤", to: "/student/data" },
    { id: "settings", label: "Settings", icon: "⚙️", to: "/student/settings" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const statusChip = (status) => {
    const palette = {
      Enrolled: { bg: "#dcfce7", fg: "#166534" },
      Pending: { bg: "#fef9c3", fg: "#92400e" },
      Completed: { bg: "#e0f2fe", fg: "#075985" },
      Available: { bg: "#eef2ff", fg: "#3730a3" },
      Approved: { bg: "#dcfce7", fg: "#166534" },
      Rejected: { bg: "#fee2e2", fg: "#991b1b" },
    };
    const colors = palette[status] || { bg: "#e5e7eb", fg: "#111827" };
    return { background: colors.bg, color: colors.fg };
  };

  return (
    <div style={styles.shell}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logoRow}>
          <div style={styles.logoMark}>🎓</div>
          <div>
            <div style={styles.logoTitle}>LMS</div>
            <div style={styles.logoSub}>Student</div>
          </div>
        </div>
        <nav style={styles.nav}>
          {sidebar.map((item) => (
            <div
              key={item.id}
              style={{
                ...styles.navItem,
                ...(hoveredNav === item.id ? styles.navItemHover : {}),
                ...(activeNav === item.id ? styles.navItemActive : {}),
              }}
              onClick={() => {
                setActiveNav(item.id);
                navigate(item.to);
              }}
              onMouseEnter={() => setHoveredNav(item.id)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <span style={{ ...styles.navIcon, color: hoveredNav === item.id || activeNav === item.id ? '#2563EB' : '#1e293b' }}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* Main */}
      <main style={styles.main}>
        <header style={styles.topBar}>
          <div style={styles.topLeft}>
            <div style={styles.pageTitle}>Dashboard</div>
            <div style={styles.pageMeta}>Keep track of courses, requests, and updates.</div>
          </div>
          <div style={styles.topRight}>
            <div style={styles.bell}>
              🔔
              <span style={styles.bellBadge}>{notifications.length}</span>
            </div>
            <div style={styles.user} onClick={() => setProfileOpen(!profileOpen)}>
              <div style={styles.avatar}>M</div>
              <div>
                <div style={styles.userName}>Mustafa Aqeel</div>
                <div style={styles.userMeta}>Roll 20F-0117</div>
              </div>
            </div>
            {profileOpen && (
              <div style={styles.dropdown}>
                <div style={styles.dropdownItem} onClick={() => navigate("/student/data")}>My Profile</div>
                <div style={styles.dropdownItem} onClick={() => navigate("/student/data")}>My Data</div>
                <div style={styles.dropdownItem} onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>
        </header>

        {/* Summary cards */}
        <section style={styles.cardsGrid}>
          {summaryCards.map((card) => (
            <div
              key={card.id}
              style={{ ...styles.card, borderColor: card.color }}
              onClick={() => navigate(card.to)}
            >
              <div style={styles.cardIcon}>{card.icon}</div>
              <div>
                <div style={styles.cardValue}>{card.value}</div>
                <div style={styles.cardLabel}>{card.label}</div>
              </div>
            </div>
          ))}
        </section>

        {/* Browse courses */}
        <section style={styles.section}>
          <div style={styles.sectionHead}>
            <div>
              <div style={styles.sectionKicker}>Browse Courses</div>
              <h3 style={styles.sectionTitle}>Pick, view, and enroll</h3>
            </div>
            <div style={styles.filters}>
              <select style={styles.filterSelect} defaultValue="all">
                <option value="all">All categories</option>
                <option value="cs">CS</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
              </select>
              <select style={styles.filterSelect} defaultValue="all">
                <option value="all">Any faculty</option>
                <option value="cs">Computer Science</option>
                <option value="arts">Arts</option>
                <option value="management">Management</option>
              </select>
              <select style={styles.filterSelect} defaultValue="all">
                <option value="all">Any status</option>
                <option value="Enrolled">Enrolled</option>
                <option value="Pending">Pending</option>
                <option value="Available">Available</option>
              </select>
            </div>
          </div>
          <div style={styles.courseGrid}>
            {courses.map((c) => (
              <div key={c.id} style={styles.courseCard}>
                <div style={styles.courseTop}>
                  <div>
                    <div style={styles.courseTitle}>{c.title}</div>
                    <div style={styles.courseMeta}>{c.instructor}</div>
                  </div>
                  <span style={{ ...styles.statusPill, ...statusChip(c.status) }}>{c.status}</span>
                </div>
                <div style={styles.courseTags}>
                  <span style={styles.tag}>{c.category}</span>
                  <span style={styles.tag}>{c.faculty}</span>
                </div>
                <div style={styles.courseActions}>
                  <button style={styles.ghostBtn} onClick={() => navigate("/student/courses")}>View details</button>
                  <button style={styles.primaryBtn} onClick={() => navigate("/student/enroll")}>{c.status === "Enrolled" ? "Enrolled" : c.status === "Pending" ? "Pending approval" : "Enroll"}</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Requests + Enrollments */}
        <section style={styles.splitSection}>
          <div style={styles.panel}>
            <div style={styles.sectionHeadCompact}>
              <div>
                <div style={styles.sectionKicker}>Requests</div>
                <h4 style={styles.sectionTitleSm}>Course enrollment / drop / access</h4>
              </div>
              <button style={styles.linkBtn} onClick={() => navigate("/student/requests")}>Submit new</button>
            </div>
            <div style={styles.list}>
              {requests.map((r) => (
                <div key={r.id} style={styles.listRow}>
                  <div>
                    <div style={styles.listTitle}>{r.type}</div>
                    <div style={styles.listMeta}>{r.course} · {r.time}</div>
                  </div>
                  <span style={{ ...styles.statusPill, ...statusChip(r.status) }}>{r.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.panel}>
            <div style={styles.sectionHeadCompact}>
              <div>
                <div style={styles.sectionKicker}>My Enrollments</div>
                <h4 style={styles.sectionTitleSm}>Track status & progress</h4>
              </div>
              <button style={styles.linkBtn} onClick={() => navigate("/student/courses")}>Open list</button>
            </div>
            <div style={styles.list}>
              {enrollments.map((e) => (
                <div key={e.id} style={styles.listRow}>
                  <div>
                    <div style={styles.listTitle}>{e.course}</div>
                    <div style={styles.listMeta}>{e.instructor}</div>
                    <div style={styles.progressTrack}>
                      <div style={{ ...styles.progressFill, width: `${e.progress}%` }} />
                    </div>
                  </div>
                  <span style={{ ...styles.statusPill, ...statusChip(e.status) }}>{e.status}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section style={styles.section}>
          <div style={styles.sectionHeadCompact}>
            <div>
              <div style={styles.sectionKicker}>Notifications</div>
              <h4 style={styles.sectionTitleSm}>Approvals, updates, admin messages</h4>
            </div>
            <button style={styles.linkBtn}>Mark all read</button>
          </div>
          <div style={styles.list}>
            {notifications.map((n) => (
              <div key={n.id} style={styles.listRow}>
                <div style={styles.notifDot} />
                <div style={styles.listTitle}>{n.text}</div>
                <span style={{ ...styles.statusPill, ...statusChip(n.kind === "success" ? "Approved" : n.kind === "pending" ? "Pending" : "Enrolled") }}>{n.kind}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

const styles = {
  shell: { display: "flex", minHeight: "100vh", background: "#f5f7fb", color: "#0f172a", fontFamily: "Inter, Poppins, system-ui, -apple-system, 'Segoe UI', sans-serif" },
  sidebar: { width: 250, background: "#ffffff", color: "#1e293b", padding: "22px 18px", display: "flex", flexDirection: "column", gap: 18, borderRight: "1px solid #e2e8f0", boxShadow: "0 6px 20px rgba(15,23,42,0.06)" },
  logoRow: { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 12, background: "linear-gradient(135deg, #1d4ed8 0%, #60a5fa 100%)", color: "#fff" },
  logoMark: { width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 },
  logoTitle: { fontWeight: 800, letterSpacing: 0.3 },
  logoSub: { fontSize: 12, opacity: 0.9 },
  nav: { display: "flex", flexDirection: "column", gap: 8 },
  navItem: { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 12, cursor: "pointer", fontWeight: 600, color: "#1e293b", transition: "background 0.2s, color 0.2s, transform 0.1s", borderLeft: "4px solid transparent" },
  navItemHover: { background: "#EAF2FF", color: "#1E40AF", borderLeft: "4px solid #2563EB" },
  navItemActive: { background: "#EAF2FF", color: "#1E40AF", borderLeft: "4px solid #2563EB", transform: "translateX(2px)" },
  navIcon: { fontSize: 16 },
  logoutBtn: { marginTop: "auto", padding: "10px 12px", borderRadius: 12, border: "1px solid #e2e8f0", background: "#f8fafc", color: "#0f172a", cursor: "pointer", fontWeight: 700 },
  main: { flex: 1, background: "#f5f7fb", padding: "24px 28px 40px", display: "flex", flexDirection: "column", gap: 18 },
  topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", color: "#0f172a", gap: 12 },
  topLeft: {},
  pageTitle: { fontSize: 22, fontWeight: 800 },
  pageMeta: { color: "#475569", marginTop: 4 },
  topRight: { display: "flex", alignItems: "center", gap: 14, position: "relative" },
  bell: { position: "relative", padding: 10, background: "#ffffff", borderRadius: 14, border: "1px solid #e2e8f0", cursor: "pointer", boxShadow: "0 10px 24px rgba(15,23,42,0.08)" },
  bellBadge: { position: "absolute", top: 4, right: 4, background: "#ef4444", color: "#fff", borderRadius: 999, fontSize: 10, padding: "2px 6px" },
  user: { display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: "#ffffff", borderRadius: 14, border: "1px solid #e2e8f0", cursor: "pointer", boxShadow: "0 10px 24px rgba(15,23,42,0.08)" },
  avatar: { width: 36, height: 36, borderRadius: 12, background: "#1d4ed8", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 },
  userName: { fontWeight: 700, color: "#0f172a" },
  userMeta: { fontSize: 12, color: "#475569" },
  dropdown: { position: "absolute", top: 52, right: 0, background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 12, boxShadow: "0 18px 40px rgba(15,23,42,0.12)", minWidth: 160, zIndex: 10 },
  dropdownItem: { padding: "12px 14px", color: "#0f172a", cursor: "pointer", borderBottom: "1px solid #f1f5f9" },
  cardsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14 },
  card: { display: "flex", gap: 12, alignItems: "center", padding: "16px 18px", background: "#ffffff", borderRadius: 16, border: "1px solid #e2e8f0", cursor: "pointer", color: "#0f172a", boxShadow: "0 12px 30px rgba(15,23,42,0.08)" },
  cardIcon: { fontSize: 28 },
  cardValue: { fontSize: 26, fontWeight: 800 },
  cardLabel: { color: "#475569", fontSize: 12, marginTop: 2 },
  section: { background: "#ffffff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 18, color: "#0f172a", boxShadow: "0 12px 30px rgba(15,23,42,0.08)" },
  sectionHead: { display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" },
  sectionHeadCompact: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, gap: 8, flexWrap: "wrap" },
  sectionKicker: { fontSize: 12, letterSpacing: 0.4, textTransform: "uppercase", color: "#3b82f6" },
  sectionTitle: { margin: "4px 0 0 0", fontSize: 18, fontWeight: 800 },
  sectionTitleSm: { margin: "2px 0 0 0", fontSize: 16, fontWeight: 800 },
  filters: { display: "flex", gap: 10, flexWrap: "wrap" },
  filterSelect: { background: "#ffffff", color: "#0f172a", border: "1px solid #e2e8f0", borderRadius: 12, padding: "8px 10px", boxShadow: "0 8px 20px rgba(15,23,42,0.06)" },
  courseGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12, marginTop: 14 },
  courseCard: { background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 14, padding: 14, display: "flex", flexDirection: "column", gap: 8, boxShadow: "0 10px 26px rgba(15,23,42,0.08)" },
  courseTop: { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" },
  courseTitle: { fontWeight: 800, color: "#0f172a" },
  courseMeta: { color: "#475569", fontSize: 12 },
  courseTags: { display: "flex", gap: 8, flexWrap: "wrap" },
  tag: { padding: "4px 8px", background: "#f8fafc", color: "#0f172a", borderRadius: 10, fontSize: 12, border: "1px solid #e2e8f0" },
  courseActions: { display: "flex", gap: 8, marginTop: 6, flexWrap: "wrap" },
  ghostBtn: { flex: 1, minWidth: 140, padding: "10px 12px", borderRadius: 12, border: "1px solid #e2e8f0", background: "#ffffff", color: "#0f172a", cursor: "pointer", fontWeight: 700 },
  primaryBtn: { flex: 1, minWidth: 140, padding: "10px 12px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #1d4ed8, #60a5fa)", color: "#fff", cursor: "pointer", fontWeight: 800, boxShadow: "0 10px 24px rgba(37,78,216,0.25)" },
  splitSection: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14 },
  panel: { background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 14, padding: 14, color: "#0f172a", boxShadow: "0 10px 26px rgba(15,23,42,0.08)" },
  list: { display: "flex", flexDirection: "column", gap: 10 },
  listRow: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: 12, flexWrap: "wrap" },
  listTitle: { fontWeight: 700, color: "#0f172a" },
  listMeta: { color: "#475569", fontSize: 12 },
  statusPill: { padding: "6px 10px", borderRadius: 999, fontSize: 12, fontWeight: 700, border: "1px solid transparent" },
  linkBtn: { border: "none", background: "transparent", color: "#1d4ed8", cursor: "pointer", fontWeight: 700 },
  progressTrack: { marginTop: 6, height: 8, background: "#e2e8f0", borderRadius: 999, overflow: "hidden" },
  progressFill: { height: "100%", background: "linear-gradient(135deg, #1d4ed8, #60a5fa)" },
  notifDot: { width: 10, height: 10, background: "#22c55e", borderRadius: "50%" },
};

export default StudentDashboard;
