import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/Login"
import Dashboard from "./components/dashboard/Dashboard"
function App() {

  const apiUrl = "http://localhost/qrcode-attendance-system/server/connection/api.php?action=";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login apiUrl={apiUrl} />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
