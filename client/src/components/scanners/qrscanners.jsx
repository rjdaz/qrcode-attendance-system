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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Scanner from "./scanner"; // <-- Import your scanner logic


const QRScanner = ({ subId, apiUrl }) => {
  const navigate = useNavigate();
  // Mock class data - replace with API call

  // Mock students data - replace with API call

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
                  QR Scanner - Introduction to Computer Science
                </h1>
              </div>
              <p className="text-slate-600">45 students • 38 present today</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
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
                  <div className="absolute top-1/2 w-full  left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {/* <div className="w-16 h-16 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center"> */}
                      {/* <QrCode className="h-8 w-8 text-blue-400" /> */}
                      <Scanner
                        onScanSuccess={(decodedText) => {
                          // handle the scanned result here
                          console.log("Scanned:", decodedText);
                        // You can add logic to update state, send to API, etc.
                        

                        }}
                      />
                    {/* </div> */}
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

            {/* Recent Scans */}
            {false && (
              <div className="mt-8 bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3" />
                  Recent Scans
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      id: "2023001",
                      name: "Juan Dela Cruz",
                      status: "present",
                      timeScanned: "09:15 AM",
                    },
                  ].map((scan, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-emerald-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">
                            Juan Dela Cruz
                          </p>
                          <p className="text-sm text-slate-600">ID: 2023001</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-emerald-600">
                          Present
                        </p>
                        <p className="text-xs text-slate-500">09:15 AM</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Manual Attendance */}
            {false && (
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                  <Users className="h-6 w-6 text-blue-600 mr-3" />
                  Manual Attendance Entry
                </h3>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by name or ID..."
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>

                <div className="max-h-64 overflow-y-auto space-y-3">
                  {[
                    {
                      id: "2023003",
                      name: "Pedro Garcia",
                      status: "absent",
                    },
                  ].map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-200"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">
                          Pedro Garcia
                        </p>
                        <p className="text-sm text-slate-600">ID: 2023003</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full border text-red-600 bg-red-50 border-red-200`}
                        >
                          absent
                        </span>
                        {false && (
                          <button className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-xs rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
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
                  <span className="font-bold text-slate-900">45</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-xl">
                  <span className="text-slate-600 font-medium">
                    Present Today:
                  </span>
                  <span className="font-bold text-emerald-600">38</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
                  <span className="text-slate-600 font-medium">
                    Absent Today:
                  </span>
                  <span className="font-bold text-red-600">7</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                  <span className="text-slate-600 font-medium">
                    Attendance Rate:
                  </span>
                  <span className="font-bold text-blue-600">84%</span>
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
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all duration-200 border border-slate-200 font-medium">
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
