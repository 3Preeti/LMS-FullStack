import { useEffect, useState } from "react";
import api from "../api/axios";
import { colors, shadows, radius } from "../ui/theme";

const EnrollCourses = () => {
  const [available, setAvailable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        const res = await api.get("/api/courses/available");
        setAvailable(res.data);
      } catch (e) {
        // Fallback demo catalog with Udemy-style details
        setAvailable([
          {
            id: 1001,
            code: "CS301",
            title: "Object-Oriented Programming in Java",
            credits: 3,
            level: "Intermediate",
            duration: "8 weeks",
            instructor: "Dr. Java Khan",
            rating: 4.7,
            description:
              "Master OOP in Java: classes, objects, inheritance, polymorphism, collections, streams, and modern tooling (Maven/Gradle). Build robust applications with clean architecture and testing.",
            outcomes: [
              "Write reusable OOP components",
              "Use collections & streams effectively",
              "Structure apps with packages and build tools",
              "Test and debug Java applications",
            ],
          },
          {
            id: 1002,
            code: "CS202",
            title: "Python Programming",
            credits: 3,
            level: "Beginner",
            duration: "6 weeks",
            instructor: "Ms. Py Noor",
            rating: 4.8,
            description:
              "Hands-on Python: syntax, data structures, modules, virtual environments, file I/O, and scripting for automation. Intro to pandas and requests for practical tasks.",
            outcomes: [
              "Write clean Python scripts",
              "Manage packages & venvs",
              "Process files and data",
              "Call APIs and parse JSON",
            ],
          },
          {
            id: 1003,
            code: "CAD101",
            title: "Computer-Aided Design (CAD)",
            credits: 3,
            level: "Beginner",
            duration: "6 weeks",
            instructor: "Engr. Ahsan Malik",
            rating: 4.6,
            description:
              "Learn 2D/3D modeling concepts, constraints, assemblies, parametric design, and basic rendering workflows using industry tools.",
            outcomes: [
              "Create precise 2D drawings",
              "Build parametric 3D parts",
              "Assemble multi-part models",
              "Export and render designs",
            ],
          },
          {
            id: 1004,
            code: "UX101",
            title: "UI/UX Design Fundamentals",
            credits: 3,
            level: "Beginner",
            duration: "5 weeks",
            instructor: "Sarah Ali",
            rating: 4.9,
            description:
              "Human-centered design, research, wireframing, prototyping, usability testing, and design systems using Figma. Deliver accessible, consistent experiences.",
            outcomes: [
              "Plan user-centered flows",
              "Create wireframes & prototypes",
              "Run quick usability tests",
              "Apply a design system",
            ],
          },
          {
            id: 1005,
            code: "CS210",
            title: "Algorithms",
            credits: 4,
            level: "Intermediate",
            duration: "9 weeks",
            instructor: "Dr. Ahmad Raza",
            rating: 4.7,
            description:
              "Analyze and implement sorting, searching, graph algorithms, and dynamic programming with time/space complexity trade-offs.",
            outcomes: [
              "Analyze complexity",
              "Implement key algorithms",
              "Solve DP and graph problems",
              "Compare algorithmic trade-offs",
            ],
          },
          {
            id: 1006,
            code: "CS302",
            title: "Operating Systems",
            credits: 4,
            level: "Advanced",
            duration: "10 weeks",
            instructor: "Prof. Hammad Siddiq",
            rating: 4.6,
            description:
              "Concurrency, scheduling, memory management, file systems, and process control. Labs in C/Linux to reinforce core OS concepts.",
            outcomes: [
              "Write concurrent programs",
              "Understand scheduling & memory",
              "Work with file systems",
              "Use OS APIs for processes",
            ],
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const enroll = async (courseId) => {
    try {
      await api.post("/api/enrollments", { courseId });
      setMessage("Enrollment requested successfully.");
    } catch (e) {
      setMessage("Enrollment simulated (backend not ready).");
    }
  };

  if (loading) return <div style={styles.page}>Loading...</div>;

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div>
          <div style={styles.heroKicker}>Planner</div>
          <h1 style={styles.heroTitle}>Enroll in courses</h1>
          <p style={styles.heroSub}>Pick new courses and add them to your plan.</p>
        </div>
      </section>
      {message && <div style={styles.message}>{message}</div>}
      <div style={styles.list}>
        {available.map((c) => (
          <div key={c.id} style={styles.item}>
            <div style={styles.itemHead}>
              <div style={styles.itemTitle}>{c.title}</div>
              <span style={styles.badge}>{c.code}</span>
            </div>
            {c.description && <p style={styles.itemDesc}>{c.description}</p>}
            <div style={styles.itemMeta}>
              <span>Credits: {c.credits ?? "-"}</span> · <span>Level: {c.level ?? "-"}</span> · <span>Duration: {c.duration ?? "-"}</span>
            </div>
            <div style={styles.itemMeta}>
              <span>Instructor: {c.instructor ?? "TBA"}</span> · <span>Rating: {c.rating ? `${c.rating}★` : "N/A"}</span>
            </div>
            {Array.isArray(c.outcomes) && c.outcomes.length > 0 && (
              <ul style={styles.outcomes}>
                {c.outcomes.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
            )}
            <button style={styles.btn} onClick={() => enroll(c.id)}>Enroll</button>
          </div>
        ))}
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
    background: `linear-gradient(120deg, ${colors.primary} 0%, #6f89ff 60%, #92a9ff 100%)`,
    color: "#fff",
    padding: 24,
    borderRadius: radius.lg,
    boxShadow: shadows.card,
    marginBottom: 16,
  },
  heroKicker: { opacity: 0.9, fontSize: 14 },
  heroTitle: { margin: "4px 0", fontSize: 28, fontWeight: 800 },
  heroSub: { margin: 0, opacity: 0.95 },
  list: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 },
  item: { background: colors.card, border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: 16, boxShadow: shadows.soft },
  itemHead: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 },
  itemTitle: { fontWeight: 700, fontSize: 16, color: colors.text },
  badge: { background: colors.primary, color: "#fff", fontSize: 12, padding: "4px 8px", borderRadius: radius.sm, boxShadow: shadows.soft },
  itemDesc: { marginTop: 10, color: colors.muted, lineHeight: 1.5, fontSize: 13 },
  itemMeta: { marginTop: 6, color: colors.muted, fontSize: 12 },
  outcomes: { marginTop: 8, marginBottom: 8, paddingLeft: 18, color: colors.muted, fontSize: 12 },
  btn: { marginTop: 12, padding: "10px 14px", background: colors.primary, color: "#fff", border: "none", borderRadius: radius.sm, cursor: "pointer", fontWeight: 700 },
  message: { marginBottom: 12, color: "#1f6f43" },
};

export default EnrollCourses;
