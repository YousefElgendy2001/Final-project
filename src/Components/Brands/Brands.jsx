import React, { useState , useEffect } from 'react'
import styles from './Brands.module.css' 
import RecentBrand from './components/RecentBrand/RecentBrand'

export default function Brands() {
    const [Brands, setBrands] = useState()
  return (
    <>
<RecentBrand/>
    </>
  )
}
