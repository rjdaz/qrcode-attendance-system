import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  QrCode,
  Users,
  Calendar,
  BarChart3,
  Clock,
  LogOut,
  Plus,
  Search,
  Filter,
  Building2,
  GraduationCap,
} from "lucide-react";
import {
  fetchClasses,
  getClassAdviserDetails,
  fetchStudentsInSection,
} from "../../database/teachers/teacher_database";
import { fetchStudents } from "../../database/students/studentsDatabase";
import { getAllSubjectData } from "../../database/subjects/subjects";
import { getAllattendanceTable } from "../../database/attendance/attendances";

const Dashboard = ({
  apiUrl,
  setLoginStatus,
  user,
  setUser,
  setSectionId,
  getSubjectId,
  sectionId,
  setGetSubjectId,
  fixDate,
  fixTime,
  fixDay,
}) => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [classAdviser, SetClassAdviser] = useState([]);
  const [students, setStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [allSubjectData, setAllSubjectData] = useState([]);
  const [allAttendance, setAllAttendance] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // get the current date
  const date = fixDate;
  const time = fixTime;
  const day = fixDay;

  console.log("Classes: ", classes);
  console.log(user.name);
  console.log(user.employeeNo);
  console.log(user.sectionId);
  console.log(classAdviser);
  console.log("Students: ", students);
  console.log(getSubjectId);
  console.log(allSubjectData);
  console.log("All Student: ", allStudents);
  console.log("All Attendance: ", allAttendance);
  console.log(date);

  //get the todays classes
  useEffect(() => {
    fetchClasses(apiUrl, user.userId, setClasses);
    getClassAdviserDetails(apiUrl, user.userId, SetClassAdviser);
    fetchStudentsInSection(apiUrl, user.sectionId, setStudents);
    getAllSubjectData(apiUrl, setAllSubjectData);
    fetchStudents(apiUrl, setAllStudents);
    getAllattendanceTable(apiUrl, setAllAttendance);
  }, [user]);

  //handle to logout
  const handleLogout = () => {
    setLoginStatus(false);
    setUser({
      name: "",
      employeeNo: "",
      sectionId: "",
      department: "",
      role: "",
      userId: "",
    });
    localStorage.clear();
    navigate("/login");
  };

  //check time of AM or PM
  const ampm = (time) => {
    return time >= "12:00" ? "PM" : "AM";
  };

  // filter on search bar
  const filterData =
    searchTerm.length < 2
      ? classes
      : classes.filter((item) =>
          item.subject_name.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="w-full px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  QR Attendance System
                </h1>
                <p className="text-slate-600">
                  Welcome back,{" "}
                  <span className="font-semibold text-blue-600">
                    {user.name}
                  </span>
                  !
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-6 lg:px-8 py-8">
        {/* Today's Summary */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center">
              <Calendar className="h-8 w-8 text-blue-600 mr-3" />
              Today's Summary
            </h2>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-slate-500 pl-5">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <button
                onClick={() => {
                  navigate(`/scanner/${classAdviser.section_id}`);
                  // setSectionId(classAdviser.section_id);
                }}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
              >
                <QrCode className="h-4 w-4 mr-2" />
                Start Scanning
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                  <Calendar className="h-7 w-7 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">
                    Classes Today
                  </p>
                  <p className="text-3xl font-bold text-slate-900">
                    {classes.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">
                    Total Students
                  </p>
                  <p className="text-3xl font-bold text-slate-900">
                    {students.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">
                    Present Today
                  </p>
                  <p className="text-3xl font-bold text-emerald-600">
                    {
                      allAttendance.filter(
                        (a) => a.section_id === sectionId && a.date === date
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg">
                  <Clock className="h-7 w-7 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">
                    Absent Today
                  </p>
                  <p className="text-3xl font-bold text-red-600">
                    {students.length -
                      allAttendance.filter(
                        (a) => a.section_id === sectionId && a.date === date
                      ).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg">
                  <BarChart3 className="h-7 w-7 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">
                    Avg. Attendance
                  </p>
                  <p className="text-3xl font-bold text-indigo-600">
                    {students.length > 0
                      ? (
                          (allAttendance.filter(
                            (a) => a.section_id === sectionId && a.date === date
                          ).length /
                            students.length) *
                          100
                        ).toFixed(2)
                      : 0}
                    %
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Classes Section */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div className="flex items-center mb-4 sm:mb-0">
              <GraduationCap className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-slate-900">My Classes</h2>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search classes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 w-full sm:w-64"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filterData.map((cls) => (
              <div
                key={cls.subject_id}
                className="bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <h3 className="text-xl text-center font-bold text-slate-900 mb-2">
                        {cls.subject_name}
                      </h3>
                      <p className="text-blue-600 text-center font-semibold text-lg">
                        {cls.subject_code}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full border `}
                    >
                      {(
                        (allAttendance.filter((a) => {
                          return (
                            a.section_id === cls.section_id && a.date === date
                          );
                        }).length /
                          allStudents.filter((s) => {
                            return s.section === cls.section_id;
                          }).length) *
                        100
                      ).toFixed(2)}
                      %
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-slate-600">
                      <Calendar className="h-4 w-4 mr-3 text-blue-500" />
                      <span className="font-medium">
                        {cls.days +
                          " " +
                          cls.start_time.slice(0, -3) +
                          " - " +
                          cls.end_time.slice(0, -3) +
                          " " +
                          ampm(cls.start_time)}
                      </span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Users className="h-4 w-4 mr-3 text-blue-500" />
                      <span className="font-medium">
                        {
                          allStudents.filter((s) => {
                            return s.section === cls.section_id;
                          }).length
                        }{" "}
                        students •{" "}
                        {
                          allAttendance.filter((a) => {
                            return (
                              a.section_id === cls.section_id && a.date === date
                            );
                          }).length
                        }{" "}
                        present today
                      </span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Clock className="h-4 w-4 mr-3 text-blue-500" />
                      <span className="font-medium">{cls.room_name}</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        navigate(`/attendance/${cls.subject_id}`);
                        setGetSubjectId(cls.subject_id);
                      }}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border border-slate-200"
                    >
                      View Attendance
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {classes.length === 0 && (
            <div className="text-center py-16">
              <Users className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No classes found
              </h3>
              <p className="text-slate-600">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
