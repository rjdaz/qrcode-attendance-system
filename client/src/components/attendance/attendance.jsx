import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';

const AttendanceTable = () => {
  // Mock class data - replace with API call
  
  // Mock students data - replace with API call
  
  // Filter and sort students
  const filteredStudents = [];

  // Pagination
  const totalPages = 1;
  const startIndex = 0;
  const endIndex = 0;
  const currentStudents = [];

  const exportToCSV = () => {
    // Placeholder for export logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="w-full px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button
                
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-3 py-2 rounded-lg transition-all duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </button>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900">
                Attendance - Class Name
              </h1>
              <p className="text-slate-600">
                45 students • 38 present • 5 absent • 2 late
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Download className="h-4 w-4" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, ID, or email..."
                  
                  className="pl-10 pr-4 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 w-full sm:w-64"
                />
              </div>
              <select
                
                className="px-4 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="all">All Status</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600">
                12 of 12 students
              </span>
              <button
                
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                    
                  >
                    <div className="flex items-center space-x-1">
                      <span>Student ID</span>
                      <span className="text-blue-600">↑</span>
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                    
                  >
                    <div className="flex items-center space-x-1">
                      <span>Name</span>
                      <span className="text-blue-600">↑</span>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                    
                  >
                    <div className="flex items-center space-x-1">
                      <span>Status</span>
                      <span className="text-blue-600">↑</span>
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                    
                  >
                    <div className="flex items-center space-x-1">
                      <span>Time Scanned</span>
                      <span className="text-blue-600">↑</span>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {[{
                  id: '2023001',
                  name: 'Juan Dela Cruz',
                  status: 'present',
                  timeScanned: '09:15 AM',
                  email: 'juan.delacruz@email.com'
                }].map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                      2023001
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      Juan Dela Cruz
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      juan.delacruz@email.com
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border text-emerald-600 bg-emerald-50 border-emerald-200`}>
                        <CheckCircle className="h-4 w-4" />
                        <span className="ml-1 capitalize">Present</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      09:15 AM
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      <button className="text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {false && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-slate-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  
                  disabled={true}
                  className="relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Previous
                </button>
                <button
                  
                  disabled={true}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-slate-700">
                    Showing <span className="font-medium">1</span> to{' '}
                    <span className="font-medium">10</span> of{' '}
                    <span className="font-medium">12</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px">
                    <button
                      
                      disabled={true}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-lg border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    {false && Array.from({ length: 1 }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-all duration-200 ${false
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-slate-300 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      
                      disabled={true}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-lg border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>

        {false && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No students found</h3>
            <p className="text-slate-600">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceTable;