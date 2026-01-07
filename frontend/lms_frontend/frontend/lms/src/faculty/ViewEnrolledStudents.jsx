import { useEffect, useState } from "react";
import api from "../api/axios";
import { colors, shadows, radius } from "../ui/theme";

const ViewEnrolledStudents = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await api.get("/api/faculty/courses");
        setCourses(res.data);
      } catch (e) {
        // Fallback demo data
        setCourses([
          { id: 101, code: "CS301", title: "Object-Oriented Programming in Java", enrolled: 45 },
          { id: 102, code: "CS202", title: "Python Programming", enrolled: 38 },
          { id: 103, code: "CS210", title: "Algorithms", enrolled: 52 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const handleSelectCourse = async (course) => {
    setSelectedCourse(course);
    try {
      const res = await api.get(`/api/courses/${course.id}/students`);
      setStudents(res.data);
    } catch (e) {
      // Fallback demo data
      setStudents([
        {
          id: 1,
          name: "Mustafa Aqeel",
          rollNumber: "20F-0117",
          email: "f200117@cfd.nu.edu.pk",
          section: "8A",
          batch: "2020",
        },
        {
          id: 2,
          name: "Sara Khan",
          rollNumber: "20F-0215",
          email: "f200215@cfd.nu.edu.pk",
          section: "8B",
          batch: "2020",
        },
        {
          id: 3,
          name: "Ali Hassan",
          rollNumber: "20F-0089",
          email: "f200089@cfd.nu.edu.pk",
          section: "8A",
          batch: "2020",
        },
        {
          id: 4,
          name: "Fatima Noor",
          rollNumber: "20F-0142",
          email: "f200142@cfd.nu.edu.pk",
          section: "8C",
          batch: "2020",
        },
      ]);
    }
  };

  if (loading) return <div style={styles.page}>Loading...</div>;

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div>
          <div style={styles.heroKicker}>Faculty Tools</div>
          <h1 style={styles.heroTitle}>View enrolled students</h1>
          <p style={styles.heroSub}>See who's taking your courses this semester.</p>
        </div>
      </section>

      <div style={styles.layout}>
        <div style={styles.sidebar}>
          <div style={styles.sidebarHeader}>Your Courses</div>
          {courses.map((c) => (
            <div
              key={c.id}
              style={{
                ...styles.courseItem,
                ...(selectedCourse?.id === c.id ? styles.courseItemActive : {}),
              }}
              onClick={() => handleSelectCourse(c)}
            >
              <div style={styles.courseHeader}>
                <span style={styles.courseCode}>{c.code}</span>
                <span style={styles.enrolledCount}>{c.enrolled || 0} students</span>
              </div>
              <div style={styles.courseTitle}>{c.title}</div>
            </div>
          ))}
        </div>

        <div style={styles.mainContent}>
          {selectedCourse ? (
            <>
              <div style={styles.contentHeader}>
                <div>
                  <span style={styles.badge}>{selectedCourse.code}</span>
                  <div style={styles.contentTitle}>{selectedCourse.title}</div>
                  <div style={styles.subtitle}>{students.length} enrolled students</div>
                </div>
              </div>

              <div style={styles.studentList}>
                {students.map((student) => (
                  <div key={student.id} style={styles.studentCard}>
                    <div style={styles.avatarStudent}>{student.name[0]}</div>
                    <div style={styles.studentInfo}>
                      <div style={styles.studentName}>{student.name}</div>
                      <div style={styles.studentMeta}>
                        {student.rollNumber} · {student.section} · Batch {student.batch}
                      </div>
                      <div style={styles.studentEmail}>{student.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={styles.placeholder}>Select a course to view enrolled students</div>
          )}
        </div>
      </div>
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
  layout: { display: "flex", gap: 16, alignItems: "flex-start" },
  sidebar: {
    width: 280,
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.md,
    padding: 12,
    boxShadow: shadows.soft,
  },
  sidebarHeader: { fontWeight: 800, fontSize: 14, marginBottom: 10, color: colors.text },
  courseItem: {
    padding: 10,
    borderRadius: radius.sm,
    marginBottom: 6,
    cursor: "pointer",
    transition: "background 0.2s ease",
    background: "rgba(0,0,0,0.02)",
  },
  courseItemActive: { background: colors.primaryLight, border: `2px solid ${colors.primary}` },
  courseHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  courseCode: { fontSize: 11, fontWeight: 700, color: colors.primary },
  enrolledCount: { fontSize: 11, color: colors.muted },
  courseTitle: { fontSize: 13, marginTop: 3, color: colors.text },
  mainContent: {
    flex: 1,
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.md,
    padding: 20,
    boxShadow: shadows.soft,
  },
  contentHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 },
  badge: { background: "#28a745", color: "#fff", fontSize: 11, padding: "4px 8px", borderRadius: radius.sm, fontWeight: 700 },
  contentTitle: { fontWeight: 700, fontSize: 18, marginTop: 6, color: colors.text },
  subtitle: { fontSize: 13, color: colors.muted, marginTop: 4 },
  studentList: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 },
  studentCard: {
    display: "flex",
    gap: 12,
    padding: 14,
    background: "rgba(0,0,0,0.02)",
    borderRadius: radius.sm,
    border: `1px solid ${colors.border}`,
  },
  avatarStudent: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    background: "#f7b500",
    color: "#1b2530",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 18,
  },
  studentInfo: { flex: 1 },
  studentName: { fontWeight: 700, fontSize: 15, color: colors.text },
  studentMeta: { fontSize: 12, color: colors.muted, marginTop: 2 },
  studentEmail: { fontSize: 12, color: colors.primary, marginTop: 4 },
  placeholder: { color: colors.muted, fontSize: 14, textAlign: "center", padding: 40 },
};

export default ViewEnrolledStudents;
