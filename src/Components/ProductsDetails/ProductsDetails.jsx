import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoaderDetails from "../Shared/LoaderDetails/LoaderDetails";
import RelatedProduct from "../ProductsDetails/Components/RelatedProduct/RelatedProduct";
import Slider from "react-slick";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductsDetails() {
  const [productsDetails, setProductsDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id, categoryId } = useParams();
  const { darkMode } = useContext(ThemeContext);

  // ✅ Slider settings with dark mode support
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, 
    adaptiveHeight: true,
    appendDots: dots => (
      <div className="p-2">
        <ul className="flex justify-center space-x-2">{dots}</ul>
      </div>
    ),
    dotsClass: `slick-dots ${darkMode ? "dark-dots" : "light-dots"}`
  };

  // ✅ Fetch Product Details
  async function getProductDetails() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );

      setProductsDetails(data.data);
    } catch (error) {
      console.error("Error fetching Product:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);

  return (
    <>
      {loading ? (
        <LoaderDetails />
      ) : (
        <div className="main-layout flex flex-col md:flex-row items-center py-5">
          {/* ✅ Product Images Slider */}
          <div className="w-full md:w-5/12">
            <Slider {...settings}>
              {productsDetails?.images?.map((src, index) => (
                <img key={index} src={src} alt={productsDetails?.title || "Product Image"} className="rounded-lg shadow-md" />
              ))}
            </Slider>
          </div>

          {/* ✅ Product Details */}
          <div className="w-full  md:w-7/12">
            <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{productsDetails?.title}</h1>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{productsDetails?.description}</p>
            <span className="text-sm text-gray-500 dark:text-gray-400">{productsDetails?.category?.name}</span>
            
            <div className="flex justify-between items-center mt-4">
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{productsDetails?.price} EGP</p>
              <p className="flex items-center text-gray-600 dark:text-gray-300">
                <i className="fa fa-star text-yellow-500 mr-1"></i>
                {productsDetails?.ratingsAverage}
              </p>
            </div>

            <button className="bg-main hover:bg-green-700 text-white font-semibold w-full p-3 rounded-md mt-4 transition">
              ADD TO CART
            </button>
          </div>
        </div>
      )}

      {/* ✅ Related Products Section */}
      <h2 className="text-xl font-semibold mt-8 text-gray-800 dark:text-white">Related Products</h2>
      {categoryId && <RelatedProduct categoryId={categoryId} id={id} />}

     
    </>
  );
}
