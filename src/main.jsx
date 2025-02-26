import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@fortawesome/fontawesome-free/css/all.min.css"
import "flowbite/dist/flowbite.min.js"
import './index.css'
import App from './App.jsx'
import TokenContextProvider from './Context/TokenContext/TokenContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TokenContextProvider>
      
    <App />

    </TokenContextProvider>

  </StrictMode>,
)
