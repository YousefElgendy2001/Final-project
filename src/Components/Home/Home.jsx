import React, { useState , useEffect } from 'react'
import styles from './Home.module.css' 
import RecentProducts from './components/RecentProducts/RecentProducts'
import PopularCategory from './components/PopularCategory/PopularCategory'
import StaticSlider from './components/StaticSlider/StaticSlider'

export default function Home() {
    const [Home, setHome] = useState()
  return (
    <div>
      <StaticSlider/>
      <PopularCategory/>
   <RecentProducts/>
    </div>
  )
}
