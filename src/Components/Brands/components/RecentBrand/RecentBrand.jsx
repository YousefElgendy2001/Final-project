import React, { useEffect, useState } from "react";
import styles from './RecentBrand.module.css' 
import axios from "axios";
import BrandItem from "../../../Shared/BrandItem/BrandItem";
import Loader from "../../../Shared/Loader/Loader";

export default function RecentBrand() {




  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getBrand() {
    try {
      let { data } = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/brands"
      );

      console.log(data);
      setBrands(data.data);
    } catch (error) {
      console.error("Error fetching Brand:", error);
    } finally {
      setLoading(false); 
    }
  }

  useEffect(() => {
    getBrand();
  }, []);

  return (
    <div className="main-layout gap-24  mb-16">
      {loading ? (
       <Loader/>
      ) : brands.length > 0 ? (
        brands.map((brand) => (
          <BrandItem key={brand.id} brand={brand}  />
        ))
      ) : (
        <p>No Brands found.</p> 
      )}
    </div>
  );
}





  