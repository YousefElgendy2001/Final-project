import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { HashLoader } from "react-spinners";
import * as Yup from "yup";
import { tokenContext } from "../../Context/TokenContext/TokenContext";
import { Eye, EyeOff } from "lucide-react";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";

export default function Login() {
  const [isCallApi, setIsCallApi] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { setToken } = useContext(tokenContext);
  const { darkMode } = useContext(ThemeContext);
  let navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .matches(new RegExp("^[A-Z][a-z0-9]{6,12}$"), "Invalid password")
      .required("Required"),
  });

  const loginForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit: callLogin,
  });

  async function callLogin(values) {
    try {
      setIsCallApi(true);
      setApiError(null);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );

      localStorage.setItem("userToken", data.token);
      setToken(data.token);
      setIsCallApi(false);
      setApiSuccess("Login Successful!");
      navigate("/home");
    } catch (error) {
      setApiError(error.response.data.message);
      setApiSuccess(null);
      setIsCallApi(false);
    }
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-main">
          Welcome Back 👋
        </h1>

        {apiError && (
          <div className="p-2 mb-4 text-sm text-red-800 bg-red-50 dark:bg-gray-700 dark:text-red-400 rounded-lg">
            {apiError}
          </div>
        )}
        {apiSuccess && (
          <div className="p-2 mb-4 text-sm text-main bg-green-50 dark:bg-gray-700 dark:text-main rounded-lg">
            {apiSuccess}
          </div>
        )}

        <form onSubmit={loginForm.handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              onBlur={loginForm.handleBlur}
              value={loginForm.values.email}
              onChange={loginForm.handleChange}
              className="w-full px-4 py-3 mt-1 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-main"
              placeholder="Enter your email"
            />
            {loginForm.errors.email && loginForm.touched.email && (
              <div className="text-red-500 text-sm mt-1">
                {loginForm.errors.email}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4 relative">
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onBlur={loginForm.handleBlur}
                value={loginForm.values.password}
                onChange={loginForm.handleChange}
                className="w-full px-4 py-3 mt-1 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-main"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {loginForm.errors.password && loginForm.touched.password && (
              <div className="text-red-500 text-sm mt-1">
                {loginForm.errors.password}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-main dark:bg-main hover:bg-main dark:hover:bg-main text-white font-semibold rounded-lg transition duration-200"
          >
            {isCallApi ? <HashLoader color="#fff" size={20} /> : "Login"}
          </button>

          {/* Footer */}
          <p className="mt-4 text-sm text-center">
            Don't have an account?{" "}
            <a href="/register" className="text-main dark:text-main font-medium">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
