/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { User, Mail, Lock, MoveLeft } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth";

// Define validation schema using Yup
const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Z'\s-]{2,50}$/,
      "Name must contain only letters, spaces, or hyphens."
    )
    .required("Full name is required."),
  email: yup
    .string()
    .email("Invalid email format.")
    .required("Email is required."),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters.")
    .matches(
      /^(?=.*[a-z])(?=.*\d).{6,}$/,
      "Password must include lowercase letters and numbers."
    )
    .required("Password is required."),
  role: yup.string().required("Role selection is required."),
});

function SignupForm({ accountType }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSignup = async (formData) => {
    try {
      const sanitizedData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        role: formData.role,
      };
      const response = await signup(sanitizedData);
      const result = await response.json();
      if (response.ok) {
        navigate("/login");
      } else {
        throw new Error(result.message || "Signup failed.");
      }
    } catch (error) {
      alert("Signup Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <Link to="/">
        <MoveLeft className="absolute top-5 left-4 text-gray-600 hover:shadow-lg hover:bg-white rounded-full p-1 transition duration-500 w-8 h-8" />
      </Link>
      <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900 mb-6">
          Create {accountType ? accountType : "Account"}
        </h2>

        <form onSubmit={handleSubmit(handleSignup)} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="flex items-center gap-2 text-blue-900 font-semibold">
              <User className="w-5 h-5" /> Full Name
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="Enter your full name"
              autoComplete="name"
              className={`w-full border rounded-md py-2 px-3 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-blue-900 font-semibold">
              <Mail className="w-5 h-5" /> Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              autoComplete="email"
              className={`w-full border rounded-md py-2 px-3 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="flex items-center gap-2 text-blue-900 font-semibold">
              <Lock className="w-5 h-5" /> Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter a secure password"
              autoComplete="new-password"
              className={`w-full border rounded-md py-2 px-3 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label className="flex items-center gap-2 text-blue-900 font-semibold">
              <User className="w-5 h-5" /> Role
            </label>
            <select
              {...register("role")}
              className={`w-full border rounded-md py-2 px-3 mt-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.role ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="role">Select a role</option>
              <option value="learner">Learner</option>
              <option value="tutor">Tutor</option>
              <option value="organization">Organization</option>
            </select>
            {errors.role && (
              <p className="text-red-600 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-2 px-6 rounded-md font-semibold hover:bg-blue-950 transition duration-300"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-blue-800">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-700 font-semibold hover:underline ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
