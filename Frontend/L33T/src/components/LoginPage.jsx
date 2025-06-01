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
    e.preventDefault(); // Prevent form reload

    try {
      const response = await login(email, password); // Call API function with user input
      const role = localStorage.getItem("role");
      if (response) {
        setMessage("Login Successful!");
        localStorage.setItem("token", response.token); // Store token for authenticated requests
        localStorage.setItem("role", response.role);

        switch (role) {
          case "learner":
            navigate("/employer_dashboard");
            break;
          case "tutor":
            navigate("/employer_dashboard");
            break;

          case "organization":
            navigate("/learnerDashboard");
            break;

          default:
            navigate("/employer-dashboard"); //redirecting to ProfilePage
        }
      } else {
        setMessage("Login Failed. Invalid name or password.");
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#efefe6]">
      <Link to="/">
        <MoveLeft className="absolute top-5 left-4 hover:shadow-lg hover:bg-white transition duration-500 " />
      </Link>
      <div className="card bg-white shadow-lg p-6 w-96 rounded-lg">
        <h2 className="text-3xl font-bold text-center text-[#0B081D] mb-6">
          Login
        </h2>

        <form className="mt-4 flex flex-col gap-4" onSubmit={handleLogin}>
          {/* Email Field */}
          <label className="input validator flex items-center gap-2 mt-2 text-[#0B081D] font-semibold">
            <Mail className="w-5 h-5 text-[#365486]" />
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered border-b-2 border-gray-300 focus:border-[#365486] outline-none w-full"
            required
            pattern={emailPattern.source}
            title="Please enter a valid email address"
            onChange={(e) => setEmail(e.target.value)}
          />

          <div>
            {/* Password Field */}
            <label className="input validator flex items-center gap-2 mt-2 text-[#0B081D] font-semibold">
              <Lock className="w-5 h-5" />
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered border-b-2 border-gray-300 py-1 px-1 focus:border-[#0B081D] outline-none w-full"
              required
              minLength={6}
              pattern={passwordPattern.source}
              title="Must be at least 6 characters, include an uppercase letter, a lowercase letter, and a number"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link
              to="/passwordReset"
              className="flex items-center mt-1 font-thin px-1 text-[#0B081D] text-sm hover:underline"
            >
              forgot password
            </Link>
          </div>

          {/* Submit Button */}
          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="btn btn-primary font-bold px-6 py-1 bg-[#0B081D] text-white rounded-md hover:bg-[#000411] transition"
              
            >
              Login
            </button>
          </div>
        </form>

        <p className="text-center mb-2 text-red-400">{message}</p>
        <p className="mt-6 text-center text-[#0B081D]">
          New user?
          <Link to="/signup" className="text-[#365486] hover:underline ml-1">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
