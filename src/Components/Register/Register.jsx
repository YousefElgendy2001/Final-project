import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { HashLoader } from "react-spinners";
import * as Yup from "yup";
import { tokenContext } from "../../Context/TokenContext/TokenContext";
import { Eye, EyeOff } from "lucide-react";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";

export default function Register() {
  const [isCallApi, setIsCallApi] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { setToken } = useContext(tokenContext);
  const { darkMode } = useContext(ThemeContext);
  let navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Min length is 3")
      .max(15, "Max length is 15")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .matches(new RegExp("^[A-Z][a-z0-9]{6,12}$"), "Invalid password")
      .required("Required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Required"),
    phone: Yup.string()
      .matches(new RegExp("^01[0125][0-9]{8}$"), "Invalid Phone")
      .required("Required"),
  });

  const registerForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit: callRegister,
  });

  async function callRegister(values) {
    try {
      setIsCallApi(true);
      setApiError(null);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      setIsCallApi(false);
      setApiSuccess("Registration Successful!");
      navigate("/login");
    } catch (error) {
      setApiError(error.response?.data?.message || "An error occurred");
      setApiSuccess(null);
      setIsCallApi(false);
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>      
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-main">
          Create Your Account 🚀
        </h1>

        {apiError && <div className="p-2 mb-4 text-sm text-red-800 bg-red-50 dark:bg-gray-700 dark:text-red-400 rounded-lg">{apiError}</div>}
        {apiSuccess && <div className="p-2 mb-4 text-sm text-main bg-green-50 dark:bg-gray-700 dark:text-main rounded-lg">{apiSuccess}</div>}

        <form onSubmit={registerForm.handleSubmit}>

            {/* Name Field */}

          <div className="mb-4">
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              onBlur={registerForm.handleBlur}
              value={registerForm.values.name}
              onChange={registerForm.handleChange}
              className="w-full px-4 py-3 mt-1 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-main"
              placeholder="Enter your name"
            />
            {registerForm.errors.name && registerForm.touched.name && <div className="text-red-500 text-sm mt-1">{registerForm.errors.name}</div>}
          </div>
            {/* Email Field */}

          <div className="mb-4">
            <label className="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              onBlur={registerForm.handleBlur}
              value={registerForm.values.email}
              onChange={registerForm.handleChange}
              className="w-full px-4 py-3 mt-1 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-main"
              placeholder="Enter your email"
            />
            {registerForm.errors.email && registerForm.touched.email && <div className="text-red-500 text-sm mt-1">{registerForm.errors.email}</div>}
          </div>
         {/* Password Field */}


          <div className="mb-4 relative">
            <label className="block text-sm font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onBlur={registerForm.handleBlur}
              value={registerForm.values.password}
              onChange={registerForm.handleChange}
              className="w-full px-4 py-3 mt-1 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-main"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-12 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {registerForm.errors.password && registerForm.touched.password && <div className="text-red-500 text-sm mt-1">{registerForm.errors.password}</div>}
          </div>


           {/* Re-Password Field */}
           <div className="mb-4">
            <label className="block text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              name="rePassword"
              onBlur={registerForm.handleBlur}
              value={registerForm.values.rePassword}
              onChange={registerForm.handleChange}
              className="w-full px-4 py-3 mt-1 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-main"
              placeholder="Re-enter your password"
            />
            {registerForm.errors.rePassword && registerForm.touched.rePassword && (
              <div className="text-red-500 text-sm mt-1">
                {registerForm.errors.rePassword}
              </div>
            )}
          </div>
            {/* Phone Field */}
            <div className="mb-4">
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              onBlur={registerForm.handleBlur}
              value={registerForm.values.phone}
              onChange={registerForm.handleChange}
              className="w-full px-4 py-3 mt-1 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-main"
              placeholder="Enter your phone number"
            />
            {registerForm.errors.phone && registerForm.touched.phone && (
              <div className="text-red-500 text-sm mt-1">
                {registerForm.errors.phone}
              </div>
            )}
          </div>

  {/*  Submit Button  */}
          <button
            type="submit"
            className="w-full py-3 bg-main dark:bg-main hover:bg-green-600 text-white font-semibold rounded-lg transition duration-200"
          >
            {isCallApi ? <HashLoader color="#fff" size={20} /> : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
