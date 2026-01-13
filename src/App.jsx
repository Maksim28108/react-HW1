// import { useState } from "react";  
// import './App.css'
// import MenuPage from "./components/Menu_tmp/Menu";
// import Header from "./components/header/Header"
// import Footer from "./components/footer/Footer"


// export default function App() {
//   const [cartCount, setCartCount] = useState(0);
//   const [cartTotal, setCartTotal] = useState(0);

//   function handleAddToCart(price, qty) {
//     const q = Math.max(1, Number(qty) || 1);
//     setCartCount(c => c + q);
//     setCartTotal(t => t + price * q);
//   }

//   return (
//   <>
//     <Header count={cartCount} total={cartTotal}/>
//     <MenuPage onAddToCart={handleAddToCart}  />
//     <Footer />
//   </> 
//   )
// }

import './App.css'
import { MainPage } from './pages/mainpage/MainPage'

export function App(){
  return (
    <MainPage />
  )
}
