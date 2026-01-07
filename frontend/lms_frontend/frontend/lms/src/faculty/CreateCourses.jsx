import { useState } from "react";
import api from "../api/axios";
import { colors, shadows, radius } from "../ui/theme";

const CreateCourses = () => {
  const [formData, setFormData] = useState({
    code: "",
    title: "",
    description: "",
    category: "Computer Science",
    duration: "8 weeks",
    visibility: "Public",
  });
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/courses", formData);
      setMessage("Course created successfully!");
      setFormData({
        code: "",
        title: "",
        description: "",
        category: "Computer Science",
        duration: "8 weeks",
        visibility: "Public",
      });
    } catch (e) {
      setMessage("Course creation simulated (backend not ready).");
    }
  };

  const handleFileUpload = (e) => {
    const uploaded = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...uploaded]);
    setMessage(`${uploaded.length} file(s) uploaded.`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={styles.shell}>
      <aside style={styles.sidebar}>
        <div style={styles.logoBox}>LMS</div>
      </aside>

      <main style={styles.main}>
        <header style={styles.topNav}>
          <h2 style={styles.pageTitle}>➕ Create New Course</h2>
        </header>

        <div style={styles.container}>
          {message && <div style={styles.message}>{message}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <h3 style={styles.formTitle}>Course Information</h3>

            <div style={styles.row2}>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>Course Code *</label>
                <input name="code" value={formData.code} onChange={handleChange} style={styles.input} placeholder="e.g., CS301" required />
              </div>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>Category</label>
                <select name="category" value={formData.category} onChange={handleChange} style={styles.input}>
                  <option>Computer Science</option>
                  <option>Engineering</option>
                  <option>Business</option>
                  <option>Arts</option>
                </select>
              </div>
            </div>

            <div>
              <label style={styles.label}>Course Title *</label>
              <input name="title" value={formData.title} onChange={handleChange} style={styles.input} placeholder="e.g., Advanced Java Programming" required />
            </div>

            <div style={styles.row2}>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>Duration</label>
                <input name="duration" value={formData.duration} onChange={handleChange} style={styles.input} placeholder="e.g., 8 weeks" />
              </div>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>Visibility</label>
                <select name="visibility" value={formData.visibility} onChange={handleChange} style={styles.input}>
                  <option>Public</option>
                  <option>Private</option>
                  <option>Draft</option>
                </select>
              </div>
            </div>

            <div>
              <label style={styles.label}>Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} style={{ ...styles.input, minHeight: 100 }} placeholder="Describe the course content, objectives, and outcomes..." />
            </div>

            <button type="submit" style={styles.btn}>
              Create Course
            </button>
          </form>

          <div style={styles.uploadSection}>
            <h3 style={styles.formTitle}>📤 Upload Course Materials</h3>
            <div style={styles.uploadBox}>
              <input type="file" multiple onChange={handleFileUpload} style={styles.fileInput} />
              <div style={styles.uploadPlaceholder}>
                <div style={styles.uploadIcon}>📁</div>
                <p>Click or drag files here</p>
                <p style={styles.uploadHint}>Supported: Videos, PDFs, Images, Documents</p>
              </div>
            </div>

            {files.length > 0 && (
              <div style={styles.fileList}>
                <h4 style={styles.fileListTitle}>Uploaded Files ({files.length})</h4>
                {files.map((file, i) => (
                  <div key={i} style={styles.fileItem}>
                    📄 {file.name}
                    <span style={styles.fileSize}>({(file.size / 1024).toFixed(2)} KB)</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const styles = {
  shell: { display: "flex", minHeight: "100vh", background: "#f4f6fb", fontFamily: "'Segoe UI', Tahoma, sans-serif", color: "#17212b" },
  sidebar: { width: "260px", background: "linear-gradient(180deg, #5d6bff 0%, #5260c7 100%)", color: "#fff", padding: "24px 18px", display: "flex", flexDirection: "column" },
  logoBox: { height: "60px", borderRadius: "12px", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "20px" },
  main: { flex: 1, display: "flex", flexDirection: "column" },
  topNav: { background: "#fff", borderBottom: "1px solid #e4e8f0", padding: "20px 28px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" },
  pageTitle: { margin: 0, fontSize: 20, fontWeight: 800, color: "#17212b" },
  container: { flex: 1, padding: "28px", overflow: "auto" },
  message: { marginBottom: 16, color: "#1f6f43", background: "#d4edda", padding: "12px 16px", borderRadius: 8, border: "1px solid #c3e6cb" },
  form: { background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", marginBottom: 24 },
  formTitle: { margin: "0 0 16px 0", fontSize: 16, fontWeight: 800, color: "#17212b" },
  row2: { display: "flex", gap: 16, marginBottom: 16 },
  label: { fontWeight: 700, display: "block", marginBottom: 6, color: "#17212b", fontSize: 13 },
  input: { padding: "10px 12px", borderRadius: 8, border: "1px solid #e4e8f0", width: "100%", fontSize: 14, fontFamily: "inherit" },
  btn: { marginTop: 8, padding: "12px 20px", background: "#5d6bff", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 },
  uploadSection: { background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" },
  uploadBox: { position: "relative", border: "2px dashed #5d6bff", borderRadius: 10, padding: 40, textAlign: "center", cursor: "pointer", background: "#f9fafb", transition: "all 0.2s" },
  fileInput: { position: "absolute", inset: 0, opacity: 0, cursor: "pointer" },
  uploadPlaceholder: { pointerEvents: "none" },
  uploadIcon: { fontSize: 40, marginBottom: 8 },
  uploadHint: { fontSize: 12, color: "#6b7684", margin: "4px 0 0 0" },
  fileList: { marginTop: 16, padding: 16, background: "#f9fafb", borderRadius: 8 },
  fileListTitle: { margin: "0 0 10px 0", fontSize: 13, fontWeight: 700, color: "#17212b" },
  fileItem: { padding: "8px", fontSize: 13, color: "#17212b", borderBottom: "1px solid #e4e8f0" },
  fileSize: { fontSize: 11, color: "#6b7684", marginLeft: 8 },
};

export default CreateCourses;
