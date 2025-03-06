import { createContext, useContext, useState } from "react";
import { tokenContext } from "../TokenContext/TokenContext";
import axios from "axios";
import { data } from "react-router-dom";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const { token } = useContext(tokenContext);

  const API_URL = `https://ecommerce.routemisr.com/api/v1/cart`;
  const headers = { token };

  async function addToCart(productId) {
  
      const { data } = await axios.post(API_URL, { productId }, { headers });
  

    return data;
  }

  return (
    <cartContext.Provider value={{ cartCount, setCartCount, addToCart }}>
      {children}
    </cartContext.Provider>
  );
}
