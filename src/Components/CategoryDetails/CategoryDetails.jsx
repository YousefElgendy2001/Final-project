import React, { useState , useEffect } from 'react'
import styles from './CategoryDetails.module.css' 
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoaderDetails from '../Shared/LoaderDetails/LoaderDetails';


export default function CategoryDetails() {
    const [categoryDetails, setCategoryDetails] = useState()
    const [loading, setLoading] = useState(true);
    let {id} = useParams()
    console.log(id);
  


   async function getCategoryDetails() {
      try {

        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
        console.log(data);
        setCategoryDetails(data.data)
        
        
      } catch (error) {
        console.error("Error fetching Product:", error);
        
      }
    finally {
      setLoading(false); 
    }
    }


  useEffect(() => {
    getCategoryDetails();
  }, []);
    
  return (
    <>

    {loading?(<LoaderDetails/>):
    
    <div className="main-layout items-center">
    <div className="w-4/12">
    <img src={categoryDetails?.image} alt="" />
    </div>
    <div className="w-8/12">
    <h1 className=''>{categoryDetails?.name}</h1>
  <span className="text-main">{categoryDetails?.slug}</span>
  <div className="flex justify-end">
    <p>
      <i className='fa fa-star rating-color py-2'></i>4.3
     </p>
  </div>


    </div>
  </div>
    }

    
        
 
    </>
  )
}
