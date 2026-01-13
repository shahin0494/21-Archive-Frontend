import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Home from './User/Home'
import Shop from './User/Shop'
import ProductDetail from './User/ProductDetail'
import Cart from './User/Cart'
import Wishlist from './User/Wishlist'
import Orders from './User/Orders'
import Checkout from './User/Checkout'
import SignIn from './Pages/SignIn'
import Pnf from './Pages/Pnf'
import Ploader from './Pages/Ploader'

function App() {
  const location = useLocation()
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem("hasLoadedOnce");
  });

  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("hasLoadedOnce", "true");
    }, 4000);

    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <>
      <Ploader active={loading} />
      

      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/shop/men'  element={<Shop />} />
          <Route path='/shop/women'  element={<Shop />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/register' element={<SignIn register />} />
          <Route path='*' element={<Pnf />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
