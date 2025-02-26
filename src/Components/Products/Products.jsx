import React, { useState , useEffect } from 'react'
import styles from './Products.module.css' 
import RecentProduct from './components/RecentProduct/RecentProduct'

export default function Products() {
    const [Products, setProducts] = useState()
  return (
    <div>
     <RecentProduct/>
    </div>
  )
}
