import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Calendar,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { fetchStudentsInSection } from "../../database/teachers/teacher_database";
import { innerJoinAttAndStdntsData } from "../../database/attendance/attendances";
import { sortingSubjectsBySection } from "../../database/subjects/subjects";

const FullAttendance = ({ apiUrl, user }) => {
  const navigate = useNavigate();
  const { section_id } = useParams();
  const [students, setStudents] = useState([]);
  const [allAttendances, setAllAttendances] = useState([]);
  const [allSubjBySect, setAllSubjBySect] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  const date = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Manila",
  });

  const activeSectionId = section_id || user?.sectionId;
  const numericSectionId = activeSectionId
    ? Number(activeSectionId)
    : undefined;

  //
  useEffect(() => {
    if (numericSectionId) {
      fetchStudentsInSection(apiUrl, numericSectionId, setStudents);
      innerJoinAttAndStdntsData(
        apiUrl,
        setAllAttendances,
        numericSectionId,
        date
      );
      sortingSubjectsBySection(apiUrl, numericSectionId, setAllSubjBySect);
    }
  }, [numericSectionId, apiUrl, date]);

  const filteredStudents = allAttendances
    .filter((student) => {
      if (statusFilter === "all") return true;
      if (statusFilter === "present")
        return student.status === "Present" || student.status === "Late";
      if (statusFilter === "late") return student.status === "Late";
      if (statusFilter === "absent") return student.attendance_id === null;
      return true;
    })
    .sort((a, b) => {
      const genderCompare = b.gender.localeCompare(a.gender);
      if (genderCompare !== 0) return genderCompare;

      return a.last_name.localeCompare(b.last_name);
    });

  console.log(students);
  console.log(user.sectionId);
  console.log(date);
  console.log(allAttendances);
  console.log(allSubjBySect);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="w-full px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-3 py-2 rounded-lg transition-all duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </button>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Full Attendance
                </h1>
              </div>
              <p className="text-slate-600">{allAttendances.length} students</p>
            </div>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <div className="w-full px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 flex items-center">
              <Users className="h-6 w-6 text-blue-600 mr-3" /> Students
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white p-1">
                  <button
                    onClick={() => setStatusFilter("all")}
                    className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors ${
                      statusFilter === "all"
                        ? "bg-slate-50 text-slate-900 border border-slate-200"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <span className="font-medium">All</span>
                    <span
                      className={`ml-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1 text-xs font-semibold ${
                        statusFilter === "all"
                          ? "bg-slate-800 text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {/* {statusCounts.all} */}
                    </span>
                  </button>
                  <button
                    onClick={() => setStatusFilter("present")}
                    className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors ${
                      statusFilter === "present"
                        ? "bg-slate-50 text-slate-900 border border-slate-200"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4 text-slate-500" />
                    <span className="font-medium">Present</span>
                    <span
                      className={`ml-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1 text-xs font-semibold ${
                        statusFilter === "present"
                          ? "bg-slate-800 text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {/* {statusCounts.present} */}
                    </span>
                  </button>
                  <button
                    onClick={() => setStatusFilter("late")}
                    className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors ${
                      statusFilter === "late"
                        ? "bg-slate-50 text-slate-900 border border-slate-200"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <Clock className="h-4 w-4 text-slate-500" />
                    <span className="font-medium">Late</span>
                    <span
                      className={`ml-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1 text-xs font-semibold ${
                        statusFilter === "late"
                          ? "bg-slate-800 text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {/* {statusCounts.late} */}
                    </span>
                  </button>
                  <button
                    onClick={() => setStatusFilter("absent")}
                    className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors ${
                      statusFilter === "absent"
                        ? "bg-slate-50 text-slate-900 border border-slate-200"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <XCircle className="h-4 w-4 text-slate-500" />
                    <span className="font-medium">Absent</span>
                    <span
                      className={`ml-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1 text-xs font-semibold ${
                        statusFilter === "absent"
                          ? "bg-slate-800 text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {/* {statusCounts.absent} */}
                    </span>
                  </button>
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <div className="text-[10px] uppercase tracking-wide text-slate-500">
                  Attendance Date
                </div>
                <div className="sr-only">Current attendance date</div>
              </div>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-50 text-slate-700 text-sm font-medium border border-slate-200">
                <Calendar className="h-4 w-4 mr-2 text-slate-500" />
                {date}
              </span>
            </div>
          </div>
          <div className="divide-y divide-slate-200">
            {/* Header row */}
            <div className="hidden md:flex text-xs uppercase tracking-wide text-slate-500 pb-2">
              <div className="w-1/3">Name</div>
              <div className="w-1/6">Roll Number</div>
              <div className="w-1/6">Time In</div>
              <div className="w-1/6">Time Out</div>
              <div className="w-1/6">Status</div>
            </div>
            {filteredStudents.map((student) => (
              <div
                key={`${student.student_id}-${student.roll_number}`}
                className="py-4 flex items-center justify-between"
              >
                <div className="w-1/3">
                  <p className="font-semibold text-slate-900">
                    {`${student.last_name}, ${student.first_name} ${student.middle_name}`}
                  </p>
                </div>
                <div className="w-1/6">
                  <p className="text-sm text-slate-600">
                    {student.roll_number}
                  </p>
                </div>
                <div className="w-1/6">
                  {student.time_in ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-100">
                      {student.time_in}
                    </span>
                  ) : (
                    <span className="text-sm text-slate-400">-</span>
                  )}
                </div>
                <div className="w-1/6">
                  {student.time_out ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-sm font-medium border border-indigo-100">
                      {student.time_out}
                    </span>
                  ) : (
                    <span className="text-sm text-slate-400">-</span>
                  )}
                </div>
                <div className="w-1/6">
                  {student.status === "Present" && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-green-50 text-green-700 text-sm font-medium border border-green-100">
                      Present
                    </span>
                  )}
                  {student.status === "Late" && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-sm font-medium border border-amber-100">
                      Late
                    </span>
                  )}
                  {student.status === null && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 text-sm font-medium border border-rose-100">
                      Absent
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullAttendance;
