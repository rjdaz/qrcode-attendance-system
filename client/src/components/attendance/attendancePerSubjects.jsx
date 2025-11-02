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
} from "lucide-react";
import { getAllStudentsBySubjects } from "../../database/subjects/subjects";
import {
  innerJoinAttAndStdntsData,
  addAttendancePerSubject,
  fetchAttendancesPerSubject,
} from "../../database/attendance/attendances";
import { fetchClasses } from "../../database/teachers/teacher_database";

const AttendanceTable = ({
  user,
  apiUrl,
  getSubjectId,
  setGetSubjectId,
  fixDate,
  fixTime,
}) => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [allAttendances, setAllAttendances] = useState([]);
  const [allStudentsBySubjects, setAllStudentsBySubjects] = useState([]);
  const [checkedMap, setCheckedMap] = useState({});
  const [subjectAttendances, setSubjectAttendances] = useState([]);

  const date = fixDate;
  const time = fixTime;

  // Derive section_id from classes using the current subject id
  const sectionIdFromClasses = useMemo(() => {
    if (!classes || !classes.length || !getSubjectId) return undefined;
    const subjectIdNum = Number(getSubjectId);
    const match = classes.find(
      (cls) => Number(cls.subject_id) === subjectIdNum
    );
    return match?.section_id;
  }, [classes, getSubjectId]);

  // 15mins late time
  const lateTime = useMemo(() => {
    const getTheSubjectStartTime = classes.find(
      (c) => Number(c.subject_id) === Number(getSubjectId)
    );
    if (!getTheSubjectStartTime) return null;
    const startTime = getTheSubjectStartTime.start_time;
    const plus15Mins = new Date(`1970-01-01T${startTime}`);
    plus15Mins.setMinutes(plus15Mins.getMinutes() + 15);
    const hours = String(plus15Mins.getHours()).padStart(2, "0");
    const minutes = String(plus15Mins.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}:00`;
  });

  console.log("Late Time: ", lateTime);
  // Fetch today's classes for the teacher
  useEffect(() => {
    fetchClasses(apiUrl, user.userId, setClasses);
  }, [apiUrl, user.userId]);

  // Fetch students for the selected subject whenever subject changes
  useEffect(() => {
    if (!getSubjectId) return;
    getAllStudentsBySubjects(apiUrl, getSubjectId, setAllStudentsBySubjects);
  }, [apiUrl, getSubjectId]);

  // Fetch attendances when we have a resolved section id and date
  useEffect(() => {
    if (!sectionIdFromClasses || !date) return;
    innerJoinAttAndStdntsData(
      apiUrl,
      setAllAttendances,
      sectionIdFromClasses,
      date
    );
  }, [apiUrl, sectionIdFromClasses, date]);

  // Fetch per-subject attendance for the date
  useEffect(() => {
    if (!date) return;
    fetchAttendancesPerSubject(apiUrl, setSubjectAttendances, date);
  }, [apiUrl, date]);

  // Initialize checkedMap from existing per-subject attendance for selected subject
  useEffect(() => {
    if (!Array.isArray(subjectAttendances) || !getSubjectId) return;
    const subjectIdNum = Number(getSubjectId);
    const byStudent = {};
    subjectAttendances
      .filter((row) => Number(row.subject_id) === subjectIdNum)
      .forEach((row) => {
        byStudent[row.student_id] = true;
      });
    setCheckedMap(byStudent);
  }, [subjectAttendances, getSubjectId]);

  // formattedTime
  const formattedTime = (time) => {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // handle checkbox change per student
  const handleSubjectCheckbox = async (student) => {
    const attendance = allAttendances.find(
      (att) => att.student_id === student.student_id && att.date === date
    );
    if (!attendance) {
      alert("Please log in first before using the checkbox.");
      return;
    }
    // optimistic toggle
    setCheckedMap((prev) => ({
      ...prev,
      [student.student_id]: !prev[student.student_id],
    }));

    const status = time > lateTime ? "Late" : "Present";

    // submit record
    try {
      const payload = {
        studentId: student.student_id,
        subjectId: Number(getSubjectId),
        teacherId: user.userId,
        sectionId: sectionIdFromClasses,
        date,
        status: status,
      };
      const res = await addAttendancePerSubject(apiUrl, payload);
      if (!res?.success) {
        alert(res?.message || "Failed to record attendance for subject.");
        // revert toggle on failure
        setCheckedMap((prev) => ({
          ...prev,
          [student.student_id]: !prev[student.student_id],
        }));
      }
      if (res?.success) {
        // refresh authoritative list so state persists across navigation
        fetchAttendancesPerSubject(apiUrl, setSubjectAttendances, date);
      }
    } catch (e) {
      alert("Network error while recording attendance.");
      setCheckedMap((prev) => ({
        ...prev,
        [student.student_id]: !prev[student.student_id],
      }));
    }
  };

  // total of present today
  const totalPresent =
    allStudentsBySubjects.length -
      allAttendances.filter((e) => e.status === "Present") || 0;

  console.log("Subject ID: ", getSubjectId);
  console.log(allAttendances);
  console.log(allStudentsBySubjects);
  console.log("Date: ", fixDate);
  console.log(classes);
  console.log(time);
  console.log("Section ID in Classes: ", sectionIdFromClasses);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="w-full px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  navigate("/dashboard");
                  setGetSubjectId("");
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
                  classes.find((s) => s.subject_id === Number(getSubjectId))
                    ?.subject_name
                }
              </h1>
              <p className="text-slate-600">
                {allStudentsBySubjects.length} students •{" "}
                {
                  allAttendances.filter(
                    (a) => a.status === "Present" && a.status === "Late"
                  ).length
                }{" "}
                present • {totalPresent} absent •{" "}
                {allAttendances.filter((a) => a.status === "Late").length} late
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
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
                  placeholder="Search by name, ID, or email..."
                  className="pl-10 pr-4 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 w-full sm:w-64"
                />
              </div>
              <select className="px-4 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                <option value="all">All Status</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600">
                {allStudentsBySubjects.length} students
              </span>
              <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200">
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
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {allStudentsBySubjects
                  .sort((a, b) => {
                    const genderCompare = b.gender.localeCompare(a.gender);
                    if (genderCompare !== 0) return genderCompare;

                    return a.last_name.localeCompare(b.last_name);
                  })
                  .map((student) => {
                    const attendance = allAttendances.find(
                      (att) =>
                        att.student_id === student.student_id &&
                        att.date === date
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
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border text-emerald-600 bg-emerald-50 border-emerald-200`}
                            >
                              <CheckCircle className="h-4 w-4" />
                              <span className="ml-1 capitalize">Present</span>
                            </span>
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
                          {attendance?.time_in
                            ? formattedTime(attendance.time_in)
                            : "--:--"}
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 text-center"
                          onClick={() => {
                            if (!attendance) {
                              alert(
                                "Please log in first before using the checkbox."
                              );
                            }
                          }}
                        >
                          {(() => {
                            const classData = classes.find(
                              (c) =>
                                Number(c.subject_id) === Number(getSubjectId)
                            );
                            const isDisabled = classData
                              ? time > classData.end_time
                              : false;

                            const notes = isDisabled
                              ? "Attendance period has ended."
                              : "";
                            return (
                              <div>
                                <input
                                  type="checkbox"
                                  title={notes}
                                  disabled={isDisabled}
                                  checked={
                                    subjectAttendances.some(
                                      (att) =>
                                        att.student_id === student.student_id &&
                                        Number(att.subject_id) ===
                                          Number(getSubjectId) &&
                                        att.date === date
                                    ) || false
                                  }
                                  onChange={() =>
                                    handleSubjectCheckbox(student)
                                  }
                                />
                              </div>
                            );
                          })()}
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

export default AttendanceTable;
