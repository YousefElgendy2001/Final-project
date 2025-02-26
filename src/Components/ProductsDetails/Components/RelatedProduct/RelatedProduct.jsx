import React, { useState , useEffect } from 'react'
import styles from './RelatedProduct.module.css' 
import axios from 'axios';
import ProductItem from '../../../Shared/ProductItem/ProductItem';
import LoaderRelatedProduct from '../../../Shared/LoaderRelatedProduct/LoaderRelatedProduct';


export default function RelatedProduct(props) {
    const [relatedProduct, setRelatedProduct] = useState([])

    const [currentProduct, setCurrentProduct] = useState(null); // المنتج الحالي
    const [loading, setLoading] = useState(true); // حالة التحميل
    
    let {categoryId ,id} = props
    console.log(categoryId ,"categoryId");
    console.log(id ,"Id");


    async function getProducts() {
      try {
          setLoading(true); // بدء التحميل
          let { data } = await axios.get(
              "https://ecommerce.routemisr.com/api/v1/products"
          );

          let res = data.data.filter(product => product.category._id === categoryId);

          // تحديث المنتج الحالي أول مرة
          if (!currentProduct) {
              let initialProduct = res.find(product => product.id === id);
              setCurrentProduct(initialProduct || res[0]); // خذ أول منتج لو مفيش مطابق
          }

          // تحديث المنتجات المرتبطة (بعد إزالة المنتج الحالي منها)
          setRelatedProduct(res.filter(product => product.id !== id));
      } catch (error) {
          console.error("Error fetching Product:", error);
      } finally {
          setLoading(false); // إنهاء التحميل
      }
  }
  
    useEffect(() => {
      getProducts();
    }, [id]);



  
    


 return (
    <>


{loading ?(<LoaderRelatedProduct/>):

  
<div className="main-layout mb-16">
{ 
  relatedProduct.map(product => (
    <ProductItem key={product.id} product={product} />
  ))
 }
</div>



}  
    </>
  );
}

