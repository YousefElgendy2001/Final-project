import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@fortawesome/fontawesome-free/css/all.min.css"
import "flowbite/dist/flowbite.min.js"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import App from './App.jsx'
import TokenContextProvider from './Context/TokenContext/TokenContext.jsx'
import { ThemeContextProvider } from './Context/ThemeContext/ThemeContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TokenContextProvider>
    <ThemeContextProvider>
    <App />
    </ThemeContextProvider>
    </TokenContextProvider>

  </StrictMode>,
)
