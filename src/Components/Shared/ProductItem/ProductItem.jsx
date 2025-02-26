import React, { useState , useEffect } from 'react'
import styles from './ProductItem.module.css' 
import { Link } from 'react-router-dom'

export default function ProductItem(props) {
    const [ProductItem, setProductItem] = useState()

    let {imageCover ,title ,category,price,ratingsAverage,id} =props.product
  return (
    <div className="w-1/6 px-3 mb-3">
      
      
    <div className="product">
      <Link to={`/productsDetails/${id}/${category._id}`}>
      <img src={imageCover} className='mb-4' alt="" />
      <span className='text-main'>{category.name}</span>
      <h2 className='mb-4'>{title.split(" ").splice(0,2).join(" ")}</h2>
      <div className="flex justify-between mb-5">
        <p>{price} EGP</p>
        <p>
          <i className='fa fa-star rating-color'></i>
          {ratingsAverage}</p>
      </div>
      </Link>
      <button className='btn bg-main text-center w-full p-2 text-white rounded-md'>ADD To Cart</button>
    </div>
    
    
    </div>
  )
}
