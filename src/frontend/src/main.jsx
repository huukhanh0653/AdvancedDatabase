import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Order from './admin/pages/Table/Order/Order.jsx'
import DefautLayout from './admin/layout/DefaultLayout.jsx'

import { ShopContextProvider } from "./Context/ShopContext"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </React.StrictMode>,
)
