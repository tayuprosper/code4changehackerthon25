import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { Mail, Lock, MoveLeft } from "lucide-react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*\d).{6,}$/;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, password); // Call API function with user input
      const role = localStorage.getItem("role");
      if (response) {
        setMessage("Login Successful!");
        navigate("/dashboard");
      } else {
        setMessage("Login Failed. Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-50">
      <Link to="/">
        <MoveLeft className="absolute top-5 left-4 text-blue-600 hover:bg-blue-50 p-2 rounded-full transition duration-300" size={32} />
      </Link>
      <div className="card bg-white shadow-md p-8 w-96 rounded-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Login
        </h2>

        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-gray-700 font-medium">
              <Mail className="w-5 h-5 text-blue-600" />
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition"
              required
              pattern={emailPattern.source}
              title="Please enter a valid email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-gray-700 font-medium">
              <Lock className="w-5 h-5 text-blue-600" />
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-2 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition"
              required
              minLength={6}
              autoComplete="current-password"
              pattern={passwordPattern.source}
              title="Must be at least 6 characters with at least one letter and one number"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link
              to="/passwordReset"
              className="block text-right text-sm text-blue-600 hover:underline mt-1"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition mt-4"
          >
            Login
          </button>
        </form>

        {message && (
          <p className={`text-center mt-4 ${message.includes("Successful") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-gray-600">
          New user?{" "}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;