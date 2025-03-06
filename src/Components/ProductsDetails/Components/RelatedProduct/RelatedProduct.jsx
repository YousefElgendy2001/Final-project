import React, { useState, useEffect, useMemo, useContext } from "react";
import axios from "axios";
import ProductItem from "../../../Shared/ProductItem/ProductItem";
import LoaderRelatedProduct from "../../../Shared/LoaderRelatedProduct/LoaderRelatedProduct";
import { cartContext } from "../../../../Context/CartContext/CartContext";
import { toast } from "react-toastify";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function RelatedProduct({ categoryId, id }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  let { addToCart } = useContext(cartContext);

  useEffect(() => {
    if (!categoryId) return;

    async function getProducts() {
      try {
        setLoading(true);
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

    getProducts();
  }, [categoryId]);

  const relatedProducts = useMemo(() => {
    return products.filter(
      (product) => product.category?._id === categoryId && product.id !== id
    );
  }, [products, categoryId, id]);

  async function addProductToCart(product) {
    if (isAdding) return;
    setIsAdding(true);

    let data = await addToCart(product.id);

    if (data?.status === "success") {
      setSelectedProduct(product);
      setModalOpen(true);
      toast.success("Product Added Successfully!", { theme: "dark" });
    } else {
      toast.error("Failed to add product.");
    }

    setIsAdding(false);
  }

  return (
    <>
      {/* ✅ لما المودال مفتوح، الخلفية تاخد بلور */}
      <div className={`main-layout mb-16 relative ${modalOpen ? "blur-lg" : ""}`}>
        {loading ? (
          <LoaderRelatedProduct />
        ) : (
          relatedProducts.length > 0 ? (
            relatedProducts.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                addProductToCart={() => addProductToCart(product)}
                isAdding={isAdding}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-300">
              No related products found.
            </p>
          )
        )}
      </div>

      {/* ✅ Overlay بلور ناعم مع مودال المنتج */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-96 shadow-xl text-center relative transition-all duration-300">
            {selectedProduct && (
              <>
                <img
                  src={selectedProduct.images[0]}
                  alt={selectedProduct.title}
                  className="w-40 h-40 mx-auto rounded-lg"
                />
                <h2 className="text-lg font-bold mt-2 text-gray-800 dark:text-white">
                  {selectedProduct.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Added to cart successfully!
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="bg-main hover:bg-green-700 text-white font-semibold p-2 rounded mt-4 w-full"
                >
                  OK
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
