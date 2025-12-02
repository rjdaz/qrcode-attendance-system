import {
  LayoutDashboard,
  Users,
  UserPlus,
  UserCheck,
  ClipboardList,
  BookOpen,
  CheckCircle,
  XCircle,
  AlertCircle,
  Bell,
  RefreshCw,
  FileText,
  Mail,
  Shield,
  ChevronRight,
  MoreHorizontal,
  Search,
  Download,
  LogOut,
  X,
  Edit,
  UserX,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import {AllgradeLevel} from '../../database/gradeLevel/gradeLevel.js';
import {AllSection} from '../../database/section/section.js';
import {getAllTeacherData} from '../../database/teachers/teacher_database.js'
import {getAllSubjectData} from '../../database/subjects/subjects.js'

const AdminLayout = ({ apiUrl, setLoginStatus, setName }) => {
  // Simple beginner-friendly state and data
  const [searchText, setSearchText] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("student"); // "student" | "teacher"
  const [selectedManagement, setSelectedManagement] = useState("student"); // "student" | "teacher" | "class" | "attendance" | "notifications" | "staff"
  // const apiUrl =
  //   "http://localhost/qrcode-attendance-system/server/connection/api.php";
  const [studentForm, setStudentForm] = useState({
    roll_number: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    address: "",
    enrollment_date: "",
    grade_level: "",
    section: "",
    organization_id: "",
  });
  const [studentSaving, setStudentSaving] = useState(false);
  const [studentError, setStudentError] = useState("");
  const [studentStats, setStudentStats] = useState({
    active: 0,
    inactive: 0,
    withAttendanceIssues: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editForm, setEditForm] = useState({
    student_id: "",
    roll_number: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    address: "",
    enrollment_date: "",
    status: "",
    grade_level: "",
    section: "",
    organization_id: "",
  });
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    section: "",
    guardian: "",
    subject: "",
    phone: "",
  });
  const [notifications, setNotifications] = useState([]);
  const [notifLoading, setNotifLoading] = useState(false);
  const [getAllgradeLevel, setGetAllgradeLevel] = useState([]);
  const [getAllSection, setGetAllSection] = useState([]);
  const [getAllTeacher, setGetAllTeacher] = useState([]);
  const [allSubjectData, setAllSubjectData] = useState([]);

  console.log(getAllTeacher);

  // Fetch students from database
  const fetchStudents = async () => {
    try {
      setStudentsLoading(true);
      const response = await axios.get(`${apiUrl}getStudents`);
      const data = response.data;
      if (data.success) {
        setStudents(data.data);
      } else {
        console.error("Failed to fetch students:", data.message);
        setStudents([]);
      }
    } catch (err) {
      console.error("Error fetching students:", err);
      setStudents([]);
    } finally {
      setStudentsLoading(false);
    }
  };

  // Fetch student statistics from database
  const fetchStudentStats = async () => {
    try {
      setStatsLoading(true);
      const response = await axios.get(`${apiUrl}getStudentStats`);
      const data = response.data;
      if (data.success) {
        setStudentStats(data.data);
      } else {
        console.error("Failed to fetch student stats:", data.message);
      }
    } catch (err) {
      console.error("Error fetching student stats:", err);
    } finally {
      setStatsLoading(false);
    }
  };

  // handle management selection
  const handleManagementSelect = (type) => {
    setSelectedManagement(type);
    setSearchText("");
  };

  // Load student data on component mount
  useEffect(() => {
    fetchStudentStats();
    fetchStudents();
    AllgradeLevel(apiUrl,setGetAllgradeLevel);
    AllSection(apiUrl, setGetAllSection);
    getAllTeacherData(apiUrl, setGetAllTeacher);
    getAllSubjectData(apiUrl, setAllSubjectData);
  }, []);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setNotifLoading(true);
      const res = await axios.get(`${apiUrl}getNotifications`);
      if (res.data?.success) {
        setNotifications(res.data.data || []);
      } else {
        setNotifications([]);
      }
    } catch (e) {
      setNotifications([]);
    } finally {
      setNotifLoading(false);
    }
  };

  useEffect(() => {
    if (selectedManagement === "notification") {
      fetchNotifications();
    }
  }, [selectedManagement]);

  // Filter students by search text (checks name and section)
  const filteredStudents = students.filter((s) => {
    const text = searchText.toLowerCase();
    return (
      s.name.toLowerCase().includes(text) ||
      s.section_display.toLowerCase().includes(text)
    );
  });

  // Simple click handlers
  const handleExportReports = () => {
    alert("Reports export started (mock only).");
  };

  const handleGenerateReports = () => {
    alert("Generating attendance reports (mock only).");
  };

  const handleLogout = () => {
    setLoginStatus(false);
    setName("");
    navigate("/login");
  };

  const openForm = (type) => {
    setFormType(type);
    setFormData({
      name: "",
      section: "",
      guardian: "",
      subject: "",
      phone: "",
    });
    setStudentForm({
      roll_number: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      email: "",
      phone_number: "",
      date_of_birth: "",
      gender: "",
      address: "",
      enrollment_date: "",
      grade_level: "",
      section: "",
      organization_id: "",
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(
      `${
        formType === "student" ? "Student" : "Teacher"
      } application submitted (mock):\n` + JSON.stringify(formData, null, 2)
    );
    setShowForm(false);
  };

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const openEditForm = (student) => {
    setEditingStudent(student);
    setEditForm({
      student_id: student.student_id,
      roll_number: student.roll_number || "",
      first_name: student.first_name || "",
      last_name: student.last_name || "",
      middle_name: student.middle_name || "",
      email: student.email || "",
      phone_number: student.phone_number || "",
      date_of_birth: student.date_of_birth || "",
      gender: student.gender || "",
      address: student.address || "",
      enrollment_date: student.enrollment_date || "",
      status: student.status || "",
      grade_level: student.grade_level || "",
      section: student.section || "",
      organization_id: student.organization_id || "",
    });
    setEditError("");
    setShowEditForm(true);
  };

  const closeEditForm = () => {
    setShowEditForm(false);
    setEditingStudent(null);
    setEditForm({
      student_id: "",
      roll_number: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      email: "",
      phone_number: "",
      date_of_birth: "",
      gender: "",
      address: "",
      enrollment_date: "",
      status: "",
      grade_level: "",
      section: "",
      organization_id: "",
    });
  };

  const submitStudent = async (e) => {
    e.preventDefault();
    setStudentError("");
    setStudentSaving(true);
    try {
      const response = await axios.post(`${apiUrl}registerStudent`, {
        ...studentForm,
        grade_level: studentForm.grade_level
          ? parseInt(studentForm.grade_level)
          : null,
        section: studentForm.section ? parseInt(studentForm.section) : null,
        organization_id: studentForm.organization_id
          ? parseInt(studentForm.organization_id)
          : null,
      });
      const data = response.data;
      if (data.success) {
        alert("Student registered successfully.");
        setShowForm(false);
        fetchStudents(); // Refresh the student list
        fetchStudentStats(); // Refresh the statistics
      } else {
        setStudentError(data.message || "Failed to register student");
      }
    } catch (err) {
      setStudentError(
        err.response?.data?.message || err.message || "Network error"
      );
    } finally {
      setStudentSaving(false);
    }
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    setEditError("");
    setEditSaving(true);
    try {
      const response = await axios.post(`${apiUrl}updateStudent`, {
        ...editForm,
        grade_level: editForm.grade_level
          ? parseInt(editForm.grade_level)
          : null,
        section: editForm.section ? parseInt(editForm.section) : null,
        organization_id: editForm.organization_id
          ? parseInt(editForm.organization_id)
          : null,
      });
      const data = response.data;
      if (data.success) {
        alert("Student updated successfully.");
        setShowEditForm(false);
        fetchStudents(); // Refresh the student list
        fetchStudentStats(); // Refresh the statistics
      } else {
        setEditError(data.message || "Failed to update student");
      }
    } catch (err) {
      setEditError(
        err.response?.data?.message || err.message || "Network error"
      );
    } finally {
      setEditSaving(false);
    }
  };

  console.log(getAllSection);
  console.log(students);
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Top Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="w-full px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-lg">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Admin Dashboard
                </h1>
                <p className="text-slate-600">
                  Manage students, teachers, classes, attendance, and
                  notifications
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 w-72"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <button
                onClick={handleExportReports}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Download className="h-4 w-4" />
                <span>Export Reports</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside
            className={`${
              sidebarCollapsed ? "w-16" : "w-80"
            } transition-all duration-300 ease-in-out flex-shrink-0`}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                {!sidebarCollapsed && (
                  <div className="flex items-center space-x-2">
                    <LayoutDashboard className="h-5 w-5 text-indigo-600" />
                    <span className="text-sm font-semibold text-slate-900">
                      Navigation
                    </span>
                  </div>
                )}
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  {sidebarCollapsed ? (
                    <ChevronRight className="h-4 w-4 text-slate-600" />
                  ) : (
                    <ChevronLeft className="h-4 w-4 text-slate-600" />
                  )}
                </button>
              </div>
              <nav className="space-y-1">
                <button
                  onClick={() => handleManagementSelect("student")}
                  className={`flex items-center w-full ${
                    sidebarCollapsed
                      ? "justify-center px-2"
                      : "justify-between px-3"
                  } py-2 rounded-xl hover:bg-slate-50 transition-colors group ${
                    selectedManagement === "student" ? "bg-slate-200" : ""
                  }`}
                >
                  <span
                    className={`flex items-center ${
                      sidebarCollapsed ? "" : "space-x-2"
                    } text-slate-700 group-hover:text-slate-900`}
                  >
                    <Users className="h-4 w-4 text-indigo-600" />
                    {!sidebarCollapsed && <span>Student Management</span>}
                  </span>
                  {!sidebarCollapsed && (
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  )}
                </button>
                <button
                  onClick={() => handleManagementSelect("teacher")}
                  className={`flex items-center w-full ${
                    sidebarCollapsed
                      ? "justify-center px-2"
                      : "justify-between px-3"
                  } py-2 rounded-xl hover:bg-slate-50 transition-colors group ${
                    selectedManagement === "teacher" ? "bg-slate-200" : ""
                  }`}
                >
                  <span
                    className={`flex items-center ${
                      sidebarCollapsed ? "" : "space-x-2"
                    } text-slate-700 group-hover:text-slate-900`}
                  >
                    <UserPlus className="h-4 w-4 text-indigo-600" />
                    {!sidebarCollapsed && <span>Teacher Management</span>}
                  </span>
                  {!sidebarCollapsed && (
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  )}
                </button>
                <button
                  onClick={() => handleManagementSelect("class")}
                  className={`flex items-center w-full ${
                    sidebarCollapsed
                      ? "justify-center px-2"
                      : "justify-between px-3"
                  } py-2 rounded-xl hover:bg-slate-50 transition-colors group ${
                    selectedManagement === "class" ? "bg-slate-200" : ""
                  }`}
                >
                  <span
                    className={`flex items-center w-full ${
                      sidebarCollapsed ? "" : "space-x-2"
                    } text-slate-700 group-hover:text-slate-900`}
                  >
                    <BookOpen className="h-4 w-4 text-indigo-600" />
                    {!sidebarCollapsed && <span>Class Management</span>}
                  </span>
                  {!sidebarCollapsed && (
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  )}
                </button>
                <button
                  onClick={() => handleManagementSelect("attendance")}
                  className={`flex items-center w-full ${
                    sidebarCollapsed
                      ? "justify-center px-2"
                      : "justify-between px-3"
                  } py-2 rounded-xl hover:bg-slate-50 transition-colors group ${
                    selectedManagement === "attendance" ? "bg-slate-200" : ""
                  }`}
                >
                  <span
                    className={`flex items-center ${
                      sidebarCollapsed ? "" : "space-x-2"
                    } text-slate-700 group-hover:text-slate-900`}
                  >
                    <ClipboardList className="h-4 w-4 text-indigo-600" />
                    {!sidebarCollapsed && <span>Attendance Monitoring</span>}
                  </span>
                  {!sidebarCollapsed && (
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  )}
                </button>
                <button
                  onClick={() => handleManagementSelect("notification")}
                  className={`flex items-center w-full ${
                    sidebarCollapsed
                      ? "justify-center px-2"
                      : "justify-between px-3"
                  } py-2 rounded-xl hover:bg-slate-50 transition-colors group ${
                    selectedManagement === "notification" ? "bg-slate-200" : ""
                  }`}
                >
                  <span
                    className={`flex items-center ${
                      sidebarCollapsed ? "" : "space-x-2"
                    } text-slate-700 group-hover:text-slate-900`}
                  >
                    <Bell className="h-4 w-4 text-indigo-600" />
                    {!sidebarCollapsed && <span>Parent Notification Logs</span>}
                  </span>
                  {!sidebarCollapsed && (
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  )}
                </button>
                <button
                  onClick={() => handleManagementSelect("staff")}
                  className={`flex items-center w-full ${
                    sidebarCollapsed
                      ? "justify-center px-2"
                      : "justify-between px-3"
                  } py-2 rounded-xl hover:bg-slate-50 transition-colors group ${
                    selectedManagement === "staff" ? "bg-slate-200" : ""
                  }`}
                >
                  <span
                    className={`flex items-center ${
                      sidebarCollapsed ? "" : "space-x-2"
                    } text-slate-700 group-hover:text-slate-900`}
                  >
                    <Shield className="h-4 w-4 text-indigo-600" />
                    {!sidebarCollapsed && <span>Staff Management</span>}
                  </span>
                  {!sidebarCollapsed && (
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  )}
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Total Students</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {statsLoading
                        ? "Loading..."
                        : (
                            studentStats.active + studentStats.inactive
                          ).toLocaleString()}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-indigo-600" />
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">
                      Teachers Pending Approval
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                    {
                      getAllTeacher.filter((t) => t.status === 'inactive').length
                    }
                    </p>
                  </div>
                  <UserPlus className="h-8 w-8 text-amber-600" />
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Active Classes</p>
                    <p className="text-2xl font-bold text-slate-900">42</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-emerald-600" />
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">SMS Alerts Today</p>
                    <p className="text-2xl font-bold text-slate-900">312</p>
                  </div>
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Student Management */}
            <section
              className={`bg-white rounded-2xl shadow-lg border border-slate-200 ${
                selectedManagement === "student" ? "block" : "hidden"
              } `}
            >
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-slate-900">
                    Student Management
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openForm("student")}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl text-sm font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all shadow"
                  >
                    Register New Student
                  </button>
                  <button
                    onClick={() => {
                      fetchStudentStats();
                      fetchStudents();
                    }}
                    className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <p className="text-sm text-slate-600">Active</p>
                    <p className="text-xl font-bold text-slate-900">
                      {statsLoading
                        ? "Loading..."
                        : studentStats.active.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <p className="text-sm text-slate-600">Inactive</p>
                    <p className="text-xl font-bold text-slate-900">
                      {statsLoading
                        ? "Loading..."
                        : studentStats.inactive.toLocaleString()}
                    </p>
                  </div>
                  {/* <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <p className="text-sm text-slate-600">
                      With Attendance Issues
                    </p>
                    <p className="text-xl font-bold text-slate-900">
                      {statsLoading
                        ? "Loading..."
                        : studentStats.withAttendanceIssues.toLocaleString()}
                    </p>
                  </div> */}
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Student
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Section
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Guardian
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {studentsLoading ? (
                        <tr>
                          <td
                            className="px-6 py-4 text-sm text-slate-600"
                            colSpan="5"
                          >
                            Loading students...
                          </td>
                        </tr>
                      ) : filteredStudents.length === 0 ? (
                        <tr>
                          <td
                            className="px-6 py-4 text-sm text-slate-600"
                            colSpan="5"
                          >
                            No students found.
                          </td>
                        </tr>
                      ) : (
                        filteredStudents.map((s) => (
                          <tr key={s.name} className="hover:bg-slate-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                              {s.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                              {s.section_display}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                              {s.guardian}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {s.status === "active" ? (
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border text-emerald-600 bg-emerald-50 border-emerald-200">
                                  <CheckCircle className="h-4 w-4" />
                                  <span className="ml-1">Active</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border text-rose-700 bg-rose-50 border-rose-200">
                                  <XCircle className="h-4 w-4" />
                                  <span className="ml-1">Disabled</span>
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                              <div className="flex items-center space-x-2 pl-3">
                                <button
                                  onClick={() => openEditForm(s)}
                                  className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                                  title="Edit Student"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-sm text-slate-600">
                  View attendance logs per student.
                </div>
              </div>
            </section>

            {/* Teacher Management */}
            <section
              className={`bg-white rounded-2xl shadow-lg border border-slate-200 ${
                selectedManagement === "teacher" ? "block" : "hidden"
              }`}
            >
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <UserPlus className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-slate-900">
                    Teacher Management (Approval Flow)
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openForm("teacher")}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl text-sm font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all shadow"
                  >
                    Request New Teacher
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Teacher
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Subject
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {
                        getAllTeacher.map((t) => {

                          const selectedSubjByTeacher = allSubjectData.filter((s) => s.teacher_id === t.users_id)

                          return (
                            <tr
                            key={t.users_id}
                            className="hover:bg-slate-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                                {t.last_name}, {t.first_name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600"
                              title={selectedSubjByTeacher.map((s) => s.subject_name).join('\n')}
                              >
                                {
                                  selectedSubjByTeacher.map((s) => s.subject_name).join(', ')
                                }
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border text-amber-700 ${t.status === 'active' ? 'text-green-700 bg-green-50 border-green-200' :' text-amber-700 bg-amber-50 border-amber-200'}`}>
                                  <AlertCircle className="h-4 w-4" />
                                  <span className="ml-1">
                                    {t.status}
                                  </span>
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                <button className="text-slate-400 hover:text-slate-600">
                                  <MoreHorizontal className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-sm text-slate-600">
                  Requests and deactivations are subject to Super Admin
                  approval.
                </div>
              </div>
            </section>

            {/* Class Management */}
            <section
              className={`bg-white rounded-2xl shadow-lg border border-slate-200 ${
                selectedManagement === "class" ? "block" : "hidden"
              }`}
            >
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-slate-900">
                    Class Management
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl text-sm font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all shadow">
                    Generate Class List
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <p className="text-sm text-slate-600">
                      Assign Students to Classes
                    </p>
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100">
                        Assign
                      </button>
                      <button className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100">
                        Bulk Assign
                      </button>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <p className="text-sm text-slate-600">
                      Assign Teachers to Classes (Requires Approval)
                    </p>
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100">
                        Request Assignment
                      </button>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Class
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Teacher
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Students
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {
                        getAllSection.map((s) => {

                          return (
                            <tr 
                            key={s.section_id}
                            className="hover:bg-slate-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                                {
                                  s.section_role
                                }
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                {
                                  getAllTeacher.find((t) => t.users_id === s.adviser_teacher_id)?.last_name
                                }, {
                                  getAllTeacher.find((t) => t.users_id === s.adviser_teacher_id)?.first_name
                                }
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                {
                                  students.filter((st) => Number(st.section) === Number(s.section_id) && Number(st.grade_level) === Number(s.grade_level_id)).length
                                }
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                <button className="text-slate-400 hover:text-slate-600">
                                  <MoreHorizontal className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Attendance Monitoring */}
            <section
              className={`bg-white rounded-2xl shadow-lg border border-slate-200 ${
                selectedManagement === "attendance" ? "block" : "hidden"
              }`}
            >
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ClipboardList className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-slate-900">
                    Attendance Monitoring
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleGenerateReports}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl text-sm font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow"
                  >
                    Generate Reports
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <p className="text-sm text-slate-600">Present Today</p>
                    <p className="text-xl font-bold text-slate-900">1,094</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <p className="text-sm text-slate-600">Late</p>
                    <p className="text-xl font-bold text-slate-900">82</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <p className="text-sm text-slate-600">Absent</p>
                    <p className="text-xl font-bold text-slate-900">74</p>
                  </div>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Entity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      <tr className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                          Juan Dela Cruz
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          Student
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border text-emerald-600 bg-emerald-50 border-emerald-200">
                            <CheckCircle className="h-4 w-4" />
                            <span className="ml-1">Present</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          08:12 AM
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <p className="text-sm font-semibold text-slate-900">
                      Report Types
                    </p>
                    <ul className="mt-2 text-sm text-slate-600 list-disc list-inside space-y-1">
                      <li>Per Class</li>
                      <li>Per Student</li>
                      <li>Daily / Weekly / Monthly</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <p className="text-sm font-semibold text-slate-900">
                      Monitoring
                    </p>
                    <ul className="mt-2 text-sm text-slate-600 list-disc list-inside space-y-1">
                      <li>Late Records</li>
                      <li>Absent Records</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Parent Notification Logs */}
            <section
              className={`bg-white rounded-2xl shadow-lg border border-slate-200 ${
                selectedManagement === "notification" ? "block" : "hidden"
              }`}
            >
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-slate-900">
                    Parent Notification Logs
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={fetchNotifications} className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50">
                    <RefreshCw className="h-4 w-4" />
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl text-sm font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all shadow">
                    Re-send Failed SMS
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Parent
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Student
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Timestamp
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {notifLoading ? (
                        <tr>
                          <td className="px-6 py-4 text-sm text-slate-600" colSpan="5">Loading notifications...</td>
                        </tr>
                      ) : notifications.length === 0 ? (
                        <tr>
                          <td className="px-6 py-4 text-sm text-slate-600" colSpan="5">No notifications yet.</td>
                        </tr>
                      ) : (
                        notifications.map((n) => (
                          <tr key={n.notification_id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">{n.parents_number || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{n.student_name || `Student #${n.student_id}`}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {n.status === 'Successful' ? (
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border text-emerald-600 bg-emerald-50 border-emerald-200">
                                  <CheckCircle className="h-4 w-4" />
                                  <span className="ml-1">Successful</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border text-amber-700 bg-amber-50 border-amber-200">
                                  <AlertCircle className="h-4 w-4" />
                                  <span className="ml-1">Pending</span>
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{n.date} {n.time}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                              <button className="text-slate-400 hover:text-slate-600">
                                <MoreHorizontal className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Staff Management */}
            <section
              className={`bg-white rounded-2xl shadow-lg border border-slate-200 ${
                selectedManagement === "staff" ? "block" : "hidden"
              }`}
            >
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-slate-900">
                    Staff Management
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl text-sm font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all shadow">
                    Register Staff
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      <tr className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                          Pedro Reyes
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          Security
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border text-emerald-600 bg-emerald-50 border-emerald-200">
                            <CheckCircle className="h-4 w-4" />
                            <span className="ml-1">Active</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-sm text-slate-600">
                  View attendance logs of staff.
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {showForm && (
        <div
          onClick={closeForm}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl border border-slate-200"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">
                {formType === "student"
                  ? "Register New Student"
                  : "Request New Teacher"}
              </h3>
              <button
                onClick={closeForm}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {formType === "student" ? (
              <form onSubmit={submitStudent} className="px-6 py-5 space-y-4">
                {studentError && (
                  <div className="text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-xl p-3">
                    {studentError}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Roll Number
                    </label>
                    <input
                      name="roll_number"
                      value={studentForm.roll_number} 
                      onChange={handleStudentChange}
                      required
                      className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Enrollment Date
                    </label>
                    <input
                      type="date"
                      name="enrollment_date"
                      value={studentForm.enrollment_date}
                      onChange={handleStudentChange}
                      required
                      className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      First Name
                    </label>
                    <input
                      name="first_name"
                      value={studentForm.first_name}
                      onChange={handleStudentChange}
                      required
                      className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Last Name
                    </label>
                    <input
                      name="last_name"
                      value={studentForm.last_name}
                      onChange={handleStudentChange}
                      required
                      className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Middle Name
                    </label>
                    <input
                      name="middle_name"
                      value={studentForm.middle_name}
                      onChange={handleStudentChange}
                      className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={studentForm.email}
                      onChange={handleStudentChange}
                      className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Phone
                    </label>
                    <input
                      name="phone_number"
                      value={studentForm.phone_number}
                      onChange={handleStudentChange}
                      className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="date_of_birth"
                      value={studentForm.date_of_birth}
                      onChange={handleStudentChange}
                      className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={studentForm.gender}
                      onChange={handleStudentChange}
                      className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Address
                    </label>
                    <input
                      name="address"
                      value={studentForm.address}
                      onChange={handleStudentChange}
                      className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Grade Level
                    </label>
                    <select
                      name="grade_level"
                      value={studentForm.grade_level}
                      onChange={handleStudentChange}
                      required
                      className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Grade Level</option>
                      {
                      getAllgradeLevel.map((grade) => {
                        return (
                          <option value={grade.grade_level_id}>{grade.grade_name}</option>
                        )
                      })
                    }
                      </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Section
                    </label>
                    <select
                      name="section"
                      value={studentForm.section}
                      onChange={handleStudentChange}
                      required
                      className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    > 
                    <option value="">Select Section</option>
                    {
                      getAllSection.filter((section) => {
                          return Number(section.grade_level_id) === Number(studentForm.grade_level);
                      }).map((sec) => {
                          return (
                            <option value={sec.section_id}>{sec.section_name}</option>
                          )
                        })
                    }
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Organization ID (optional)
                    </label>
                    <input
                      type="number"
                      name="organization_id"
                      value={studentForm.organization_id}
                      onChange={handleStudentChange}
                      className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={studentSaving}
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl text-sm font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all shadow"
                  >
                    {studentSaving ? "Saving..." : "Submit"}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleFormSubmit} className="px-6 py-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    type="text"
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. Juan Dela Cruz"
                  />
                </div>

                {formType === "student" && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Section
                    </label>
                    <input
                      name="section"
                      value={formData.section}
                      onChange={handleInputChange}
                      required
                      type="text"
                      className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. Grade 10 - Ruby"
                    />
                  </div>
                )}

                {formType === "student" && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Guardian Contact
                    </label>
                    <input
                      name="guardian"
                      value={formData.guardian}
                      onChange={handleInputChange}
                      type="text"
                      className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. 09171234567"
                    />
                  </div>
                )}

                {formType === "teacher" && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Subject
                    </label>
                    <input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      type="text"
                      className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. Mathematics"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    type="text"
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. 09181234567"
                  />
                </div>

                <div className="flex items-center justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl text-sm font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all shadow"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEditForm && (
        <div
          onClick={closeEditForm}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl border border-slate-200"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">
                Edit Student Information
              </h3>
              <button
                onClick={closeEditForm}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={submitEdit} className="px-6 py-5 space-y-4">
              {editError && (
                <div className="text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-xl p-3">
                  {editError}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Roll Number
                  </label>
                  <input
                    name="roll_number"
                    value={editForm.roll_number}
                    onChange={handleEditChange}
                    required
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Enrollment Date
                  </label>
                  <input
                    type="date"
                    name="enrollment_date"
                    value={editForm.enrollment_date}
                    onChange={handleEditChange}
                    required
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    First Name
                  </label>
                  <input
                    name="first_name"
                    value={editForm.first_name}
                    onChange={handleEditChange}
                    required
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Last Name
                  </label>
                  <input
                    name="last_name"
                    value={editForm.last_name}
                    onChange={handleEditChange}
                    required
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Middle Name
                  </label>
                  <input
                    name="middle_name"
                    value={editForm.middle_name}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Phone
                  </label>
                  <input
                    name="phone_number"
                    value={editForm.phone_number}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={editForm.date_of_birth}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={editForm.gender}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={editForm.status}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="graduated">Graduated</option>
                    <option value="dropped">Dropped</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Address
                  </label>
                  <input
                    name="address"
                    value={editForm.address}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Grade Level ID
                  </label>
                  <input
                    type="number"
                    name="grade_level"
                    value={editForm.grade_level}
                    onChange={handleEditChange}
                    required
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Section ID
                  </label>
                  <input
                    type="number"
                    name="section"
                    value={editForm.section}
                    onChange={handleEditChange}
                    required
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Organization ID (optional)
                  </label>
                  <input
                    type="number"
                    name="organization_id"
                    value={editForm.organization_id}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={closeEditForm}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  disabled={editSaving}
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl text-sm font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all shadow"
                >
                  {editSaving ? "Updating..." : "Update Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
