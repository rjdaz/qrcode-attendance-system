import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Lock, Building2 } from "lucide-react";
import axios from "axios";
import { getUserData } from "../../database/user/user_database";

const Login = ({ apiUrl, loginStatus, setLoginStatus, user, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [remMeError, setRemMeError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [usersData, setUsersData] = useState([]);

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    getUserData(apiUrl, setUsersData);
  },[])

  console.log(apiUrl);
  console.log(user?.name);
  console.log(user?.department);
  console.log(user?.role);
  console.log(user?.userId);
  console.log(usersData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // if (!rememberMe) {
    //   setRemMeError(true);

    //   setTimeout(() => {
    //     setRemMeError(false);
    //     setIsSubmitting(false);
    //   }, 2000);
    //   return;
    // }

    try {
      const url = `${apiUrl}login`;
      const response = await axios.post(url, { username, password });
      console.log("Response data:", response.data);

      if (response.data.success) {
        // Handle successful login
        setLoginStatus(true);
        setUser((prev) => ({
          ...prev,
          name: response.data.name,
          employeeNo: response.data.employeeNo,
          sectionId: response.data.sectionId,
          userId: response.data.userId,
          department: response.data.department,
          role: response.data.role,
        }));

        // conditional navigation based on role and department
        if (response.data.department === 1) {
          // Superadmin
          navigate("/history"); // temporary redirect to admin dashboard
        } else if (response.data.department === 2) {
          // Admin
          navigate("/adminDashboard"); // temporary redirect to admin dashboard
        } else {
          // Teacher
          navigate("/dashboard"); // temporary redirect to dashboard
        }
      } else {
        // Handle login error
        alert(response.data.error);
        console.log("Login failed:", response.data.error);

        setErrors((prevErrors) => ({
          ...prevErrors,
          username: response.data.errorUname || "",
          password: response.data.error || "",
        }));
      }
    } catch (error) {
      console.error("Login error:", error);
      console.log("Error response:", error.response);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
            <Building2 className="h-10 w-10 text-white" />
          </div>
          <h2 className="mt-8 text-3xl font-bold text-slate-900">
            Cabangan HS Faculty Portal
          </h2>
          <p className="mt-3 text-slate-600 text-lg">
            Sign in to access the QR Attendance System
          </p>
          <div className="mt-2 pt-0.5 w-30 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full">
            {/* error username */}
            {errors.username && (
              <p className="mt-2 text-sm text-red-600">{errors.username}</p>
            )}
            {/* error password */}
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`block w-full pl-12 pr-4 py-3 border-2 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200  ${
                    errors.username
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full pl-12 pr-12 py-3 border-2 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                    errors.password
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className={`h-4 w-4 focus:ring-blue-500 border-slate-300 rounded`}
                />
                <label
                  htmlFor="remember-me"
                  className={`ml-2 block text-sm  ${
                    remMeError ? "text-red-600" : "text-slate-700"
                  }`}
                >
                  Remember me
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign in to Portal"
                )}
              </button>
            </div>
          </form>
          <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-800 text-center">
              <span className="font-semibold">Demo Credentials:</span>
              <br />
              Username: faculty
              <br />
              Password: password123
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-slate-500">
            © 2024 QR Attendance System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
