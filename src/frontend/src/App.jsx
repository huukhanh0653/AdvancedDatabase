import Header from "./components/Header"
import Footer from "./components/Footer"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Category from "./pages/Category"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Product from "./pages/Product"
import Signup from "./pages/Signup"

//import images
import Reservation from "./pages/Reservation"

export default function App() {
  return (
    <main className="bg-primary text-tertiary">
      <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/menu" element={<Category />}/>
            <Route path="/reservation" element={<Reservation />}/>
            <Route path="/product/:productId" element={<Product />}/>
              {/*<Route path=":productId" element={<Product/>}/> */}
            <Route path="/cart-page" element={<Cart />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  )
}