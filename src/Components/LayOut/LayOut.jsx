import React, { useState , useEffect } from 'react'
import styles from './LayOut.module.css' 
import Navbar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'




export default function LayOut() {

  return (
    <>
<Navbar/>



<Outlet/>



<Footer/>


    </>
  )
}
