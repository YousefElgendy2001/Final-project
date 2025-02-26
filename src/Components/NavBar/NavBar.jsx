import React, { useState, useEffect, useContext } from "react";
import styles from "./NavBar.module.css";
import { Link, NavLink, useNavigate, } from "react-router-dom";
import Logo from "../../assets/images/freshcart-logo.svg";
import { tokenContext } from "../../Context/TokenContext/TokenContext";
export default function NavBar() {
  const [NavBar, setNavBar] = useState();

  let {token,setToken} = useContext(tokenContext)
let navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("userToken")
setToken(null)
navigate('/login');
    
  }
  return (
    <div>
           <nav className="bg-[rgb(242,242,242)]  border-gray-200 dark:bg-gray-900 mb-5">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center gap-4">
            <Link className="flex items-center space-x-3 rtl:space-x-reverse me-16">
              <img src={Logo} width={"200px"} alt="FreshCart" />
            </Link>
            <div
              className="hidden w-full md:block md:w-auto absolute md:relative top-[40px] left-0 md:top-0"
              id="navbar-default"
            >


{token? <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-[rgb(242,242,242)] dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink
                    to={""}
                    className="block py-2 px-3 rounded  md:p-0 dark:text-white md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"cart"}
                    className="block py-2 px-3 text-gray-900 rounded   md:border-0  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    v
                    to={"products"}
                    className="block py-2 px-3 text-gray-900 rounded   md:border-0   dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"categories"}
                    className="block py-2 px-3 text-gray-900 rounded   md:border-0   dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"brands"}
                    className="block py-2 px-3 text-gray-900 rounded   md:border-0   dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Brands
                  </NavLink>
                </li>
                
              </ul>:" "}

             
            </div>
          </div>

          <div className="flex items-center gap-4">
          {token? <ul className=" flex items-center gap-4 me-16">

              
<li>
  <Link>
   
    <i className="fa-brands fa-instagram hover:text-main"></i>
  </Link>
</li>
<li>
  <Link>
   
    <i className="fa-brands fa-facebook hover:text-main"></i>
  </Link>
</li>
<li>
  <Link>
  
    <i className="fa-brands fa-tiktok hover:text-main"></i>
  </Link>
</li>
<li>
  <Link>
    
    <i className="fa-brands fa-twitter hover:text-main"></i>
  </Link>
</li>
<li>
  <Link>
    
    <i className="fa-brands fa-linkedin hover:text-main"></i>
  </Link>
</li>
<li>
  <Link>
    
    <i className="fa-brands fa-youtube hover:text-main"></i>
  </Link>
</li>
</ul>:""}
           

            
            <ul className="flex items-center gap-4 md:my-4  ">
              {token?  <li>
                <span className="cursor-pointer hover:bg-main  border-b-main  border p-2 rounded" onClick={signOut}>LogOut </span>
              </li>:<>
              <li>
                <NavLink className="block py-2 px-3 text-gray-900 rounded   md:border-0   dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to={"login"}>Login </NavLink>
              </li>
              <li>
                <NavLink  className="block py-2 px-3 text-gray-900 rounded   md:border-0   dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to={"register"}>Register </NavLink>
              </li>
              </>}
           
            
            </ul>
          </div>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </nav>
    
 
    </div>
  );
}
