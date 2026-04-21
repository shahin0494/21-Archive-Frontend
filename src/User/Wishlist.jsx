import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllWishlistAPI, deleteWishlistAPI, wishlistToCartAPI } from '@/Services/allAPI';
import { toast } from 'sonner';
import { ArrowUpRight } from 'lucide-react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollVelocity from '@/components/ScrollVelocity';
import { Toaster } from '@/components/ui/sonner';
import { useNavigate } from 'react-router-dom';


export default function App() {
  const [items, setItems] = useState([]);
  const [activeVariety, setActiveVariety] = useState('stack');

  useEffect(() => {
    getWishlist();
  }, []);

  const getWishlist = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      toast.warning("Please login");
      return;
    }

    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`
      };

      const result = await getAllWishlistAPI(reqHeader);

      if (result.status === 200) {
        setItems(result.data);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to load wishlist");
    }
  };

  const removeItem = async (id) => {
    const token = sessionStorage.getItem("token");

    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`
      };

      const result = await deleteWishlistAPI(id, reqHeader);

      if (result.status === 200) {
        toast.success("Removed from wishlist");
        getWishlist();
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete");
    }
  };

  const moveToCart = async (id) => {
    const token = sessionStorage.getItem("token");

    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`
      };

      const result = await wishlistToCartAPI(id, reqHeader);

      if (result.status === 200) {
        toast.success("Moved to cart");
        getWishlist();
      }
    } catch (err) {
      if (err.response?.status === 409) {
        toast.warning("Already in cart");
      } else {
        toast.error("Failed to move to cart");
      }
      console.log(err);
    }
  };

const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#F2F3F4] text-[#111] font-sans selection:bg-[#EAEAEA] selection:text-black ">

      {/* Main Content Area */}
      <main className="max-w-[1600px] mx-auto p-6 md:p-12">
        <Header />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVariety}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          ><ViewFocus items={items} onRemove={removeItem} onMove={moveToCart} />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <Toaster
        position="bottom-center"
        theme="dark" />
    </div>
  );
}


// --- 5. The Focus (Ultra Minimal Editorial) ---
function ViewFocus({ items, onRemove, onMove }) {
  // Empty state (only when wishlist is empty)
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col h-[60vh] mt-20 w-full  text-black font-black  border-black ">
        <div className="flex-1 flex flex-col items-center justify-center  ">
          {/* Broken Skateboard */}
          <motion.svg
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: -12 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="w-56 h-56 mb-6"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <path d="M3 12h7l1.5-2 1.5 2h8" />
            <path d="M3 12c-1.5 0-2 1-2 2s.5 2 2 2h6.5l2-3 2 3H21c1.5 0 2-1 2-2s-.5-2-2-2" />
            <path d="M7 16v2" />
            <path d="M17 16v2" />
            <circle cx="7" cy="19" r="1.5" fill="black" />
            <circle cx="17" cy="19" r="1.5" fill="black" />
            <path d="M11 9l-1-3" strokeWidth="2" />
            <path d="M13 9l1-3" strokeWidth="2" />
            {/* Speed lines */}
            <motion.path initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} d="M3 6h4" strokeWidth="1.5" />
            <motion.path initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} d="M2 8h2" strokeWidth="1.5" />
          </motion.svg>

          <motion.h2
            initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
            className="text-5xl uppercase mb-4 tracking-tighter"
          >
            Wipeout.
          </motion.h2>
          <motion.p
            initial={{ scale: 0.9, opacity: 0, rotate: 0 }} animate={{ scale: 1, opacity: 1, rotate: 1 }} transition={{ delay: 0.4 }}
            className="text-xl font-bold mb-10 max-w-md text-center bg-black text-white p-2"
          >
            NOTHING IN YOUR WISHLIST. DON'T BAIL ON THIS SESSION.
          </motion.p>

          <motion.button
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.001 }}
            whileHover={{ scale: 1.05, y: -4, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
            whileTap={{ scale: 0.95, y: 0, boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)" }}
            className="px-10 py-5 bg-red-500 border-4 border-black text-black text-white text-2xl uppercase transition-colors hover:bg-red-600"
          >
            Hit The Shop
          </motion.button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-32 md:gap-48 pb-20">
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start"
        >

          {/* Image Column */}
          <div className="md:col-span-8 lg:col-span-9 order-first md:order-last">
            <div className="aspect-[3/4] md:aspect-[16/10] bg-gray-50 overflow-hidden w-full">
              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                src={
                  item.photos?.[0]?.startsWith("http")
                    ? item.photos[0]
                    : `http://localhost:3000/${item.photos?.[0]}`
                }
                alt={item.sneakerName}
                className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>


          {/* Text Column (Sticky) */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col pt-4 md:sticky md:top-32">
            <div className="mb-12">
              <span className="text-[10px] font-mono text-gray-300 block mb-6">ITEM 0{i + 1}</span>
              <h2 className="text-4xl md:text-5xl font-light tracking-tighter leading-[0.95] mb-4 text-black">{item.sneakerName}</h2>
              <p className="text-sm text-gray-400 font-light">{item.brand}</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-baseline justify-between border-b border-gray-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Price</span>
                <span className="text-xl font-normal">{item.price}</span>
              </div>
              <div className="flex items-baseline justify-between border-b border-gray-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Size</span>
                <span className="text-sm font-mono">{item.size}</span>
              </div>
              <div className="flex items-baseline justify-between pt-2">
                <button
                  onClick={() => onMove(item._id)}
                  className="text-xs flex items-center justify-center font-bold uppercase tracking-widest border border-neutral-300 p-4 hover:text-gray-100 hover:bg-neutral-800 transition-colors"
                >
                  Move to Cart
                </button>
                <button
                  onClick={() => onRemove(item._id)}
                  className="text-xs font-bold uppercase tracking-widest border border-red-300 p-4 text-red-950 hover:text-red-100 hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}