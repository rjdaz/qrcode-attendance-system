import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Reports from "./components/history/attendanceHistory";

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
        <Route path="/history" element={Reports}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
