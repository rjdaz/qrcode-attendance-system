import {
  ArrowLeft,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  Camera,
  Users,
  Clock,
  Building2,
  QrCode,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Scanner from "./scanner"; // <-- Import your scanner logic
import {
  getClassAdviserDetails,
  fetchStudentsInSection,
} from "../../database/teachers/teacher_database";
import { fetchStudents } from "../../database/students/studentsDatabase";
import { getAllattendanceTable } from "../../database/attendance/attendances";
import { sortingSubjectsBySection } from "../../database/subjects/subjects";
import axios from "axios";

const GuardScanner = ({ sectionId, apiUrl, userId, fixDate, fixTime, fixDay }) => {
  const navigate = useNavigate();

  // ARRAYS
  const [students, setStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [classAdviser, setClassAdviser] = useState([]);
  const [allAttendance, setAllAttendance] = useState([]);
  const [allSubjBySect, setAllSubjBySect] = useState([]);

  // manual entry
  const [manualEntry, setManualEntry] = useState(false);
  const [searchManualEntry, setSearchManualEntry] = useState("");

  const isProcessingRef = useRef(false);

  const date = fixDate;
  const day = fixDay;

  useEffect(() => {
    fetchStudentsInSection(apiUrl, sectionId, setStudents);
    getClassAdviserDetails(apiUrl, userId, setClassAdviser);
    fetchStudents(apiUrl, setAllStudents);
    getAllattendanceTable(apiUrl, setAllAttendance);
    sortingSubjectsBySection(apiUrl, sectionId, setAllSubjBySect);
  }, [sectionId]);

  // get the student present today
  const presentToday = allAttendance.filter(
    (a) => a.section_id === sectionId && a.date === date
  ).length;

  // get the student info (manual Entry)
  const searchStudentID = students.filter(
    (s) => s.roll_number === searchManualEntry
  );

  //check the student is already login or present today
  const checkStatusOfStudent = (studentId) => {
    return allAttendance.some(
      (s) => s.student_id === studentId && s.date === date
    );
  };

  // sort by start time
  const sortingByStartTimeAndDay = allSubjBySect
    .filter((d) => d.days.includes(day))
    .sort((a, b) => a.start_time.localeCompare(b.start_time));

  // add 15 mins in the first subject time
  const startTime = sortingByStartTimeAndDay?.[0]?.start_time || "";
  const time = new Date(`1970-01-01T${startTime}`);
  time.setMinutes(time.getMinutes() + 15);
  const newTime = time.toTimeString().split(" ")[0];

  console.log(newTime);
  console.log(startTime);
  console.log(sortingByStartTimeAndDay);
  console.log("Section ID:", sectionId);
  console.log("Students:", students);
  console.log("Class Adviser:", classAdviser);
  console.log("All Students:", allStudents);
  console.log("All attendance:", allAttendance);
  console.log(searchManualEntry);
  console.log(searchStudentID);
  console.log(checkStatusOfStudent());
  console.log(sortingByStartTimeAndDay?.[0]?.start_time || "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="w-full px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-3 py-2 rounded-lg transition-all duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </button>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                  <QrCode className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900">
                  QR Scanner - {classAdviser.section_role}
                </h1>
              </div>
              <p className="text-slate-600">
                {students.length} students • {presentToday} present today
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                onClick={() => setManualEntry(!manualEntry)}
              >
                <Users className="h-4 w-4" />
                <span>Manual Entry</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* QR Scanner */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                  <Camera className="h-7 w-7 mr-3 text-blue-600" />
                  QR Code Scanner
                </h2>
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full bg-emerald-500`}></div>
                  <span className="text-sm font-medium text-slate-600">
                    Scanning...
                  </span>
                </div>
              </div>

              <div className="relative bg-slate-900 rounded-2xl overflow-hidden">
                <div id="qr-reader" className="w-full min-h-[400px]"></div>
                <div className="absolute inset-0 pointer-events-none">
                  <div className="border-4 border-blue-400 rounded-2xl m-8 animate-pulse shadow-2xl"></div>
                  <div className=" flex items-center justify-between top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-16 h-16 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center">
                      {allStudents.length > 0 ? (
                        <Scanner
                          onScanSuccess={async (decodedText) => {
                            if (isProcessingRef.current) return;
                            isProcessingRef.current = true;

                            console.log("Scanned:", decodedText);
                            setGetDecodeText(decodedText);

                            // GET THE STUDENT BASE ON THE rollNumber
                            const findStudentByRollNumber = allStudents.find(
                              (student) => student.roll_number === decodedText
                            );

                            const findSamestudentIdAndDate = allAttendance.some(
                              (attendance) =>
                                attendance.date === date &&
                                attendance.student_id ===
                                  findStudentByRollNumber?.student_id
                            );

                            if (!findStudentByRollNumber) {
                              console.log(
                                "Invalid QR Code: Student not found."
                              );
                              return;
                            }

                            console.log("student:", findStudentByRollNumber);
                            console.log(findStudentByRollNumber?.student_id);

                            // if the student is going to time in
                            if (attendanceType === "timein") {
                              console.log("timein");

                              // CHECK IF IT IS ALREADY LOG-IN
                              if (findSamestudentIdAndDate) {
                                console.log("Your Are Already Log In!");
                                isProcessingRef.current = false;
                                return;
                              }

                              const url = `${apiUrl}qrcodeAttendance`;

                              const statusData =
                                fixTime <= newTime ? "Present" : "Late";

                              console.log(statusData);

                              try {
                                const responce = await axios.post(url, {
                                  student_id:
                                    findStudentByRollNumber?.student_id,
                                  section_id: findStudentByRollNumber?.section,
                                  status: statusData,
                                });

                                if (responce.data.success) {
                                  console.log(responce.data.messages);

                                  // REFRESH DATA
                                  await getAllattendanceTable(
                                    apiUrl,
                                    setAllAttendance
                                  );
                                } else {
                                  console.log(responce.data.messages);
                                }
                              } catch (err) {
                                console.log("Error", err);
                              } finally {
                                isProcessingRef.current = false;
                              } // if the student is going to log out
                            } else if (attendanceType === "timeout") {
                              // update and add for log out time
                              console.log("timeout");
                              const url = `${apiUrl}qrcodeAttendanceLogout`;

                              try {
                                const response = await axios.post(url, {
                                  student_id:
                                    findStudentByRollNumber?.student_id,
                                });

                                if (response.data.success) {
                                  console.log("Students Already Log Out");
                                  console.log(response.data.messages);
                                } else {
                                  console.log(response.data.messages);
                                }
                              } catch (err) {
                                console.log(err);
                              } finally {
                                isProcessingRef.current = false;
                              }
                            }
                          }}
                        />
                      ) : (
                        <p className="text-center text-slate-500 mt-4">
                          Loading students... Please wait.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                <h3 className="font-semibold text-blue-900 mb-4 text-lg">
                  Scan Instructions:
                </h3>
                <ul className="text-blue-800 space-y-2">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Position the QR code within the scanning area
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Hold steady for 1-2 seconds
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Wait for confirmation message
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Scanner will auto-ready for next student
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Manual Attendance */}
            {manualEntry && (
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                  <Users className="h-6 w-6 text-blue-600 mr-3" />
                  Manual Attendance Entry
                </h3>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by ID...  ex.S250001"
                    value={searchManualEntry}
                    onChange={(e) => setSearchManualEntry(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>

                <div className="max-h-64 overflow-y-auto space-y-3">
                  {searchStudentID.map((student, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-200"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">
                          {student.last_name +
                            ", " +
                            student.first_name +
                            " " +
                            student.middle_name}
                        </p>
                        <p className="text-sm text-slate-600">
                          ID: {student.roll_number}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span
                          className={`  text-xs font-semibold rounded-full border  bg-red-50 border-red-200`}
                        >
                          {checkStatusOfStudent(student?.student_id) ? (
                            <span className="px-3 py-1 text-xs font-semibold rounded-full border text-green-600 bg-green-50 border-green-200">
                              Present
                            </span>
                          ) : (
                            <span className="px-3 py-1 text-xs font-semibold rounded-full border text-red-600 bg-red-50 border-red-200">
                              Absent
                            </span>
                          )}
                        </span>
                        {true && (
                          <button
                            className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-xs rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                            onClick={async () => {
                              const url = `${apiUrl}qrcodeAttendance`;

                              const statusData =
                                fixTime <= newTime ? "Present" : "Late";

                              try {
                                const responce = await axios.post(url, {
                                  student_id: student.student_id,
                                  section_id: student.section,
                                  status: statusData,
                                });

                                if (responce.data.success) {
                                  console.log(responce.data.messages);

                                  // REFRESH DATA
                                  await getAllattendanceTable(
                                    apiUrl,
                                    setAllAttendance
                                  );
                                } else {
                                  console.log(responce.data.messages);
                                }
                              } catch (err) {
                                console.log("Error :", err);
                              }
                            }}
                          >
                            Mark Present
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Class Statistics */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                <Building2 className="h-6 w-6 text-blue-600 mr-3" />
                Class Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-600 font-medium">
                    Total Students:
                  </span>
                  <span className="font-bold text-slate-900">
                    {students.length}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-xl">
                  <span className="text-slate-600 font-medium">
                    Present Today:
                  </span>
                  <span className="font-bold text-emerald-600">
                    {
                      allAttendance.filter(
                        (a) => a.section_id === sectionId && a.date === date
                      ).length
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
                  <span className="text-slate-600 font-medium">
                    Absent Today:
                  </span>
                  <span className="font-bold text-red-600">
                    {students.length -
                      allAttendance.filter(
                        (a) => a.section_id === sectionId && a.date === date
                      ).length}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                  <span className="text-slate-600 font-medium">
                    Attendance Rate:
                  </span>
                  <span className="font-bold text-blue-600">
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
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                <Clock className="h-6 w-6 text-blue-600 mr-3" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all duration-200 border border-slate-200 font-medium"
                  onClick={() => navigate(`/attendance/full/${sectionId}`)}
                >
                  <Users className="h-4 w-4" />
                  <span>View Full Attendance</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all duration-200 border border-slate-200 font-medium">
                  <Clock className="h-4 w-4" />
                  <span>View Reports</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
