import React, { useState , useEffect } from 'react'
import styles from './Loader.module.css' 

export default function Loader() {
    const [Loader, setLoader] = useState()
  return (
    <div className='flex justify-center items-center w-full'>
    <div className={styles[`loader`] }></div>
    </div>
  )
}
