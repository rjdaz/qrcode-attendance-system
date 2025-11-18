import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Filter,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  CloudCog,
} from "lucide-react";
import { getAllStudentsBySubjects } from "../../database/subjects/subjects";
import {
  innerJoinAttAndStdntsData,
  addAttendancePerSubject,
  fetchAttendancesPerSubject,
  fetchAllAttendancePerSubjectByTeacher,
} from "../../database/attendance/attendances";
import { fetchClasses } from "../../database/teachers/teacher_database";

const ViewDetailsReportsPerSubject = ({
  user,
  apiUrl,
  getSubjectId,
  setGetSubjectId,
  fixDate,
  fixTime,
  getDatePrevSubject,
  setGetDatePrevSubject,
}) => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [allAttendances, setAllAttendances] = useState([]);
  const [allStudentsBySubjects, setAllStudentsBySubjects] = useState([]);
  const [subjectAttendances, setSubjectAttendances] = useState([]);
  const [
    allAttendancesPerSubjectbyTeacher,
    setAllAttendancesPerSubjectByTeacher,
  ] = useState([]);
  const [seacrhData, setSearchData] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const date = fixDate;
  const time = fixTime;
  const getSubjDate = getDatePrevSubject;

  // Derive section_id from classes using the current subject id
  const sectionIdFromClasses = useMemo(() => {
    if (!classes || !classes.length || !getSubjectId) return undefined;
    const subjectIdNum = Number(getSubjectId);
    const match = classes.find(
      (cls) => Number(cls.subject_id) === subjectIdNum
    );
    return match?.section_id;
  }, [classes, getSubjectId]);

  useEffect(() => {
    // Debugging
    console.log(
      "useEffect run: sectionIdFromClasses=",
      sectionIdFromClasses,
      "getSubjDate=",
      getSubjDate
    );

    fetchClasses(apiUrl, user.userId, setClasses);
    if (getSubjectId) {
      getAllStudentsBySubjects(apiUrl, getSubjectId, setAllStudentsBySubjects);
      fetchAttendancesPerSubject(apiUrl, setSubjectAttendances, date);
      fetchAllAttendancePerSubjectByTeacher(
        apiUrl,
        setAllAttendancesPerSubjectByTeacher,
        user?.userId
      );
    }

    // ONLY call inner join when we have both section id and a date
    if (sectionIdFromClasses && getSubjDate) {
      innerJoinAttAndStdntsData(
        apiUrl,
        setAllAttendances,
        sectionIdFromClasses,
        getSubjDate
      );
    }
  }, [
    apiUrl,
    getSubjectId,
    sectionIdFromClasses,
    getSubjDate,
    user?.userId,
    date,
  ]);

  // formattedTime
  const formattedTime = (time) => {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // filter students list allStudentsBySubjects
  const filterStudentsList = useMemo(() => {
    if (seacrhData && seacrhData.length >= 2) {
      return allStudentsBySubjects.filter(
        (s) =>
          s.first_name.toLowerCase().includes(seacrhData.toLowerCase()) ||
          s.last_name.toLowerCase().includes(seacrhData.toLowerCase()) ||
          s.roll_number.toLowerCase().includes(seacrhData.toLowerCase()) ||
          s.email.toLowerCase().includes(seacrhData.toLowerCase())
      );
    }
    return allStudentsBySubjects;
  }, [seacrhData, allStudentsBySubjects]);

  // filter status of the students
  const statusFilteredStudentIds = useMemo(() => {
    if (selectedStatus === "all") {
      return null; // No status filtering
    }

    if (selectedStatus === "Present" || selectedStatus === "Late") {
      return new Set(
        subjectAttendances
          .filter(
            (att) => att.status === selectedStatus && att.date === getSubjDate
          )
          .map((att) => att.student_id)
      );
    } else if (selectedStatus === "Absent") {
      // Students with null/no status in allAttendances
      return new Set(
        allStudentsBySubjects
          .filter(
            (student) =>
              !subjectAttendances.find(
                (att) =>
                  att.student_id === student.student_id &&
                  att.status !== null &&
                  att.date === getSubjDate
              )
          )
          .map((s) => s.student_id)
      );
    }

    return null;
  }, [subjectAttendances, allStudentsBySubjects, selectedStatus]);

  //Combine both filters
  const finalFilteredStudents = useMemo(() => {
    let result = filterStudentsList;

    if (statusFilteredStudentIds) {
      result = result.filter((student) =>
        statusFilteredStudentIds.has(student.student_id)
      );
    }

    return result;
  }, [filterStudentsList, statusFilteredStudentIds]);

  // download data base on the final filtered of students
  const handleToDownLoadSelectedData = () => {
    if (!finalFilteredStudents || finalFilteredStudents.length === 0) {
      alert("No data to download");
      return;
    }

    // Prepare CSV headers
    const headers = [
      "Student ID",
      "First Name",
      "Last Name",
      "Gender",
      "Email",
      "Status",
      "Time Scanned",
    ];

    // Prepare CSV rows
    const rows = finalFilteredStudents.map((student) => {
      const attendance = subjectAttendances.find(
        (att) =>
          att.student_id === student.student_id && att.date === getSubjDate
      );

      return [
        student.roll_number,
        student.first_name,
        student.last_name,
        student.gender.charAt(0).toUpperCase() + student.gender.slice(1),
        student.email,
        attendance?.status || "Absent",
        attendance?.time ? formattedTime(attendance.time) : "--:--",
      ];
    });

    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `attendance_${getSubjDate || "report"}.csv`);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  console.log(date, time);
  console.log(getSubjectId);
  console.log(classes);
  console.log(subjectAttendances);
  console.log(getDatePrevSubject);
  console.log(allAttendancesPerSubjectbyTeacher);
  console.log(allStudentsBySubjects);
  console.log(sectionIdFromClasses);
  console.log(finalFilteredStudents);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="w-full px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  navigate("/history/");
                  setGetDatePrevSubject("");
                }}
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-3 py-2 rounded-lg transition-all duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </button>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900">
                Attendance -{" "}
                {
                  allAttendancesPerSubjectbyTeacher.find(
                    (s) => Number(s.subject_id) === Number(getSubjectId)
                  )?.subject_name
                }
              </h1>
              <p className="text-slate-600">
                {allStudentsBySubjects.length} students •{" "}
                {
                  subjectAttendances.filter(
                    (s) =>
                      Number(s.subject_id) === Number(getSubjectId) &&
                      s.date === getSubjDate
                  ).length
                }{" "}
                present •{" "}
                {allStudentsBySubjects.length -
                  subjectAttendances.filter(
                    (s) =>
                      Number(s.subject_id) === Number(getSubjectId) &&
                      s.date === getSubjDate
                  ).length}{" "}
                absent
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleToDownLoadSelectedData}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Download className="h-4 w-4" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={seacrhData}
                  onChange={(e) => setSearchData(e.target.value)}
                  placeholder="Search by name, ID, or email..."
                  className="pl-10 pr-4 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 w-full sm:w-64"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="all">All Status</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600">
                {allStudentsBySubjects.length} students
              </span>
              <button
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors">
                    <div className="flex items-center space-x-1">
                      <span>Student ID</span>
                      <span className="text-blue-600">↑</span>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors">
                    <div className="flex items-center space-x-1">
                      <span>Last Name</span>
                      <span className="text-blue-600">↑</span>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors">
                    <div className="flex items-center space-x-1">
                      <span>Gender</span>
                      <span className="text-blue-600">↑</span>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors">
                    <div className="flex items-center space-x-1">
                      <span>Status</span>
                      <span className="text-blue-600">↑</span>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors">
                    <div className="flex items-center space-x-1">
                      <span>Time Scanned</span>
                      <span className="text-blue-600">↑</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {finalFilteredStudents
                  .sort((a, b) => {
                    const genderCompare = b.gender.localeCompare(a.gender);
                    if (genderCompare !== 0) return genderCompare;

                    return a.last_name.localeCompare(b.last_name);
                  })
                  .map((student) => {
                    const attendance = subjectAttendances.find(
                      (att) =>
                        att.student_id === student.student_id &&
                        att.date === getSubjDate
                    );

                    return (
                      <tr
                        key={student.student_id}
                        className="hover:bg-slate-200 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                          {student.roll_number}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                          {student.last_name}, {student.first_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                          {student.gender.charAt(0).toUpperCase() +
                            student.gender.slice(1)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          {student.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {attendance ? (
                            attendance.status === "Present" ? (
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border text-emerald-600 bg-emerald-50 border-emerald-200`}
                              >
                                <CheckCircle className="h-4 w-4" />
                                <span className="ml-1 capitalize">Present</span>
                              </span>
                            ) : attendance.status === "Late" ? (
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border text-yellow-600 bg-yellow-50 border-yellow-200`}
                              >
                                <XCircle className="h-4 w-4" />
                                <span className="ml-1 capitalize">Late</span>
                              </span>
                            ) : (
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border text-red-600 bg-red-50 border-red-200`}
                              >
                                <XCircle className="h-4 w-4" />
                                <span className="ml-1 capitalize">Absent</span>
                              </span>
                            )
                          ) : (
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border text-red-600 bg-red-50 border-red-200`}
                            >
                              <XCircle className="h-4 w-4" />
                              <span className="ml-1 capitalize">Absent</span>
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          {attendance?.time
                            ? formattedTime(attendance.time)
                            : "--:--"}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        {false && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              No students found
            </h3>
            <p className="text-slate-600">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewDetailsReportsPerSubject;
