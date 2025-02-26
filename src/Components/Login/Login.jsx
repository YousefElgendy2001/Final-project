import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { HashLoader } from "react-spinners";
import * as Yup from "yup";
import { tokenContext } from "../../Context/TokenContext/TokenContext";
export default function Login() {
  const [isCallApi, setIsCallApi] = useState(false);
  const [apiErorr, setApiErorr] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(null);
  let {setToken} =useContext(tokenContext)

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
      setApiErorr(null);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );

      console.log(data);
      localStorage.setItem("userToken",data.token)
      setIsCallApi(false);
      setApiSuccess("Registration Successful!");
      
      console.log(data.token);
      
      
      setToken(data.token)
      console.log(data.token);
      console.log(setToken);
      
      navigate('/home');
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
        onSubmit={loginForm.handleSubmit}
        className="w-1/2 my-6 mx-auto  "
      >
        <h1 className="text-3xl mb-4"> Now :</h1>
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

        

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            onBlur={loginForm.handleBlur}
            value={loginForm.values.email}
            onChange={loginForm.handleChange}
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
          {loginForm.errors.email && loginForm.touched.email ? (
            <div
              className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {loginForm.errors.email}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            onBlur={loginForm.handleBlur}
            value={loginForm.values.password}
            onChange={loginForm.handleChange}
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
          {loginForm.errors.password && loginForm.touched.password ? (
            <div
              className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {loginForm.errors.password}
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
      </form>
    </>
  );
}
