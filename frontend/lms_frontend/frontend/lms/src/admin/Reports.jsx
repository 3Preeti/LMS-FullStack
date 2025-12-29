import { useState, useEffect } from "react";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("activity");
  const [activities, setActivities] = useState([]);
  const [courseStats, setCourseStats] = useState([]);
  const [enrollmentStats, setEnrollmentStats] = useState([]);

  useEffect(() => {
    // Load activities from localStorage or use demo
    const stored = localStorage.getItem("auditLogs");
    if (stored) {
      const logs = JSON.parse(stored).slice(-10);
      setActivities(logs.map((l) => ({ timestamp: l.timestamp, action: l.action, user: l.user, status: "completed" })));
    } else {
      setActivities([
        { timestamp: "2024-01-15 14:30", action: "Faculty Created", user: "Dr. Ahmad Raza", status: "completed" },
        { timestamp: "2024-01-15 13:15", action: "Student Enrolled", user: "Mustafa Aqeel", status: "completed" },
        { timestamp: "2024-01-15 12:00", action: "Role Changed", user: "Admin", status: "completed" },
      ]);
    }

    setCourseStats([
      { courseCode: "CS101", courseName: "Intro to CS", enrolledCount: 124, completionRate: "68%", avgGrade: "3.2" },
      { courseCode: "CS201", courseName: "Data Structures", enrolledCount: 98, completionRate: "72%", avgGrade: "3.4" },
      { courseCode: "CS301", courseName: "Algorithms", enrolledCount: 87, completionRate: "65%", avgGrade: "3.1" },
    ]);

    setEnrollmentStats([
      { semester: "Fall 2024", totalEnrollments: 892, activeStudents: 756, completionRate: "68%" },
      { semester: "Spring 2024", totalEnrollments: 745, activeStudents: 612, completionRate: "72%" },
      { semester: "Fall 2023", totalEnrollments: 698, activeStudents: 589, completionRate: "70%" },
    ]);
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📈 Reports & Analytics</h2>

      <div style={styles.tabs}>
        {["activity", "courses", "enrollment", "workload"].map((tab) => (
          <button
            key={tab}
            style={{ ...styles.tab, borderBottom: activeTab === tab ? "3px solid #5d6bff" : "none", color: activeTab === tab ? "#5d6bff" : "#6b7684" }}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "activity" && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>User Activity Log</h3>
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th style={styles.th}>Timestamp</th>
                <th style={styles.th}>Action</th>
                <th style={styles.th}>User</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, i) => (
                <tr key={i} style={styles.row}>
                  <td style={styles.td}>{activity.timestamp}</td>
                  <td style={styles.td}>{activity.action}</td>
                  <td style={styles.td}>{activity.user}</td>
                  <td style={styles.td}><span style={styles.badge}>{activity.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "courses" && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Course Statistics</h3>
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th style={styles.th}>Course Code</th>
                <th style={styles.th}>Course Name</th>
                <th style={styles.th}>Enrolled Count</th>
                <th style={styles.th}>Completion Rate</th>
                <th style={styles.th}>Avg Grade</th>
              </tr>
            </thead>
            <tbody>
              {courseStats.map((stat, i) => (
                <tr key={i} style={styles.row}>
                  <td style={styles.td}><strong>{stat.courseCode}</strong></td>
                  <td style={styles.td}>{stat.courseName}</td>
                  <td style={styles.td}>{stat.enrolledCount}</td>
                  <td style={styles.td}>
                    <div style={styles.progressBar}>
                      <div style={{ ...styles.progressFill, width: stat.completionRate }}></div>
                    </div>
                    {stat.completionRate}
                  </td>
                  <td style={styles.td}>{stat.avgGrade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "enrollment" && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Enrollment Reports</h3>
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th style={styles.th}>Semester</th>
                <th style={styles.th}>Total Enrollments</th>
                <th style={styles.th}>Active Students</th>
                <th style={styles.th}>Completion Rate</th>
              </tr>
            </thead>
            <tbody>
              {enrollmentStats.map((stat, i) => (
                <tr key={i} style={styles.row}>
                  <td style={styles.td}><strong>{stat.semester}</strong></td>
                  <td style={styles.td}>{stat.totalEnrollments}</td>
                  <td style={styles.td}>{stat.activeStudents}</td>
                  <td style={styles.td}>{stat.completionRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "workload" && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Faculty Workload Analysis</h3>
          <div style={styles.workloadGrid}>
            <div style={styles.workloadCard}>
              <div style={styles.workloadTitle}>Dr. Ahmad Raza</div>
              <div style={styles.workloadStat}>3 Courses</div>
              <div style={styles.workloadStat}>245 Students</div>
              <div style={styles.workloadStat}>Moderate</div>
            </div>
            <div style={styles.workloadCard}>
              <div style={styles.workloadTitle}>Dr. Fatima Khan</div>
              <div style={styles.workloadStat}>2 Courses</div>
              <div style={styles.workloadStat}>156 Students</div>
              <div style={styles.workloadStat}>Light</div>
            </div>
            <div style={styles.workloadCard}>
              <div style={styles.workloadTitle}>Dr. Ali Hassan</div>
              <div style={styles.workloadStat}>5 Courses</div>
              <div style={styles.workloadStat}>398 Students</div>
              <div style={styles.workloadStat}>Heavy</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: "28px", background: "#f4f6fb", minHeight: "100vh" },
  title: { margin: "0 0 24px 0", fontSize: 24, fontWeight: 800, color: "#17212b" },
  tabs: { display: "flex", gap: 0, borderBottom: "1px solid #e4e8f0", marginBottom: 24 },
  tab: { padding: "12px 20px", background: "transparent", border: "none", fontWeight: 700, fontSize: 13, cursor: "pointer", color: "#6b7684" },
  section: { background: "#fff", borderRadius: "12px", padding: 20, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" },
  sectionTitle: { margin: "0 0 16px 0", fontSize: 16, fontWeight: 800, color: "#17212b" },
  table: { width: "100%", borderCollapse: "collapse" },
  headerRow: { background: "#f8f9fa", borderBottom: "1px solid #e4e8f0" },
  th: { padding: "14px 16px", textAlign: "left", fontWeight: 700, fontSize: 13, color: "#17212b" },
  row: { borderBottom: "1px solid #f0f0f0" },
  td: { padding: "14px 16px", fontSize: 13, color: "#17212b" },
  badge: { background: "#d4edda", color: "#155724", padding: "4px 8px", borderRadius: "6px", fontWeight: 700, fontSize: 11 },
  progressBar: { background: "#e4e8f0", borderRadius: "4px", height: 6, overflow: "hidden", marginBottom: 4 },
  progressFill: { background: "#5d6bff", height: "100%" },
  workloadGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 },
  workloadCard: { background: "#f8f9fa", borderRadius: "10px", padding: 16, borderLeft: "4px solid #5d6bff" },
  workloadTitle: { fontWeight: 800, fontSize: 14, color: "#17212b", marginBottom: 8 },
  workloadStat: { fontSize: 13, color: "#6b7684", marginBottom: 4 },
};

export default Reports;
