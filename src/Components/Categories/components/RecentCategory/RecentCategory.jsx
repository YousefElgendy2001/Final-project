import React, { useEffect, useState } from "react";
import styles from "./RecentCategory.module.css";
import axios from "axios";
import CategoryItem from "../../../Shared/CategoryItem/CategoryItem";
import Loader from "../../../Shared/Loader/Loader";
export default function RecentCategory() {




  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getCategory() {
    try {
      let { data } = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/categories"
      );

      console.log(data);
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false); 
    }
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="main-layout mb-16">
      {loading ? (
       <Loader/>
      ) : categories.length > 0 ? (
        categories.map((category) => (
          <CategoryItem key={category.id} category={category}  />
        ))
      ) : (
        <p>No categories found.</p> 
      )}
    </div>
  );
}





  