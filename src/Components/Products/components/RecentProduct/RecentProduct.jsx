import React, { useState, useEffect } from "react";
import styles from './RecentProduct.module.css' 
import axios from "axios";
import ProductItem from "../../../Shared/ProductItem/ProductItem";
import Loader from "../../../Shared/Loader/Loader";

export default function RecentProduct() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getProducts() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );

      console.log(data);
      setProduct(data.data);
    } catch (error) {
      console.error("Error fetching Product:", error);
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
      ) : product.length > 0 ? (
        product.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))
      ) : (
        <p>No products found.</p> 
      )}
    </div>
  );
}
