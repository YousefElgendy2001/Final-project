import React, { useState , useEffect } from 'react'
import styles from './BrandItem.module.css' 
import { Link } from 'react-router-dom'
export default function BrandItem(props) {
   
    let {image ,name ,slug,_id} =props.brand
    return (
      <div className="w-1/ px-3 mb-20">
      <div className="brand">
      <Link to={`/brandDetails/${_id}`}>
      <img src={image} alt={""} className="category-image" />

       
        <h2 className='mb-4 text-main'>{name}</h2>
       <p className=''>{slug}</p>
       <div className="flex justify-end">
        <p>
          <i className='fa fa-star rating-color py-2'></i>4.3
       </p>
      </div>
       </Link>
        <button className='btn bg-main text-center w-full p-2 text-white rounded-md'>ADD To Cart</button>
      </div>
      
      
      </div>
    )
}
