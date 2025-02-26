import React, { useState , useEffect } from 'react'
import styles from './Home.module.css' 
import RecentProducts from './components/RecentProducts/RecentProducts'

export default function Home() {
    const [Home, setHome] = useState()
  return (
    <div>
   <RecentProducts/>
    </div>
  )
}
