import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoaderDetails from "../Shared/LoaderDetails/LoaderDetails";
import RelatedProduct from "../ProductsDetails/Components/RelatedProduct/RelatedProduct";
import Slider from "react-slick";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { cartContext } from "../../Context/CartContext/CartContext";
import Modal from "react-modal";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

export default function ProductsDetails() {
  const [productsDetails, setProductsDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { id, categoryId } = useParams();
  const { darkMode } = useContext(ThemeContext);
  let { addToCart } = useContext(cartContext);

  // ✅ Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
    appendDots: (dots) => (
      <div className="p-2">
        <ul className="flex justify-center space-x-2">{dots}</ul>
      </div>
    ),
    dotsClass: `slick-dots ${darkMode ? "dark-dots" : "light-dots"}`,
  };

  // ✅ إضافة المنتج إلى السلة
  async function addProductToCart(id) {
    if (isAdding) return;
    setIsAdding(true);

    try {
      let data = await addToCart(id);
      console.log("Product added to cart:", data);

      if (data.status === "success") {
        toast.success("Product added successfully!", { theme: "dark" });
        setModalIsOpen(true);
      } else {
        toast.error("Failed to add product!", { theme: "dark" });
      }
    } catch (error) {
      toast.error("Error adding product!", { theme: "dark" });
    } finally {
      setIsAdding(false);
    }
  }

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
                <img
                  key={index}
                  src={src}
                  alt={productsDetails?.title || "Product Image"}
                  className="rounded-lg shadow-md"
                />
              ))}
            </Slider>
          </div>

          {/* ✅ Product Details */}
          <div className="w-full md:w-7/12">
            <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
              {productsDetails?.title}
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {productsDetails?.description}
            </p>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {productsDetails?.category?.name}
            </span>

            <div className="flex justify-between items-center mt-4">
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {productsDetails?.price} EGP
              </p>
              <p className="flex items-center text-gray-600 dark:text-gray-300">
                <i className="fa fa-star text-yellow-500 mr-1"></i>
                {productsDetails?.ratingsAverage}
              </p>
            </div>

            <button
              onClick={() => addProductToCart(productsDetails.id)}
              disabled={isAdding}
              className={`${
                isAdding ? "bg-gray-400 cursor-not-allowed" : "bg-main hover:bg-green-700"
              } text-white font-semibold w-full p-3 rounded-md mt-4 transition flex items-center justify-center`}
            >
              {isAdding ? (
                <span className="loader border-white border-t-transparent border-2 w-5 h-5 rounded-full animate-spin"></span>
              ) : (
                "ADD TO CART"
              )}
            </button>
          </div>
        </div>
      )}

      {/* ✅ Related Products Section */}
      <h2 className="text-xl font-semibold mt-8 text-gray-800 dark:text-white">
        Related Products
      </h2>
      {categoryId && <RelatedProduct categoryId={categoryId} id={id} />}

      {/* ✅ مودال التأكيد */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className={`bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg max-w-sm mx-auto text-center`}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <img
          src={productsDetails?.imageCover}
          alt={productsDetails?.title}
          className="w-32 h-32 mx-auto mb-4 rounded-lg shadow"
        />
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {productsDetails?.title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">Added to cart successfully!</p>
        <button
          onClick={() => setModalIsOpen(false)}
          className="mt-4 bg-main text-white px-4 py-2 rounded-md"
        >
          OK
        </button>
      </Modal>
    </>
  );
}
