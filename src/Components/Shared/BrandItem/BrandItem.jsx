import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../Context/ThemeContext/ThemeContext";

export default function BrandItem(props) {
  const { darkMode } = useContext(ThemeContext);
  let { image, name, slug, _id } = props.brand;


  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2 mb-3">
      <div className="product p-3 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition-all">
      <Link to={`/brandDetails/${_id}`}>
          <img src={image} alt={name} className="mb-4 w-full rounded-md"  />
          <h2 className="text-main">{name}</h2>
          <p className="mb-4 font-bold" style={{ color: darkMode ? "white" : "black" }}>
          {slug}
          </p>
          <div className="flex justify-between mb-5 text-gray-700 dark:text-gray-300">
            <p>
              <i className="fa fa-star rating-color"></i> 4.3
            </p>
          </div>
        </Link>
        <button className="btn-hover-effect bg-main text-center w-full p-2 text-white rounded-md">
          ADD To Cart
        </button>
      </div>
    </div>
  );
}















