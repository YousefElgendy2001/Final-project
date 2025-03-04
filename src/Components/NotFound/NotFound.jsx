import React, { useState , useEffect } from 'react'
import styles from './NotFound.module.css' 
import NotFoundImage from '../../assets/images/error.svg'

export default function NotFound() {
  
  return (
    <div>
    <div className="container">
      <img src={NotFoundImage} className='w-full' alt="Error" />
    </div>
    </div>
  )
}
