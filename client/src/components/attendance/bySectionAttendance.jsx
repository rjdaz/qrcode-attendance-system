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

const FullAttendance = ({ apiUrl, user }) => {
  const navigate = useNavigate();
  const { section_id } = useParams();
  const [students, setStudents] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  const activeSectionId = section_id || user?.sectionId;
  const numericSectionId = activeSectionId
    ? Number(activeSectionId)
    : undefined;

  useEffect(() => {
    if (numericSectionId) {
      fetchStudentsInSection(apiUrl, numericSectionId, setStudents);
    }
  }, [numericSectionId, apiUrl]);

  // Fallback mock students (12) if API returns none
  const fallbackStudents = useMemo(() => {
    const mockNames = [
      { first_name: "Angelica", last_name: "Reyes" },
      { first_name: "Christian", last_name: "Garcia" },
      { first_name: "Hannah", last_name: "Cruz" },
      { first_name: "John", last_name: "Mendoza" },
      { first_name: "Joshua", last_name: "Santos" },
      { first_name: "Kristine", last_name: "Gomez" },
      { first_name: "Kyle", last_name: "Torres" },
      { first_name: "Mae", last_name: "Lopez" },
      { first_name: "Mark", last_name: "Villanueva" },
      { first_name: "Patricia", last_name: "Ramos" },
      { first_name: "Ryan Jake", last_name: "Daz" },
      { first_name: "Roince", last_name: "Jumao-as" },
    ];
    return mockNames.map((n, idx) => ({
      student_id: idx + 1,
      roll_number: `S25${String(idx + 1).padStart(4, "0")}`,
      first_name: n.first_name,
      last_name: n.last_name,
    }));
  }, []);

  // Deterministic per-student minute offset (so time stays stable)
  const getStableMinuteOffset = (student) => {
    const source = `${student.student_id}-${student.roll_number || ""}-${
      student.last_name || ""
    }`;
    let sum = 0;
    for (let i = 0; i < source.length; i++)
      sum = (sum + source.charCodeAt(i)) % 60;
    return sum % 30; // 0..29 minutes window
  };

  const formatTime12h = (hours24, minutes) => {
    const h = hours24 % 12 === 0 ? 12 : hours24 % 12;
    const ampm = hours24 < 12 ? "AM" : "PM";
    const mm = String(minutes).padStart(2, "0");
    return `${h}:${mm} ${ampm}`;
  };

  // Prepare alphabetized list with mock scan time
  const displayedStudents = useMemo(() => {
    const base = students.length > 0 ? students : fallbackStudents;
    const sorted = [...base].sort((a, b) => {
      const aLast = (a.last_name || "").toLowerCase();
      const bLast = (b.last_name || "").toLowerCase();
      if (aLast !== bLast) return aLast.localeCompare(bLast);
      const aFirst = (a.first_name || "").toLowerCase();
      const bFirst = (b.first_name || "").toLowerCase();
      return aFirst.localeCompare(bFirst);
    });
    return sorted.map((s) => {
      const minuteOffset = getStableMinuteOffset(s);
      const status =
        minuteOffset <= 5 ? "present" : minuteOffset <= 15 ? "late" : "absent";
      // Time In at 8:00 + minuteOffset
      const timeInHours24 = 8 + Math.floor(minuteOffset / 60);
      const timeInMinutes = minuteOffset % 60;
      const mock_time_in =
        status !== "absent"
          ? formatTime12h(timeInHours24, timeInMinutes)
          : null;
      // Time Out at 17:00 + minuteOffset
      const timeOutBaseMinutes = minuteOffset % 60;
      const mock_time_out =
        status !== "absent"
          ? formatTime12h(
              17 + Math.floor(minuteOffset / 60),
              timeOutBaseMinutes
            )
          : null;
      return { ...s, mock_time_in, mock_time_out, status };
    });
  }, [students, fallbackStudents]);

  const filteredStudents = useMemo(() => {
    if (statusFilter === "all") return displayedStudents;
    return displayedStudents.filter((s) => s.status === statusFilter);
  }, [displayedStudents, statusFilter]);

  const statusCounts = useMemo(() => {
    let present = 0;
    let late = 0;
    let absent = 0;
    for (const s of displayedStudents) {
      if (s.status === "present") present += 1;
      else if (s.status === "late") late += 1;
      else if (s.status === "absent") absent += 1;
    }
    return { present, late, absent, all: displayedStudents.length };
  }, [displayedStudents]);

  const [currentDateDisplay, setCurrentDateDisplay] = useState("");

  useEffect(() => {
    const computeDate = () =>
      new Date().toLocaleDateString(undefined, {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      });

    setCurrentDateDisplay(computeDate());

    let timeoutId;
    const scheduleMidnightUpdate = () => {
      const now = new Date();
      const next = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,
        0,
        1,
        0
      );
      const msUntilNext = next.getTime() - now.getTime();
      timeoutId = setTimeout(() => {
        setCurrentDateDisplay(computeDate());
        scheduleMidnightUpdate();
      }, msUntilNext);
    };

    scheduleMidnightUpdate();
    return () => clearTimeout(timeoutId);
  }, []);

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
              <p className="text-slate-600">
                {displayedStudents.length} students
              </p>
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
                      {statusCounts.all}
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
                      {statusCounts.present}
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
                      {statusCounts.late}
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
                      {statusCounts.absent}
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
                {currentDateDisplay}
              </span>
            </div>
          </div>
          <div className="divide-y divide-slate-200">
            {/* Header row */}
            <div className="hidden md:flex text-xs uppercase tracking-wide text-slate-500 pb-2">
              <div className="w-1/3">Name</div>
              <div className="w-1/6">ID / Roll</div>
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
                    {student.fullname ||
                      `${student.first_name} ${student.last_name}`}
                  </p>
                </div>
                <div className="w-1/6">
                  <p className="text-sm text-slate-600">
                    {student.student_id} / {student.roll_number}
                  </p>
                </div>
                <div className="w-1/6">
                  {student.mock_time_in ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-100">
                      {student.mock_time_in}
                    </span>
                  ) : (
                    <span className="text-sm text-slate-400">-</span>
                  )}
                </div>
                <div className="w-1/6">
                  {student.mock_time_out ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-sm font-medium border border-indigo-100">
                      {student.mock_time_out}
                    </span>
                  ) : (
                    <span className="text-sm text-slate-400">-</span>
                  )}
                </div>
                <div className="w-1/6">
                  {student.status === "present" && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-green-50 text-green-700 text-sm font-medium border border-green-100">
                      Present
                    </span>
                  )}
                  {student.status === "late" && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-sm font-medium border border-amber-100">
                      Late
                    </span>
                  )}
                  {student.status === "absent" && (
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
