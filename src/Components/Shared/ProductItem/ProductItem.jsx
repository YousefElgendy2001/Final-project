import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../Context/ThemeContext/ThemeContext";

export default function ProductItem(props) {
  const { darkMode } = useContext(ThemeContext);
  let { imageCover, title, category, price, ratingsAverage, id } = props.product;

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2 mb-3">
      <div className="product p-3 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition-all">
        <Link to={`/productsDetails/${id}/${category._id}`}>
          <img src={imageCover} className="mb-4 w-full rounded-md" alt="" />
          <span className="text-main">{category.name}</span>
          <h2 className="mb-4 font-bold" style={{ color: darkMode ? "white" : "black" }}>
            {title.split(" ").splice(0, 2).join(" ")}
          </h2>
          <div className="flex justify-between mb-5 text-gray-700 dark:text-gray-300">
            <p>{price} EGP</p>
            <p>
              <i className="fa fa-star rating-color"></i> {ratingsAverage}
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
