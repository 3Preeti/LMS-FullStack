import { useEffect, useState } from "react";
import api from "../api/axios";
import { colors, shadows, radius } from "../ui/theme";

const ManageCourseContent = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        const res = await api.get("/api/faculty/courses");
        setCourses(res.data);
      } catch (e) {
        // Fallback demo data
        setCourses([
          {
            id: 101,
            code: "CS301",
            title: "Object-Oriented Programming in Java",
            content: "Week 1: Introduction to OOP\nWeek 2: Classes and Objects\nWeek 3: Inheritance...",
          },
          {
            id: 102,
            code: "CS202",
            title: "Python Programming",
            content: "Week 1: Python Basics\nWeek 2: Data Structures\nWeek 3: Functions and Modules...",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setContent(course.content || "");
    setMessage("");
  };

  const handleSave = async () => {
    if (!selectedCourse) return;
    try {
      await api.put(`/api/courses/${selectedCourse.id}/content`, { content });
      setMessage("Content saved successfully!");
      setCourses((prev) =>
        prev.map((c) => (c.id === selectedCourse.id ? { ...c, content } : c))
      );
    } catch (e) {
      setMessage("Content save simulated (backend not ready).");
    }
  };

  if (loading) return <div style={styles.page}>Loading...</div>;

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div>
          <div style={styles.heroKicker}>Faculty Tools</div>
          <h1 style={styles.heroTitle}>Manage course content</h1>
          <p style={styles.heroSub}>Update syllabus, materials, and learning outcomes.</p>
        </div>
      </section>

      {message && <div style={styles.message}>{message}</div>}

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
              <span style={styles.courseCode}>{c.code}</span>
              <div style={styles.courseTitle}>{c.title}</div>
            </div>
          ))}
        </div>

        <div style={styles.mainContent}>
          {selectedCourse ? (
            <>
              <div style={styles.editorHeader}>
                <div>
                  <span style={styles.badge}>{selectedCourse.code}</span>
                  <div style={styles.editorTitle}>{selectedCourse.title}</div>
                </div>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={styles.editor}
                placeholder="Enter course content, syllabus, topics, assignments, reading materials..."
              />
              <button onClick={handleSave} style={styles.btn}>
                Save Content
              </button>
            </>
          ) : (
            <div style={styles.placeholder}>Select a course to manage content</div>
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
  message: { marginBottom: 12, color: "#1f6f43", background: "#d4edda", padding: "10px 14px", borderRadius: radius.sm, border: "1px solid #c3e6cb" },
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
  courseCode: { fontSize: 11, fontWeight: 700, color: colors.primary },
  courseTitle: { fontSize: 13, marginTop: 3, color: colors.text },
  mainContent: {
    flex: 1,
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.md,
    padding: 20,
    boxShadow: shadows.soft,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  editorHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  badge: { background: "#28a745", color: "#fff", fontSize: 11, padding: "4px 8px", borderRadius: radius.sm, fontWeight: 700 },
  editorTitle: { fontWeight: 700, fontSize: 18, marginTop: 6, color: colors.text },
  editor: {
    minHeight: 400,
    padding: 12,
    borderRadius: radius.sm,
    border: `1px solid ${colors.border}`,
    fontFamily: "'Consolas', 'Courier New', monospace",
    fontSize: 13,
    lineHeight: 1.6,
    resize: "vertical",
  },
  btn: {
    alignSelf: "flex-start",
    padding: "12px 18px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: radius.sm,
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 14,
  },
  placeholder: { color: colors.muted, fontSize: 14, textAlign: "center", padding: 40 },
};

export default ManageCourseContent;
