import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";
import {
  ArrowLeft,
  Shield,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  LogIn,
  LogOut,
  Camera,
} from "lucide-react";
import Scanner from "../scanners/scanner";
import { fetchStudents } from "../../database/students/studentsDatabase";
import { getAllattendanceTable } from "../../database/attendance/attendances";
import { sortingSubjectsBySection } from "../../database/subjects/subjects";
import axios from "axios";

const GuardScanner = ({
  apiUrl,
  setLoginStatus,
  user,
  setUser,
  setSectionId,
  getSubjectId,
  setGetSubjectId,
  fixDate,
  fixTime,
  fixDay,
}) => {
  const navigate = useNavigate();
  const scannerRef = useRef(null);
  const isRunningRef = useRef(false);
  const lastScanTimeRef = useRef(0);
  const scanCooldown = 3000; // 3 seconds delay between scans
  const [scanResult, setScanResult] = useState(null);
  const [scanStatus, setScanStatus] = useState("ready"); // "ready", "success", "error"
  const [isScanning, setIsScanning] = useState(false);
  const [attendanceType, setAttendanceType] = useState("timein"); // "timein" | "timeout"
  const [isRecording, setIsRecording] = useState(false);
  const [lastRecorded, setLastRecorded] = useState(null);
  const [getDecodedText, setGetDecodeText] = useState("");

  const [allStudents, setAllStudents] = useState([]);
  const [allAttendance, setAllAttendance] = useState([]);
  const [allSubjBySect, setAllSubjBySect] = useState([]);

  const date = fixDate;
  const day = fixDay;
  const isProcessingRef = useRef(false);

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

  // GET THE STUDENT BASE ON THE rollNumber
  const findSectionIdOfStudent = allStudents.find(
    (student) => student.roll_number === getDecodedText
  );

  const sectionId = findSectionIdOfStudent?.section;

  useEffect(() => {
    fetchStudents(apiUrl, setAllStudents);
    getAllattendanceTable(apiUrl, setAllAttendance);
    sortingSubjectsBySection(apiUrl, sectionId, setAllSubjBySect);
  }, [apiUrl, sectionId]);

  // sort by start time
  const sortingByStartTimeAndDay = allSubjBySect
    .filter((d) => d.days.includes(day))
    .sort((a, b) => a.start_time.localeCompare(b.start_time));

  // add 15 mins in the first subject time
  const startTime = sortingByStartTimeAndDay?.[0]?.start_time || "";
  const time = new Date(`1970-01-01T${startTime}`);
  time.setMinutes(time.getMinutes() + 15);
  const newTime = time.toTimeString().split(" ")[0];

  console.log(allStudents);
  console.log(sectionId);
  console.log(date);
  console.log(attendanceType);
  console.log(sortingByStartTimeAndDay);
  console.log(allSubjBySect);
  console.log(startTime);
  console.log(newTime);
  console.log(sortingByStartTimeAndDay?.[0]?.start_time);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="w-full px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-3 w-full justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-lg">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    Guard QR Scanner
                  </h1>
                  <p className="text-slate-600">
                    Scan student QR codes for attendance verification
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl hover:bg-slate-100 transition-colors flex items-center"
              >
                <ArrowLeft className="h-5 w-5 text-slate-600" />
                Log Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Scanner Section */}
          <div className="flex justify-center flex-col bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            {/* Attendance Type Selection */}
            <div>
              {/* Attendance Type Selection Buttons */}
              <div className="flex justify-center mb-6 items-center">
                <div className="flex bg-slate-100 rounded-lg p-1">
                  <button
                    onClick={() => setAttendanceType("timein")}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                      attendanceType === "timein"
                        ? "bg-white text-indigo-700 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Time In</span>
                  </button>
                  <button
                    onClick={() => setAttendanceType("timeout")}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                      attendanceType === "timeout"
                        ? "bg-white text-indigo-700 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Time Out</span>
                  </button>
                </div>
              </div>

              {/* Recording Status */}
              {isRecording && (
                <div className="flex items-center justify-center space-x-3 p-4 bg-blue-50 rounded-lg mb-4">
                  <Clock className="h-5 w-5 text-blue-600 animate-spin" />
                  <span className="text-blue-700 font-medium">
                    Recording{" "}
                    {attendanceType === "timein" ? "Time In" : "Time Out"}...
                  </span>
                </div>
              )}

              {/* Last Recorded Attendance */}
              {lastRecorded && (
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    {/* {lastRecorded.status === "success" ? (
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-rose-600" />
                    )} */}
                    <h4 className="font-semibold text-slate-900">
                      Last Recorded
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Type:</p>
                      <p className="font-semibold text-slate-900 capitalize">
                        {/* {lastRecorded.type === "timein"
                          ? "Time In"
                          : "Time Out"} */}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Time:</p>
                      <p className="font-semibold text-slate-900">
                        {/* {lastRecorded.time} */}
                      </p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-slate-600 mb-1">QR Data:</p>
                    <p className="font-mono text-sm text-slate-900 break-all bg-white p-2 rounded border">
                      {/* {lastRecorded.data} */}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {lastRecorded.status === "success" ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Recorded Successfully
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold text-rose-700 bg-rose-50 border border-rose-200">
                          <XCircle className="h-4 w-4 mr-1" />
                          Recording Failed
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setLastRecorded(null)}
                      className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-sm font-medium transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Scanner Container */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                    <Camera className="h-7 w-7 mr-3 text-blue-600" />
                    QR Code Scanner -{" "}
                    <span
                      className={`${
                        attendanceType === "timein"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      ({attendanceType === "timein" ? "Time In" : "Time Out"})
                    </span>
                  </h2>
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full bg-emerald-500`}
                    ></div>
                    <span className="text-sm font-medium text-slate-600">
                      Scanning...
                    </span>
                  </div>
                </div>

                <div className="relative bg-slate-900 rounded-2xl overflow-hidden">
                  <div id="qr-reader" className="w-full min-h-[400px]"></div>
                  <div className="absolute inset-0 pointer-events-none">
                    <div
                      className={`border-4  rounded-2xl m-8 animate-pulse shadow-2xl ${
                        attendanceType === "timein"
                          ? "border-green-400"
                          : "border-red-400"
                      }`}
                    >
                      {/* add notes */}
                    </div>
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

                              const findSamestudentIdAndDate =
                                allAttendance.some(
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
                                    section_id:
                                      findStudentByRollNumber?.section,
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

                {/* Instructions */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    Instructions
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start space-x-2">
                      <span className="text-indigo-600 font-semibold">1.</span>
                      <span>
                        Select either "Time In" or "Time Out" button above
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-indigo-600 font-semibold">2.</span>
                      <span>Ensure the camera has permission to access</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-indigo-600 font-semibold">3.</span>
                      <span>
                        Position the student's QR code within the scanner frame
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-indigo-600 font-semibold">4.</span>
                      <span>Hold steady until the code is recognized</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-indigo-600 font-semibold">5.</span>
                      <span>
                        Attendance will be automatically recorded based on your
                        selection
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-indigo-600 font-semibold">6.</span>
                      <span>
                        Review the recorded attendance above for confirmation
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuardScanner;
