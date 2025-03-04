import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/freshcart-logo.svg";
import { tokenContext } from "../../Context/TokenContext/TokenContext";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";

export default function NavBar() {
  const { token, setToken } = useContext(tokenContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Apply Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  function signOut() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }

  return (
    <>
      {/* ✅ Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-all duration-300">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* ✅ Logo */}
          <div className="flex items-center gap-4">
            <Link to="/">
              <img src={Logo} width={200} alt="FreshCart Logo" className="cursor-pointer" />
            </Link>
          </div>

          {/* ✅ Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>

          {/* ✅ Navigation Links */}
          <div className={`${isMenuOpen ? "block" : "hidden"} md:block w-full md:w-auto`}>
            {token && (
              <ul className="flex flex-col md:flex-row md:space-x-8 items-center bg-gray-100 dark:bg-gray-800 p-4 md:p-0">
                <li><NavLink exact to={"/"} className="nav-link">Home</NavLink></li>
                <li><NavLink to={"/cart"} className="nav-link">Cart</NavLink></li>
                <li><NavLink to={"/products"} className="nav-link">Products</NavLink></li>
                <li><NavLink to={"/categories"} className="nav-link">Categories</NavLink></li>
                <li><NavLink to={"/brands"} className="nav-link">Brands</NavLink></li>
              </ul>
            )}
          </div>

          {/* ✅ Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-xl my-3 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          {/* ✅ Social Media Icons */}
          {token && (
            <ul className="flex items-center gap-4">
              {["instagram", "facebook", "tiktok", "twitter", "linkedin", "youtube"].map((platform) => (
                <li key={platform}>
                  <Link to="#" aria-label={platform}>
                    <i className={`fa-brands fa-${platform} text-gray-600 dark:text-gray-300 hover:text-blue-500`}></i>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* ✅ Login / Logout Buttons */}
          <ul className="flex items-center gap-4">
            {token ? (
              <li>
                <span
                  className="cursor-pointer bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded transition"
                  onClick={signOut}
                >
                  LogOut
                </span>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/login" className="btn-primary">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register" className="btn-primary">Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* ✅ Add padding so the content doesn't go under the navbar */}
      <div className="pt-20">
        {/* باقي محتوى الصفحة هنا */}
      </div>
    </>
  );
}
