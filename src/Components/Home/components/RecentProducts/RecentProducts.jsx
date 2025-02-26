import React, { useState, useEffect } from "react";
import styles from "./RecentProducts.module.css";
import axios from "axios";
import ProductItem from "../../../Shared/ProductItem/ProductItem";
import Loader from "../../../Shared/Loader/Loader";

export default function RecentProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getProducts() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );

      console.log(data);
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); 
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="main-layout mb-16">
      {loading ? (
       <Loader/>
      ) : products.length > 0 ? (
        products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))
      ) : (
        <p>No products found.</p> // 
      )}
    </div>
  );
}
