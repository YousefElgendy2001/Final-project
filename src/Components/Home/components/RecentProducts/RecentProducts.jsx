import React, { useState, useEffect, useContext } from "react";
import styles from "./RecentProducts.module.css";
import axios from "axios";
import ProductItem from "../../../Shared/ProductItem/ProductItem";
import Loader from "../../../Shared/Loader/Loader";
import { cartContext } from "../../../../Context/CartContext/CartContext";
import { ThemeContext } from "../../../../Context/ThemeContext/ThemeContext";
import Modal from "react-modal";
import { toast } from "react-toastify";

Modal.setAppElement("#root"); // لمنع مشاكل الـ accessibility

export default function RecentProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalProduct, setModalProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  let { addToCart } = useContext(cartContext);
  let { darkMode } = useContext(ThemeContext);

  async function getProducts() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  async function addProductToCart(product) {
    if (isAdding) return;
    setIsAdding(true);

    try {
      let data = await addToCart(product.id);
    

      setModalProduct(product);

      if (data.status === "success") {
        setModalMessage("Product added successfully!");
        toast.success("Product added successfully!", { theme: "dark" });
      } else {
        setModalMessage("Failed to add product. Try again!");
        toast.error("Failed to add product!", { theme: "dark" });
      }
    } catch (error) {
      setModalMessage("Error adding product. Please try again.");
      toast.error("Error adding product!", { theme: "dark" });
    } finally {
      setIsAdding(false);
      setModalIsOpen(true);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={`main-layout mb-16 ${isAdding ? "pointer-events-none blur-sm" : ""}`}>
      {loading ? (
        <Loader />
      ) : products.length > 0 ? (
        products.map((product) => (
          <ProductItem
            key={product.id}
            addProductToCart={() => addProductToCart(product)}
            product={product}
            isAdding={isAdding}
          />
        ))
      ) : (
        <p>No products found.</p>
      )}

      {/* مودال الإشعار */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className={`bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg max-w-sm mx-auto text-center`}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        {modalProduct && (
          <>
            <img
              src={modalProduct.imageCover}
              alt={modalProduct.title}
              className="w-32 h-32 mx-auto mb-4 rounded-lg shadow"
            />
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {modalProduct.title}
            </h2>
          </>
        )}
        <p className="text-gray-700 dark:text-gray-300">{modalMessage}</p>
        <button
          onClick={() => setModalIsOpen(false)}
          className="mt-4 bg-main text-white px-4 py-2 rounded-md"
        >
          OK
        </button>
      </Modal>
    </div>
  );
}
