import { useState } from "react";

const SystemSettings = () => {
  const [tab, setTab] = useState("password");
  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: 8,
    requireUppercase: true,
    requireNumbers: true,
    requireSpecial: true,
  });
  const [semesterSetup, setSemesterSetup] = useState({
    currentSemester: "Fall 2024",
    startDate: "2024-09-01",
    endDate: "2024-12-15",
  });
  const [emailConfig, setEmailConfig] = useState({
    smtpServer: "smtp.gmail.com",
    port: 587,
    senderEmail: "admin@lms.edu",
    enableNotifications: true,
  });

  const handleSave = (section) => {
    console.log(`Saved ${section}`);
    alert(`${section} settings saved successfully!`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>⚙️ System Settings</h2>

      <div style={styles.tabs}>
        {["password", "semester", "email", "backup"].map((t) => (
          <button
            key={t}
            style={{ ...styles.tab, borderBottom: tab === t ? "3px solid #5d6bff" : "none", color: tab === t ? "#5d6bff" : "#6b7684" }}
            onClick={() => setTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "password" && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Password Policy</h3>
          <div style={styles.settingGroup}>
            <label style={styles.label}>
              Minimum Password Length:
              <input
                type="number"
                value={passwordPolicy.minLength}
                onChange={(e) => setPasswordPolicy({ ...passwordPolicy, minLength: parseInt(e.target.value) })}
                style={styles.input}
              />
            </label>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={passwordPolicy.requireUppercase}
                onChange={(e) => setPasswordPolicy({ ...passwordPolicy, requireUppercase: e.target.checked })}
              />
              Require Uppercase Letters
            </label>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={passwordPolicy.requireNumbers}
                onChange={(e) => setPasswordPolicy({ ...passwordPolicy, requireNumbers: e.target.checked })}
              />
              Require Numbers
            </label>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={passwordPolicy.requireSpecial}
                onChange={(e) => setPasswordPolicy({ ...passwordPolicy, requireSpecial: e.target.checked })}
              />
              Require Special Characters
            </label>
          </div>
          <button style={styles.saveBtn} onClick={() => handleSave("Password Policy")}>
            💾 Save Password Policy
          </button>
        </div>
      )}

      {tab === "semester" && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Semester / Session Setup</h3>
          <div style={styles.settingGroup}>
            <label style={styles.label}>
              Current Semester:
              <input
                type="text"
                value={semesterSetup.currentSemester}
                onChange={(e) => setSemesterSetup({ ...semesterSetup, currentSemester: e.target.value })}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Start Date:
              <input
                type="date"
                value={semesterSetup.startDate}
                onChange={(e) => setSemesterSetup({ ...semesterSetup, startDate: e.target.value })}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              End Date:
              <input
                type="date"
                value={semesterSetup.endDate}
                onChange={(e) => setSemesterSetup({ ...semesterSetup, endDate: e.target.value })}
                style={styles.input}
              />
            </label>
          </div>
          <button style={styles.saveBtn} onClick={() => handleSave("Semester Setup")}>
            💾 Save Semester Setup
          </button>
        </div>
      )}

      {tab === "email" && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Email Configuration</h3>
          <div style={styles.settingGroup}>
            <label style={styles.label}>
              SMTP Server:
              <input
                type="text"
                value={emailConfig.smtpServer}
                onChange={(e) => setEmailConfig({ ...emailConfig, smtpServer: e.target.value })}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Port:
              <input
                type="number"
                value={emailConfig.port}
                onChange={(e) => setEmailConfig({ ...emailConfig, port: parseInt(e.target.value) })}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Sender Email:
              <input
                type="email"
                value={emailConfig.senderEmail}
                onChange={(e) => setEmailConfig({ ...emailConfig, senderEmail: e.target.value })}
                style={styles.input}
              />
            </label>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={emailConfig.enableNotifications}
                onChange={(e) => setEmailConfig({ ...emailConfig, enableNotifications: e.target.checked })}
              />
              Enable Email Notifications
            </label>
          </div>
          <button style={styles.saveBtn} onClick={() => handleSave("Email Configuration")}>
            💾 Save Email Configuration
          </button>
        </div>
      )}

      {tab === "backup" && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Backup & Restore</h3>
          <div style={styles.backupGrid}>
            <div style={styles.backupCard}>
              <div style={styles.backupIcon}>💾</div>
              <div style={styles.backupTitle}>Create Backup</div>
              <p style={styles.backupDesc}>Create a full system backup including all data</p>
              <button style={styles.backupBtn}>Create Backup Now</button>
            </div>
            <div style={styles.backupCard}>
              <div style={styles.backupIcon}>📂</div>
              <div style={styles.backupTitle}>Last Backup</div>
              <p style={styles.backupDesc}>2024-01-14 at 02:30 AM</p>
              <button style={styles.backupBtn}>Download Backup</button>
            </div>
            <div style={styles.backupCard}>
              <div style={styles.backupIcon}>↩️</div>
              <div style={styles.backupTitle}>Restore from Backup</div>
              <p style={styles.backupDesc}>Restore system from a previous backup file</p>
              <button style={styles.backupBtn}>Choose File</button>
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
  section: { background: "#fff", borderRadius: "12px", padding: 28, boxShadow: "0 2px 10px rgba(0,0,0,0.05)", marginBottom: 24 },
  sectionTitle: { margin: "0 0 20px 0", fontSize: 16, fontWeight: 800, color: "#17212b" },
  settingGroup: { display: "flex", flexDirection: "column", gap: 16, marginBottom: 20 },
  label: { display: "flex", flexDirection: "column", gap: 6, fontWeight: 700, fontSize: 13, color: "#17212b" },
  input: { padding: "10px 12px", border: "1px solid #d0d8e3", borderRadius: "8px", fontSize: 13, fontFamily: "inherit", width: "100%", maxWidth: 300, boxSizing: "border-box" },
  checkboxLabel: { display: "flex", alignItems: "center", gap: 8, fontWeight: 600, fontSize: 13, color: "#17212b", cursor: "pointer" },
  saveBtn: { padding: "12px 20px", background: "#5d6bff", color: "#fff", border: "none", borderRadius: "10px", fontWeight: 700, cursor: "pointer", fontSize: 13, alignSelf: "flex-start" },
  backupGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 },
  backupCard: { background: "#f8f9fa", borderRadius: "10px", padding: 20, textAlign: "center", borderLeft: "4px solid #5d6bff" },
  backupIcon: { fontSize: 32, marginBottom: 8 },
  backupTitle: { fontWeight: 800, fontSize: 14, color: "#17212b", marginBottom: 6 },
  backupDesc: { fontSize: 12, color: "#6b7684", marginBottom: 12 },
  backupBtn: { padding: "10px 16px", background: "#5d6bff", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer", fontSize: 12 },
};

export default SystemSettings;
