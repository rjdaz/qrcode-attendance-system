import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import History from "./components/history/attendanceHistory";
import Reports from "./components/reports/reports";
import Attendance from "./components/attendance/attendance";
import Scanner from "./components/scanners/qrscanners";

const apiUrl =
  "http://localhost/qrcode-attendance-system/server/connection/api.php?action=";

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  
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
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
            />
          }
        />
        <Route path="/history" element={<History/>}/>
        <Route path="/reports" element={<Reports/>}/>
        <Route path="/attendance" element={<Attendance/>}/>
        <Route path="/scanner" element={<Scanner/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
