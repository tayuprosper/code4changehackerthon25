/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { collectSignupInfo } from "../api/auth"
import { Mail, Lock, User } from "lucide-react";

// Define Yup validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function SignupForm() {
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

//   const onSubmit = async (data) => {
//     setErrorMessage("");
//     setSuccessMessage("");
//     setLoading(true);

//     try {
//       const response = await fetch("https://your-fastapi-backend.com/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       const result = await response.json();

//       if (!response.ok)
//         throw new Error(result.detail || "Signup failed. Try again.");
//       setSuccessMessage("Signup successful! You can now log in.");
//     } catch (error) {
//       setErrorMessage(error.message);
//     } finally {
//       setLoading(false);
//     }
    //   };
    
    const handleSignup = (formData) => {
      collectSignupInfo(formData); // Just collects info, no DB submission
        setSuccessMessage("signup info collected. No database subission yet.");
    };


  return (
    <div className="flex flex-col items-center bg-[#F2F8F4] p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-[#0B081D] mb-4">
        Create an Account
      </h2>


      <form onSubmit={handleSubmit(handleSignup)} className="w-full">
        
        <div className="mb-4 flex items-center bg-white rounded-lg border border-[#0B081D] px-3 py-2">
        {/* Name Input */}
          <User className="text-[#0B081D] mr-2" />
          <input
            type="text"
            placeholder="Your Name"
            {...register("name")}
            className="w-full outline-none text-[#0B081D]"
          />
        </div>
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        {/* Email Input */}
        <div className="mb-4 flex items-center bg-white rounded-lg border border-[#0B081D] px-3 py-2">
          <Mail className="text-[#0B081D] mr-2" />
          <input
            type="email"
            placeholder="Your Email"
            {...register("email")}
            className="w-full outline-none text-[#0B081D]"
          />
        </div>
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        {/* Password Input */}
        <div className="mb-4 flex items-center bg-white rounded-lg border border-[#0B081D] px-3 py-2">
          <Lock className="text-[#0B081D] mr-2" />
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full outline-none text-[#0B081D]"
            />
        </div>
        {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
        )}

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#0B081D] hover:bg-[#000411] text-[#F2F8F4] py-2 rounded-lg transition"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
