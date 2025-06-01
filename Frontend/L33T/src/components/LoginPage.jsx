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
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (
      !emailPattern.test(trimmedEmail) ||
      !passwordPattern.test(trimmedPassword)
    ) {
      setMessage("Invalid email or password format.");
      return;
    }

    try {
      const response = await login(trimmedEmail, trimmedPassword);
      if (response?.access_token) {
        // Ideally, secure this token with httpOnly cookie in backend
        // localStorage.setItem("token", response.access_token);
        setMessage("");
        navigate("/dashboard");
      } else {
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#efefe6] flex items-center justify-center px-4 py-10">
      {/* Back button */}
      <Link to="/" className="absolute top-4 left-4">
        <MoveLeft className="text-[#0B081D] w-6 h-6 hover:bg-white hover:shadow-md p-1 rounded-full transition" />
      </Link>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-[#0B081D] mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-[#0B081D] font-medium mb-1 text-sm sm:text-base">
              <Mail className="w-5 h-5 text-[#365486]" />
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              pattern={emailPattern.source}
              title="Enter a valid email address"
              className="w-full border-b-2 border-gray-300 focus:border-[#365486] text-[#0B081D] bg-transparent placeholder:text-gray-400 py-2 px-1 outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="flex items-center gap-2 text-[#0B081D] font-medium mb-1 text-sm sm:text-base">
              <Lock className="w-5 h-5 text-[#0B081D]" />
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="current-password"
              pattern={passwordPattern.source}
              title="At least 6 characters with lowercase letters and numbers"
              className="w-full border-b-2 border-gray-300 focus:border-[#365486] text-[#0B081D] bg-transparent placeholder:text-gray-400 py-2 px-1 outline-none transition"
            />
            <div className="text-right mt-1">
              <Link
                to="/passwordReset"
                className="text-xs text-[#365486] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-[#0B081D] hover:bg-[#000411] text-white font-bold py-2 rounded-lg transition"
            >
              Log In
            </button>
          </div>
        </form>

        {/* Error/Success Message */}
        {message && (
          <p className="text-sm text-center text-red-500 mt-4">{message}</p>
        )}

        {/* Sign Up Prompt */}
        <p className="text-center text-sm mt-6 text-[#0B081D]">
          Don’t have an account?
          <Link
            to="/signup"
            className="ml-1 text-[#365486] font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
