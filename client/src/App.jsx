import { useState, useEffect } from "react";
import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import History from "./components/history/attendanceHistory";
import Reports from "./components/reports/reports";
import Attendance from "./components/attendance/attendancePerSubjects";
import Scanner from "./components/scanners/qrscanners";
import AdminDashboard from "./components/AdminDashboard/AdminLayout";
import GuardScanner from "./components/staff/studentLoginAndLogOut";
import BySectionAttendance from "./components/attendance/bySectionAttendance";
import { getFixedDate } from "./database/fix_date/fixDate.js";

//const apiUrl = import.meta.env.VITE_API_URL;
const apiUrl =
  "http://localhost/qrcode-attendance-system/server/connection/api.php?action=";

function App() {
  const [loginStatus, setLoginStatus] = useState(() => {
    return localStorage.getItem("loginStatus") === "true";
  });

  const [fixDate, setFixDate] = useState("");
  const [fixTime, setFixTime] = useState("");
  const [fixDay, setFixDay] = useState("");

  const [user, setUser] = useState(() => {
    // Only load user from localStorage if logged in
    if (localStorage.getItem("loginStatus") === "true") {
      return (
        JSON.parse(localStorage.getItem("user")) || {
          name: "",
          employeeNo: "",
          sectionId: "",
          userId: "",
          department: "",
          role: "",
        }
      );
    }
  });

  const [getSubjectId, setGetSubjectId] = useState(() => {
    return localStorage.getItem("getSubjectId") || "";
  });

  // Update localStorage whenever loginStatus or name changes
  useEffect(() => {
    localStorage.setItem("loginStatus", loginStatus);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("getSubjectId", getSubjectId);
  }, [loginStatus, user, getSubjectId]);

  useEffect(() => {
    // initial fetch
    getFixedDate(apiUrl, setFixDate, setFixTime, setFixDay);
  }, [apiUrl]);

  // Reset user data when logged out
  useEffect(() => {
    if (!loginStatus) {
      localStorage.removeItem("user");
      setUser({
        name: "",
        employeeNo: "",
        sectionId: "",
        userId: "",
        department: "",
        role: "",
      });
    }
  }, [loginStatus]);

  // hold routes by redirecting if not logged in
  const RequireAuth = ({ children }) => {
    return loginStatus ? children : <Navigate to="/login" />;
  };

  console.log(fixDate);
  console.log(fixTime);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={
            <Login
              apiUrl={apiUrl}
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              user={user}
              setUser={setUser}
            />
          }
        />
        <Route
          path="/adminDashboard"
          element={
            <RequireAuth>
              <AdminDashboard
                apiUrl={apiUrl}
                setLoginStatus={setLoginStatus}
                user={user}
                setUser={setUser}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard
                apiUrl={apiUrl}
                loginStatus={loginStatus}
                setLoginStatus={setLoginStatus}
                user={user}
                setUser={setUser}
                getSubjectId={getSubjectId}
                sectionId={user?.sectionId}
                setGetSubjectId={setGetSubjectId}
                fixDate={fixDate}
                fixTime={fixTime}
                fixDay={fixDay}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/history/:section_id?"
          element={
            <RequireAuth>
              <History apiUrl={apiUrl} user={user} setUser={setUser} />
            </RequireAuth>
          }
        />
        <Route />
        <Route
          path="/reports"
          element={
            <RequireAuth>
              <Reports />
            </RequireAuth>
          }
        />
        <Route
          path="/attendance/:getSubjectId?"
          element={
            <RequireAuth>
              <Attendance
                apiUrl={apiUrl}
                getSubjectId={getSubjectId}
                setGetSubjectId={setGetSubjectId}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/attendance/full/:section_id?"
          element={
            <RequireAuth>
              <BySectionAttendance
                apiUrl={apiUrl}
                user={user}
                fixDate={fixDate}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/scanner/:section_id?"
          element={
            <RequireAuth>
              <Scanner
                sectionId={user?.sectionId}
                apiUrl={apiUrl}
                userId={user?.userId}
                fixDate={fixDate}
                fixTime={fixTime}
                fixDay={fixDay}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/guard-scanner"
          element={
            <RequireAuth>
              <GuardScanner
                apiUrl={apiUrl}
                loginStatus={loginStatus}
                setLoginStatus={setLoginStatus}
                user={user}
                setUser={setUser}
                getSubjectId={getSubjectId}
                sectionId={user?.sectionId}
                setGetSubjectId={setGetSubjectId}
                fixDate={fixDate}
                fixTime={fixTime}
                fixDay={fixDay}
              />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
