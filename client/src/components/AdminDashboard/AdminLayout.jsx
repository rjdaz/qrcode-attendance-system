import {
  LayoutDashboard,
  Users,
  UserPlus,
  UserCheck,
  ClipboardList,
  BookOpen,
  CheckCircle,
  XCircle,
  AlertCircle,
  Bell,
  RefreshCw,
  FileText,
  Mail,
  Shield,
  ChevronRight,
  MoreHorizontal,
  Search,
  Download,
} from "lucide-react";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Top Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="w-full px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-lg">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Admin Dashboard
                </h1>
                <p className="text-slate-600">
                  Manage students, teachers, classes, attendance, and
                  notifications
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 w-72"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <Download className="h-4 w-4" />
                <span>Export Reports</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4">
              <div className="flex items-center space-x-2 mb-4">
                <LayoutDashboard className="h-5 w-5 text-indigo-600" />
                <span className="text-sm font-semibold text-slate-900">
                  Navigation
                </span>
              </div>
              <nav className="space-y-1">
                <a className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors group">
                  <span className="flex items-center space-x-2 text-slate-700 group-hover:text-slate-900">
                    <Users className="h-4 w-4 text-indigo-600" />
                    <span>Student Management</span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </a>
                <a className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors group">
                  <span className="flex items-center space-x-2 text-slate-700 group-hover:text-slate-900">
                    <UserPlus className="h-4 w-4 text-indigo-600" />
                    <span>Teacher Management</span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </a>
                <a className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors group">
                  <span className="flex items-center space-x-2 text-slate-700 group-hover:text-slate-900">
                    <BookOpen className="h-4 w-4 text-indigo-600" />
                    <span>Class Management</span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </a>
                <a className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors group">
                  <span className="flex items-center space-x-2 text-slate-700 group-hover:text-slate-900">
                    <ClipboardList className="h-4 w-4 text-indigo-600" />
                    <span>Attendance Monitoring</span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </a>
                <a className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors group">
                  <span className="flex items-center space-x-2 text-slate-700 group-hover:text-slate-900">
                    <Bell className="h-4 w-4 text-indigo-600" />
                    <span>Parent Notification Logs</span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </a>
                <a className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors group">
                  <span className="flex items-center space-x-2 text-slate-700 group-hover:text-slate-900">
                    <Shield className="h-4 w-4 text-indigo-600" />
                    <span>Staff Management</span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </a>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Total Students</p>
                    <p className="text-2xl font-bold text-slate-900">1,250</p>
                  </div>
                  <Users className="h-8 w-8 text-indigo-600" />
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">
                      Teachers Pending Approval
                    </p>
                    <p className="text-2xl font-bold text-slate-900">8</p>
                  </div>
                  <UserPlus className="h-8 w-8 text-amber-600" />
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Active Classes</p>
                    <p className="text-2xl font-bold text-slate-900">42</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-emerald-600" />
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">SMS Alerts Today</p>
                    <p className="text-2xl font-bold text-slate-900">312</p>
                  </div>
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Student Management */}
            <section className="bg-white rounded-2xl shadow-lg border border-slate-200">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-slate-900">
                    Student Management
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl text-sm font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all shadow">
                    Register New Student
                  </button>
                  <button className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50">
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <p className="text-sm text-slate-600">Active</p>
                    <p className="text-xl font-bold text-slate-900">1,180</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <p className="text-sm text-slate-600">Inactive</p>
                    <p className="text-xl font-bold text-slate-900">70</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <p className="text-sm text-slate-600">
                      With Attendance Issues
                    </p>
                    <p className="text-xl font-bold text-slate-900">24</p>
                  </div>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Student
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Section
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Guardian
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      <tr className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                          Juan Dela Cruz
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          Grade 10 - Ruby
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          0917 123 4567
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border text-emerald-600 bg-emerald-50 border-emerald-200">
                            <CheckCircle className="h-4 w-4" />
                            <span className="ml-1">Active</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-sm text-slate-600">
                  View attendance logs per student.
                </div>
              </div>
            </section>

            {/* Teacher Management */}
            <section className="bg-white rounded-2xl shadow-lg border border-slate-200">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <UserPlus className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-slate-900">
                    Teacher Management (Approval Flow)
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl text-sm font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all shadow">
                    Request New Teacher
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Teacher
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Subject
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      <tr className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                          Maria Santos
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          Mathematics
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border text-amber-700 bg-amber-50 border-amber-200">
                            <AlertCircle className="h-4 w-4" />
                            <span className="ml-1">Pending Approval</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-sm text-slate-600">
                  Requests and deactivations are subject to Super Admin
                  approval.
                </div>
              </div>
            </section>

            {/* Class Management */}
            <section className="bg-white rounded-2xl shadow-lg border border-slate-200">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-slate-900">
                    Class Management
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl text-sm font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all shadow">
                    Generate Class List
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <p className="text-sm text-slate-600">
                      Assign Students to Classes
                    </p>
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100">
                        Assign
                      </button>
                      <button className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100">
                        Bulk Assign
                      </button>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <p className="text-sm text-slate-600">
                      Assign Teachers to Classes (Requires Approval)
                    </p>
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100">
                        Request Assignment
                      </button>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Class
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Teacher
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Students
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      <tr className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                          Grade 10 - Ruby
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          Maria Santos
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          45
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Attendance Monitoring */}
            <section className="bg-white rounded-2xl shadow-lg border border-slate-200">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ClipboardList className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-slate-900">
                    Attendance Monitoring
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl text-sm font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow">
                    Generate Reports
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <p className="text-sm text-slate-600">Present Today</p>
                    <p className="text-xl font-bold text-slate-900">1,094</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <p className="text-sm text-slate-600">Late</p>
                    <p className="text-xl font-bold text-slate-900">82</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <p className="text-sm text-slate-600">Absent</p>
                    <p className="text-xl font-bold text-slate-900">74</p>
                  </div>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Entity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      <tr className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                          Juan Dela Cruz
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          Student
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border text-emerald-600 bg-emerald-50 border-emerald-200">
                            <CheckCircle className="h-4 w-4" />
                            <span className="ml-1">Present</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          08:12 AM
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <p className="text-sm font-semibold text-slate-900">
                      Report Types
                    </p>
                    <ul className="mt-2 text-sm text-slate-600 list-disc list-inside space-y-1">
                      <li>Per Class</li>
                      <li>Per Student</li>
                      <li>Daily / Weekly / Monthly</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <p className="text-sm font-semibold text-slate-900">
                      Monitoring
                    </p>
                    <ul className="mt-2 text-sm text-slate-600 list-disc list-inside space-y-1">
                      <li>Late Records</li>
                      <li>Absent Records</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Parent Notification Logs */}
            <section className="bg-white rounded-2xl shadow-lg border border-slate-200">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-slate-900">
                    Parent Notification Logs
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl text-sm font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all shadow">
                    Re-send Failed SMS
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Parent
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Student
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Timestamp
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      <tr className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                          0917 987 6543
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          Juan Dela Cruz
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border text-rose-700 bg-rose-50 border-rose-200">
                            <XCircle className="h-4 w-4" />
                            <span className="ml-1">Failed</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          09:15 AM
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Staff Management */}
            <section className="bg-white rounded-2xl shadow-lg border border-slate-200">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-slate-900">
                    Staff Management
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl text-sm font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all shadow">
                    Register Staff
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      <tr className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                          Pedro Reyes
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          Security
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border text-emerald-600 bg-emerald-50 border-emerald-200">
                            <CheckCircle className="h-4 w-4" />
                            <span className="ml-1">Active</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-sm text-slate-600">
                  View attendance logs of staff.
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
