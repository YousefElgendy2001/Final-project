import React, { useState , useEffect } from 'react'
import styles from './BrandDetails.module.css' 
import { useParams } from 'react-router-dom'
import axios from 'axios'
import LoaderDetails from '../Shared/LoaderDetails/LoaderDetails'

export default function BrandDetails() {
    const [BrandDetails, setBrandDetails] = useState()
const [loading, setLoading] = useState(true);
    let {id } = useParams()
    console.log(id);


   async function getBrandDetails() {
      try {

        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
        console.log(data);
        setBrandDetails(data.data)
        
        
      } catch (error) {
        console.error("Error fetching Product:", error);
        
      }
    finally {
      setLoading(false); 
    }
    }


  useEffect(() => {
    getBrandDetails();
  }, []);
    
  return (
    <>
    {loading?(<LoaderDetails/>):
    
    <div className="main-layout items-center">
    <div className="w-4/12">
    <img src={BrandDetails?.image} alt="" />
    </div>
    <div className="w-8/12">
    <h1 className=''>{BrandDetails?.name}</h1>
  <span className="text-main">{BrandDetails?.slug}</span>
  <div className="flex justify-end">
    <p>
      <i className='fa fa-star rating-color py-2'></i>4.8
      {BrandDetails?.ratingsAverage}</p>
  </div>
  <button className=' bg-main text-center w-full p-2 text-white rounded-md'>ADD To Cart</button>

    </div>
  </div>
    }
    
    </>
  )
}
