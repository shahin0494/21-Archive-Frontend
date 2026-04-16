import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllWishlistAPI, deleteWishlistAPI, wishlistToCartAPI } from '@/Services/allAPI';
import { toast } from 'sonner';
import { ArrowUpRight } from 'lucide-react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollVelocity from '@/components/ScrollVelocity';


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

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111] font-sans selection:bg-[#EAEAEA] selection:text-black pb-20">

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
    </div>
  );
}


// --- 5. The Focus (Ultra Minimal Editorial) ---
function ViewFocus({ items, onRemove, onMove }) {
  // Empty state (only when wishlist is empty)
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[40vh] text-center">
        <ScrollVelocity
          texts={[
            <span className='lowercase'>Your wishlist is empty</span>,
            <span className="text-red-500 lowercase font-black">Your wishlist is empty</span>,
            <span className='lowercase'>Your wishlist is empty</span>,
          ]}
          velocity={100}
          className="custom-scroll-text"
          numCopies={12}
          damping={100}
          stiffness={400}
        />
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