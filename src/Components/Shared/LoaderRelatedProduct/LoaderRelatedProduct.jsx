import React, { useState , useEffect } from 'react'
import styles from './LoaderRelatedProduct.module.css' 

export default function LoaderRelatedProduct() {
    const [LoaderRelatedProduct, setLoaderRelatedProduct] = useState()
  return (
     <div>
          <div className='flex justify-center items-center w-full'>
              <div className={styles[`LoaderRelatedProduct`] }></div>
              </div>
        </div>
  )
}
