import React, { useState, useEffect } from "react";
import styles from "./Footer.module.css";

export default function Footer() {



  
  return (
    <>
    
    
    <footer className="bg-[rgb(242,242,242)]  p-6 ">
  <div className="container max-w-screen-xl mx-auto">
    <h2 className="text-3xl text-[#212529]">Get the Fresh Cart App</h2>
    <p className="text-[#6d767e] mb-4 font-light">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae
      maxime rerum cupiditate dolore nemo ab?
    </p>
    <div className="flex gap-4">
      <input
        type="text"
        id="input-group-1"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
        focus:ring-blue-500 focus:border-blue-500 block grow ps-10 p-2.5"
        placeholder="name@flowbite.com"
      />
      <button className="bg-main text-white p-2 rounded-md">
        Share App Link
      </button>
    </div>
    <div className="partner flex justify-between py-6 border-y border-gray-300">
      <div className="payment">
        <p>Payment Partner</p>
      </div>
      <div className="app">
        <p>Get with Fresh Cart</p>
      </div>
    </div>
  </div>
</footer>

    
    
    </>
   
  );
}
