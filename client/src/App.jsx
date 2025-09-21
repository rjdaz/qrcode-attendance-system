import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import History from "./components/history/attendanceHistory";
import Reports from "./components/reports/reports";
import Attendance from "./components/attendance/attendance";
import Scanner from "./components/scanners/qrscanners";

const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  const [loginStatus, setLoginStatus] = useState(() => {
    return localStorage.getItem("loginStatus") === "true";
  });
  const [name, setName] = useState(() => localStorage.getItem("name") || "");
  const [employeeNo, setEmployeeNo] = useState(() => localStorage.getItem("employeeNo") || "");

  // Update localStorage whenever loginStatus or name changes
  useEffect(() => {
    localStorage.setItem("loginStatus", loginStatus);
    localStorage.setItem("name", name);
    localStorage.setItem("employeeNo", employeeNo);
  }, [loginStatus, name, employeeNo]);

  // hold routes by redirecting if not logged in
  const RequireAuth = ({ children }) => {
    return loginStatus ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={
            <Login
              apiUrl={apiUrl}
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              name={name}
              setName={setName}
              setEmployeeNo={setEmployeeNo}
            />
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
                name={name}
                setName={setName}
                employeeNo={employeeNo}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/history"
          element={
            <RequireAuth>
              <History />
            </RequireAuth>
          }
        />
        <Route
          path="/reports"
          element={
            <RequireAuth>
              <Reports />
            </RequireAuth>
          }
        />
        <Route
          path="/attendance"
          element={
            <RequireAuth>
              <Attendance />
            </RequireAuth>
          }
        />
        <Route
          path="/scanner"
          element={
            <RequireAuth>
              <Scanner />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
