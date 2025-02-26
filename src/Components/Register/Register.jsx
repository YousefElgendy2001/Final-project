import React, { useState } from "react";

import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [isCallApi, setIsCallApi] = useState(false);
  const [apiErorr, setApiErorr] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(null);

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
      .min(3, "min length is 3")
      .max(15, "max length is 15")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .matches(new RegExp("^[A-Z][a-z0-9]{6,12}$"), "Invalid password")
      .required("Required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "rePassword not match password")
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
      setApiErorr(null);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );

      console.log(data);
      setIsCallApi(false);
      setApiSuccess("Registration Successful!");
      navigate('/login');
    } catch (error) {
      setApiErorr(error.response.data.message);
      console.log(error.response.data.message);
      setApiSuccess(null);

      setIsCallApi(false);
    }
  }

  return (
    <>
      <form
        onSubmit={registerForm.handleSubmit}
        className="w-1/2 my-6 mx-auto "
      >
       <div className="div">
       <h1 className="text-3xl mb-4">Register Now :</h1>


{
  apiErorr && <div
  className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
  role="alert"
>
  {apiErorr}
</div>
}
{
  apiSuccess && <div
  className="p-2  mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
  role="alert"
>
  {apiSuccess}
</div>
}
{
  // loading && 
}
{
  // !loading && !error && data.map() 
}
     

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="name"
            onBlur={registerForm.handleBlur}
            value={registerForm.values.name}
            onChange={registerForm.handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
          {registerForm.errors.name && registerForm.touched.name ? (
            <div
              class="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {registerForm.errors.name}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            onBlur={registerForm.handleBlur}
            value={registerForm.values.email}
            onChange={registerForm.handleChange}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {registerForm.errors.email && registerForm.touched.email ? (
            <div
              className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {registerForm.errors.email}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            onBlur={registerForm.handleBlur}
            value={registerForm.values.password}
            onChange={registerForm.handleChange}
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {registerForm.errors.password && registerForm.touched.password ? (
            <div
              className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {registerForm.errors.password}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="rePassword"
            onBlur={registerForm.handleBlur}
            value={registerForm.values.rePassword}
            onChange={registerForm.handleChange}
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
            placeholder=" "
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm Password
          </label>

          {registerForm.errors.rePassword && registerForm.touched.rePassword ? (
            <div
              className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {registerForm.errors.rePassword}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            onBlur={registerForm.handleBlur}
            value={registerForm.values.phone}
            onChange={registerForm.handleChange}
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            User Phone
          </label>

          {registerForm.errors.phone && registerForm.touched.phone ? (
            <div
              className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {registerForm.errors.phone}
            </div>
          ) : (
            ""
          )}
        </div>
        {isCallApi ? (
          <div className=" w-auto flex justify-end">
            <div className=" p-2 rounded-md">
              <HashLoader color="#00ff72" size={60} />
            </div>
          </div>
        ) : (
          <button
            type="submit"
            className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm w-full ml-auto block sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main"
          >
            Submit
          </button>
        )}
       </div>
      </form>
    </>
  );
}
