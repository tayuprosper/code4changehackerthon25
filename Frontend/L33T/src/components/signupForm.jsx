/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { User, Mail, Lock, MoveLeft } from "lucide-react";
import { signup } from "../api/auth"; // Import API functions

// ✅ Define validation schema using Yup
const schema = yup.object().shape({
  fullname: yup
    .string()
    .matches(
      /^[a-zA-Z'\s\-]{2,50}$/,
      "Name must contain only letters, spaces, or hyphens."
    )
    .required("Full name is required."),
  email: yup
    .string()
    .email("Invalid email format.")
    .required("Email is required."),
  password: yup
    .string()
    .min(
      6,
      "Password must be at least 6 characters and include lowercase and a number."
    )
    .matches(
      /^(?=.*[a-z])(?=.*\d).{6,}$/,
      "Password must include lowercase letters and numbers."
    )
    .required("Password is required."),
  role: yup.string().required("Role selection is required."),
});

function SignupForm({ accountType }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Remove e.preventDefault() because react-hook-form already prevents default behavior
  const handleSignup = async (formData) => {
    try {
      console.log("Submitting form data:", formData); // Debugging log
      const response = await signup(formData);
      console.log("Signup response:", response); // Debugging log
      alert(response ? "Signup Successful!" : "Signup Failed.");
    } catch (error) {
      alert("Signup Error: " + error.message);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#efefe6]">
      <Link to="/">
        <MoveLeft className="absolute top-5 left-4 hover:shadow-lg hover:bg-white transition duration-500 " />
      </Link>
      <div className="card bg-white shadow-lg p-8 w-96 rounded-lg">
        <h2 className="text-3xl font-bold text-center text-[#0B081D] mb-6">
          Create {accountType ? accountType : "Account"}
        </h2>

        {/* ✅ Fix `onSubmit` to correctly pass form data */}
        <form onSubmit={handleSubmit(handleSignup)} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="flex items-center gap-2 text-[#0B081D] font-semibold">
              <User className="w-5 h-5" /> Full Name
            </label>
            <input
              type="text"
              {...register("fullname")}
              placeholder="Enter your full name"
              className={`w-full border-b-2 py-1 px-1 outline-none ${
                errors.fullname
                  ? "border-red-500"
                  : "border-gray-300 focus:border-[#0B081D]"
              }`}
            />
            {errors.fullname && (
              <p className="text-red-600 text-sm mt-1">
                {errors.fullname.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-[#0B081D] font-semibold">
              <Mail className="w-5 h-5" /> Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className={`w-full border-b-2 py-1 px-1 outline-none ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus:border-[#0B081D]"
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
            <label className="flex items-center gap-2 text-[#0B081D] font-semibold">
              <Lock className="w-5 h-5" /> Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter a secure password"
              className={`w-full border-b-2 py-1 px-1 outline-none ${
                errors.password
                  ? "border-red-500"
                  : "border-gray-300 focus:border-[#0B081D]"
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
            <label className="flex items-center gap-2 text-[#0B081D] font-semibold">
              <User className="w-5 h-5" /> Role
            </label>
            <select
              {...register("role")}
              className={`w-full border-b-2 py-1 px-1 outline-none ${
                errors.role
                  ? "border-red-500"
                  : "border-gray-300 focus:border-[#0B081D]"
              }`}
            >
              <option value="">Select a role</option>
              <option value="Tutor">Tutor</option>
              <option value="Learner">Learner</option>
              <option value="Organization">Organization</option>
            </select>
            {errors.role && (
              <p className="text-red-600 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-primary px-6 py-1 font-bold bg-[#0B081D] text-white rounded-sm hover:bg-[#000411] transition"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-[#0B081D]">
          Already have an account?
          <Link to="/login" className="text-[#1E40AF] hover:underline ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
