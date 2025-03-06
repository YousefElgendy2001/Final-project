import { useContext, useState } from 'react'

import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayOut from './Components/LayOut/LayOut'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Products from './Components/Products/Products' 
import ProductsDetails from './Components/ProductsDetails/ProductsDetails' 
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Categories from './Components/Categories/Categories' 
import CategoryDetails from './Components/CategoryDetails/CategoryDetails' 
import BrandDetails from './Components/BrandDetails/BrandDetails'
import Brands from './Components/Brands/Brands'
import NotFound from './Components/NotFound/NotFound'
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";

import { tokenContext } from './Context/TokenContext/TokenContext'


import { useEffect } from 'react'
import AuthView from './Components/Auth/AuthView'
import { ToastContainer } from 'react-toastify'



function App() {
let {setToken} =useContext(tokenContext)

useEffect(()=>{
if(localStorage.getItem("userToken")){
  setToken(localStorage.getItem("userToken"))
}
},[])

const routes = createBrowserRouter([
  {path:"",element:<LayOut/>,children:[
    {index:true,element:<ProtectedRoutes><Home/></ProtectedRoutes>},
    {path:"home",element:<ProtectedRoutes><Home/></ProtectedRoutes>},
    {path:"cart",element: <ProtectedRoutes><Cart/></ProtectedRoutes>},
    {path:"products",element:<ProtectedRoutes><Products/></ProtectedRoutes>},
    {path:"login",element:<AuthView><Login/></AuthView>},
    {path:"register",element:<AuthView><Register/></AuthView>},
    {path:"categories",element:<ProtectedRoutes><Categories/></ProtectedRoutes>},
    {path:"brands",element:<ProtectedRoutes><Brands/></ProtectedRoutes>},


    {path:"*",element:<ProtectedRoutes><NotFound/></ProtectedRoutes>},

    // !Detalis Path
    {path:"productsDetails/:id/:categoryId",element:<ProtectedRoutes><ProductsDetails/></ProtectedRoutes>},
    {path:"categoryDetails/:id",element:<ProtectedRoutes><CategoryDetails/></ProtectedRoutes>},
    {path:"brandDetails/:id",element:<ProtectedRoutes><BrandDetails/></ProtectedRoutes>},



  ]}
])
  return (
    <>
    <RouterProvider router={routes}/>
    
    <ToastContainer />
    
    </>
   
  )
}

export default App




// email:RouteAlex2025@yahoo.com
// password:Test123





