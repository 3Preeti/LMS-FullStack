import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { colors, shadows, radius } from "../ui/theme";

const ViewCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await api.get("/api/students/me/courses");
        setCourses(res.data);
      } catch (e) {
        // Fallback demo data
        setCourses([
          {
            code: "CS101",
            title: "Intro to Programming",
            credits: 3,
            description: "Fundamentals of programming, problem solving, and core concepts using a modern language.",
          },
          {
            code: "CS201",
            title: "Data Structures",
            credits: 4,
            description: "Lists, stacks, queues, trees, graphs and algorithmic trade-offs for performance.",
          },
          {
            code: "CS301",
            title: "Object-Oriented Programming in Java",
            credits: 3,
            description: "Classes, objects, inheritance, polymorphism, collections, streams, and Java tooling.",
          },
          {
            code: "CS202",
            title: "Python Programming",
            credits: 3,
            description: "Python syntax, data structures, modules, virtual environments, and scripting for automation.",
          },
          {
            code: "CAD101",
            title: "Computer-Aided Design (CAD)",
            credits: 3,
            description: "2D/3D modeling concepts, constraints, assemblies, and basic rendering workflows.",
          },
          {
            code: "UX101",
            title: "UI/UX Design Fundamentals",
            credits: 3,
            description: "Human-centered design, wireframing, prototyping, usability testing, and design systems.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  if (loading) return <div style={styles.page}>Loading...</div>;

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div>
          <div style={styles.heroKicker}>Academics</div>
          <h1 style={styles.heroTitle}>Your Courses</h1>
          <p style={styles.heroSub}>All enrolled courses with credits and codes.</p>
        </div>
      </section>
      <div style={styles.list}>
        {courses.map((c) => (
          <div key={c.code} style={styles.item}>
            <div style={styles.itemHead}>
              <span style={styles.badge}>{c.code}</span>
              <div style={styles.itemTitle}>{c.title}</div>
            </div>
            <div style={styles.itemMeta}>Credits: {c.credits}</div>
            {c.description && <p style={styles.itemDesc}>{c.description}</p>}

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
  itemHead: { display: "flex", alignItems: "center", gap: 12 },
  itemTitle: { fontWeight: 700, fontSize: 16, color: colors.text },
  itemMeta: { color: colors.muted, fontSize: 13, marginTop: 6 },
  badge: { background: colors.primary, color: "#fff", fontSize: 12, padding: "4px 8px", borderRadius: radius.sm, boxShadow: shadows.soft },
  itemDesc: { marginTop: 10, color: colors.muted, lineHeight: 1.5, fontSize: 13 },

};

export default ViewCourses;
