import {
  ArrowLeft,
  Calendar,
  Download,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  FileText,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import {
  fetchAttendancesPerSubject,
  fetchAllAttendancePerSubjectByTeacher,
  innerJoinAttAndStdntsData,
} from "../../database/attendance/attendances";
import { fetchStudents } from "../../database/students/studentsDatabase";
import { getAllSubjectData } from "../../database/subjects/subjects";

const AttendanceHistory = ({
  apiUrl,
  fixDate,
  userId,
  setGetSubjectId,
  setGetDatePrevSubject,
}) => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [
    allAttendancesPerSubjectbyTeacher,
    setAllAttendancesPerSubjectByTeacher,
  ] = useState([]);
  const [students, setStudents] = useState([]);
  const [allSubjectData, setAllSubjectData] = useState([]);

  const date = fixDate;

  useEffect(() => {
    fetchAttendancesPerSubject(apiUrl, setHistory, date);
    fetchAllAttendancePerSubjectByTeacher(
      apiUrl,
      setAllAttendancesPerSubjectByTeacher,
      userId
    );
    fetchStudents(apiUrl, setStudents);
    getAllSubjectData(apiUrl, setAllSubjectData);
  }, [apiUrl, date]);

  // get all subjects of teacher
  const handleTotalAllSubjectOfTeacher = allSubjectData.filter(
    (s) => Number(s.teacher_id) === Number(userId)
  );

  // remove duplicate section_id
  const removeDuplicateSectionId = handleTotalAllSubjectOfTeacher.filter(
    (sec, index, self) =>
      index === self.findIndex((s) => s.section_id === sec.section_id)
  );

  // total all students by all subject of teacher
  const handleTotalAllStudentsOfTeacher = (removeDuplicateSectionId, students) => {
    const allStudents = [];
    let i = 0;

    while (i < removeDuplicateSectionId.length) {
      const sectionId = Number(removeDuplicateSectionId[i].section_id);
      const getStudents = students.filter((s) => Number(s.section) === sectionId);
      
      allStudents.push(...getStudents);

      i++;
    }

    return allStudents;
  }
  
  // total students
  const totalStudents = handleTotalAllStudentsOfTeacher(
    removeDuplicateSectionId,
    students
  );

  // get all total students per subjects
  const handleTotalAllStudentsPerSbujects = (allAttendancesPerSubjectbyTeacher, students) => {
    var total = 0;
    let i = 0;

    while (i < allAttendancesPerSubjectbyTeacher.length) {
      const sectionId = Number(allAttendancesPerSubjectbyTeacher[i].section_id);
      const getAll = students.filter((s) => Number(s.section) === sectionId).length;

      total = total + getAll;
      i++;
    }

    return total;
  };

  const totalStudentsPerSubjects = handleTotalAllStudentsPerSbujects(allAttendancesPerSubjectbyTeacher, students);

  // back to dashboard
  const handlebacktodashboard = () => {
    navigate("/dashboard");
  };

  console.log(date);
  console.log(userId);
  console.log(allAttendancesPerSubjectbyTeacher);
  console.log(history);
  console.log(students);
  console.log(userId);
  console.log(allSubjectData);
  console.log(removeDuplicateSectionId);
  console.log(totalStudents);
  console.log(totalStudentsPerSubjects);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
                onClick={handlebacktodashboard}
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </button>
            </div>
            <div className="text-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Attendance History
              </h1>
              <p className="text-sm text-gray-500">
                View and export past attendance records
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
                <Download className="h-4 w-4" />
                <span>Export CSV</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors">
                <FileText className="h-4 w-4" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <input
                type="date"
                value={date}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
              />
            </div>

            {/* Quick Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quick Range
              </label>
              <select
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">This Week</option>
                <option value="lastWeek">Last Week</option>
              </select>
            </div>

            {/* Class Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class
              </label>
              <select
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              >
                <option value="all">All Classes</option>
                <option key={1} value={1}>
                  Introduction to Computer Science
                </option>
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search classes..."
                  disabled
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Records
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {allAttendancesPerSubjectbyTeacher.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Avg. Attendance
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {(
                    (allSubjectData.filter((sp) => sp.teacher_id === userId)
                      .length /
                      totalStudentsPerSubjects) *
                    100
                  ).toFixed(2)}
                  %
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <BarChart3 className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Students
                </p>
                <p className="text-2xl font-bold text-yellow-600 ">
                  {totalStudents.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Classes</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {
                    allSubjectData.filter(
                      (allsub) => allsub.teacher_id === userId
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance History Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Total Students
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Present
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Absent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Late
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Attendance Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allAttendancesPerSubjectbyTeacher.map((row, index) => {
                  // get all students by subject
                  const allStudentBySubject = students.filter(
                    (s) => Number(s.section) === Number(row.section_id)
                  );

                  // get all present in the same date
                  const getAllPresentBaseInSubjectIdAndDate = history.filter(
                    (p) =>
                      Number(p.subject_id) === Number(row.subject_id) &&
                      p.date === row.date
                  );

                  // get all late in the same date
                  const getAllLateBaseInSubjectIdAndDate = history.filter(
                    (p) =>
                      Number(p.subject_id) === Number(row.subject_id) &&
                      p.date === row.date &&
                      p.status === "Late"
                  );

                  console.log(row.subject_id, row.date);
                  console.log(getAllLateBaseInSubjectIdAndDate);
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {row.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {row.subject_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {row.subject_code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {allStudentBySubject.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                        {getAllPresentBaseInSubjectIdAndDate.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                        {allStudentBySubject.length -
                          getAllPresentBaseInSubjectIdAndDate.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">
                        {getAllLateBaseInSubjectIdAndDate.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            (getAllPresentBaseInSubjectIdAndDate.length /
                              allStudentBySubject.length) *
                              100 >=
                            75
                              ? "text-green-600 bg-green-100"
                              : "text-yellow-700 bg-yellow-100"
                          }`}
                        >
                          {(
                            (getAllPresentBaseInSubjectIdAndDate.length /
                              allStudentBySubject.length) *
                            100
                          ).toFixed(2)}
                          %
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => {
                            navigate(`/view-details/${row.subject_id}`);
                            setGetSubjectId(row.subject_id);
                            setGetDatePrevSubject(row.date);
                          }}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {false && (
            <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  disabled={true}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  disabled={true}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Showing <span className="font-medium">1</span> to{" "}
                    <span className="font-medium">5</span> of{" "}
                    <span className="font-medium">5</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      disabled={true}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    {false &&
                      Array.from({ length: 1 }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            false
                              ? "z-10 bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-600"
                              : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    <button
                      disabled={true}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>

        {false && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No attendance records found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your date range or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceHistory;
