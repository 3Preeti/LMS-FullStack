import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProtectedRoute from "./auth/ProtectedRoute";

import AdminDashboard from "./admin/AdminDashboard";
import ManageFaculty from "./admin/ManageFaculty";
import ManageStudents from "./admin/ManageStudents";
import AssignRoles from "./admin/AssignRoles";
import SystemControl from "./admin/SystemControl";
import Reports from "./admin/Reports";
import SystemSettings from "./admin/SystemSettings";
import AuditLogs from "./admin/AuditLogs";
import FacultyDashboard from "./faculty/FacultyDashboard";
import CreateCourses from "./faculty/CreateCourses";
import ManageCourseContent from "./faculty/ManageCourseContent";
import ApproveRequests from "./faculty/ApproveRequests";
import ViewEnrolledStudents from "./faculty/ViewEnrolledStudents";
import StudentDashboard from "./student/StudentDashboard";
import ViewData from "./student/ViewData";
import ViewCourses from "./student/ViewCourses";
import EnrollCourses from "./student/EnrollCourses";
import SubmitRequests from "./student/SubmitRequests";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student only */}
        <Route element={<ProtectedRoute allowedRoles={["STUDENT"]} />}>
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/data" element={<ViewData />} />
          <Route path="/student/courses" element={<ViewCourses />} />
          <Route path="/student/enroll" element={<EnrollCourses />} />
          <Route path="/student/requests" element={<SubmitRequests />} />
        </Route>

        {/* Faculty only */}
        <Route element={<ProtectedRoute allowedRoles={["FACULTY"]} />}>
          <Route path="/faculty" element={<FacultyDashboard />} />
          <Route path="/faculty/create-courses" element={<CreateCourses />} />
          <Route path="/faculty/manage-content" element={<ManageCourseContent />} />
          <Route path="/faculty/approve-requests" element={<ApproveRequests />} />
          <Route path="/faculty/view-students" element={<ViewEnrolledStudents />} />
        </Route>

        {/* Admin only */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/faculty" element={<ManageFaculty />} />
          <Route path="/admin/students" element={<ManageStudents />} />
          <Route path="/admin/roles" element={<AssignRoles />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/settings" element={<SystemSettings />} />
          <Route path="/admin/logs" element={<AuditLogs />} />
          <Route path="/admin/system-control" element={<SystemControl />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;



