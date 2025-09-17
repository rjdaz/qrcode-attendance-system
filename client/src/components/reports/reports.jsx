import { 
  ArrowLeft, 
  Download, 
  Calendar,
  Users,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react';

const Reports = () => {
  // Mock classes data - replace with API call
  
  // Mock weekly attendance data - replace with API call
  
  // Mock monthly data - replace with API call
  
  // Mock attendance distribution data - replace with API call
  
  // Mock class comparison data - replace with API call
  
  // Summary statistics
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </button>
            </div>
            <div className="text-center">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Reports & Analytics
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Comprehensive attendance insights and trends
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Export CSV</span>
              </button>
              <button
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <select
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <select
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Classes</option>
                <option value="1">Introduction to Computer Science</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Last updated: Jan 15, 2024
              </span>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Students</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">105</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Attendance</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">87%</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Classes</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Improvement</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">+5.2%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Attendance Trend */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Weekly Attendance Trend
              </h3>
            </div>
            <div style={{ width: '100%', height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#374151', borderRadius: '8px' }}>
              <p className="text-gray-400">[Bar Chart Placeholder]</p>
            </div>
          </div>

          {/* Attendance Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <PieChartIcon className="h-5 w-5 mr-2" />
                Attendance Distribution
              </h3>
            </div>
            <div style={{ width: '100%', height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#374151', borderRadius: '8px' }}>
              <p className="text-gray-400">[Pie Chart Placeholder]</p>
            </div>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Monthly Attendance Trend
            </h3>
          </div>
          <div style={{ width: '100%', height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#374151', borderRadius: '8px' }}>
            <p className="text-gray-400">[Area Chart Placeholder]</p>
          </div>
        </div>

        {/* Class Comparison */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Class Attendance Comparison
            </h3>
          </div>
          <div style={{ width: '100%', height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#374151', borderRadius: '8px' }}>
            <p className="text-gray-400">[Bar Chart Placeholder]</p>
          </div>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Insights</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  CS301 has the highest attendance rate at 89%
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Wednesday shows the lowest attendance (82%)
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Overall improvement of 5.2% this month
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recommendations</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Focus on improving Wednesday attendance through better scheduling
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Consider implementing attendance incentives for consistent performance
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  CS101 could benefit from the strategies used in CS301
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;