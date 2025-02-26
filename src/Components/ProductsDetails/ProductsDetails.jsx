import React, { useState, useEffect } from "react";
import styles from "./ProductsDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoaderDetails from "../Shared/LoaderDetails/LoaderDetails";
import RelatedProduct from "../ProductsDetails/Components/RelatedProduct/RelatedProduct"

export default function ProductsDetails() {
  const [productsDetails, setProductsDetails] = useState();
 const [loading, setLoading] = useState(true);
  const { id , categoryId} = useParams();
  console.log(id,"id");
  console.log(categoryId,"categoryId");


  async function getProductDetails() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );

      console.log(data);
      setProductsDetails(data.data)
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


{loading ?(<LoaderDetails/>):
  <div className="main-layout items-center py-5">
        <div className="w-4/12">
        <img src={productsDetails?.imageCover} alt="" />
        </div>
        <div className="w-8/12">
        <h1 className=''>{productsDetails?.title}</h1>
      <p className='mb-4'>{productsDetails?.description}</p>
      <span className="">{productsDetails?.category?.name}</span>
      <div className="flex justify-between mb-5">
        <p>{productsDetails?.price} EGP</p>
        <p>
          <i className='fa fa-star rating-color'></i>
          {productsDetails?.ratingsAverage}</p>
      </div>
      <button className=' bg-main text-center w-full p-2 text-white rounded-md'>ADD To Cart</button>

        </div>
      </div>

}  

      <h2>RelatedProduct</h2>
      <RelatedProduct  categoryId={categoryId} id={id}/>
    </>
  );
}
