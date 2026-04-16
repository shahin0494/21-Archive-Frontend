import React, { useState, useEffect, useMemo } from 'react';
import { getAllCartAPI, deleteCartAPI , createOrderAPI } from '@/Services/allAPI';
import { toast } from 'sonner';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import {
  ShoppingBag,
  X,
  Minus,
  Plus,
  ArrowRight,
  ShieldCheck,
  LayoutTemplate,
  Sidebar,
  Grid,
  Maximize,
  Hash,
  ArrowUpRight,
  Info,
  Trash2,
  BookOpen,
  Blocks,
  Receipt,
  Feather,
  Image as ImageIcon
} from 'lucide-react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollVelocity from '../components/ScrollVelocity';

export default function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      toast.warning("Please login");
      return;
    }

    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`
      };

      const result = await getAllCartAPI(reqHeader);

      if (result.status === 200) {
        setItems(result.data);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to load cart");
    }
  };

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [items]);

  const updateQuantity = (id, delta) => {
    setItems(prev => prev.map(item => {
      if (item._id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = async (id) => {
    const token = sessionStorage.getItem("token");

    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`
      };

      const result = await deleteCartAPI(id, reqHeader);

      if (result.status === 200) {
        toast.success("Removed from cart");
        fetchCart();
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete item");
    }
  };

  const handleCreateOrder = async () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    toast.warning("Please login");
    return;
  }

  try {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    };

    const result = await createOrderAPI(reqHeader);

    if (result.status === 200) {
      toast.success("Order placed successfully 🎉");
      console.log("ORDER:", result.data);

      // optional: clear cart UI
      fetchCart();
    }

  } catch (err) {
    if (err.response?.status === 400) {
      toast.warning("Cart is empty");
    } else if (err.response?.status === 409) {
      toast.error(err.response.data); // stock issue
    } else {
      toast.error("Order failed");
    }

    console.log(err);
  }
};


  return (
    <div className={`min-h-screen font-sans transition-colors duration-700 ease-in-out bg-white text-black`}>
      <Header />
      {/* Main Experience Container */}
      <main className="pt-32 pb-20 px-4 md:px-8 max-w-[1600px] mx-auto min-h-screen">
        <LayoutGroup>
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <MonolithCart 
                items={items} 
                update={updateQuantity} 
                remove={removeItem} 
                subtotal={subtotal} 
                onCheckout={handleCreateOrder}
              />
            </motion.div>
          </AnimatePresence>
        </LayoutGroup>
      </main>
      <Footer />
    </div>
  );
}

const LuxuryButton = ({ total, label = "Finalize Order", onClick }) => (
  <button onClick={onClick} className="group relative w-full h-16 bg-white text-black hover:text-white rounded-full overflow-hidden flex items-center justify-between px-8 hover:pr-10 transition-all duration-500">
    <div className="absolute inset-0 bg-red-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
    <span className="relative z-10 text-xs font-black uppercase tracking-[0.2em]">{label}</span>
    <div className="relative z-10 flex items-center gap-4">
      <span className="text-sm font-bold">${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
    </div>
  </button>
);

function MonolithCart({ items, update, remove, subtotal, onCheckout }) {
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[40vh] text-center">
        <ScrollVelocity
          texts={[
            <span className='lowercase'>Your cart is empty</span>,
            <span className="text-red-500 lowercase font-black">Your cart is empty</span>,
            <span className='lowercase'>Your cart is empty</span>,
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
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {items.map((item) => (
          <motion.div layout key={item._id} className="group flex flex-col border border-blacl/5 hover:border-black/20 transition-all duration-500 rounded-lg p-6 bg-white/[0.02]">
            <div className="relative aspect-square mb-6 overflow-hidden rounded-md bg-neutral-100">
              <img
                src={
                  Array.isArray(item.photos)
                    ? (item.photos[0]?.startsWith("http")
                      ? item.photos[0]
                      : `http://localhost:3000/${item.photos[0]}`)
                    : (item.photos?.startsWith("http")
                      ? item.photos
                      : `http://localhost:3000/${item.photos}`)
                }
                className="w-full h-full object-cover  transition-all duration-700"
                alt=""
              />
              <button
                onClick={() => remove(item._id)}
                className="absolute top-4 right-4 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100"
              >
                <X size={14} />
              </button>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2 border-b pb-2">
                <div>
                  <p className="text-xl text-black font-black text- uppercase mb-1 opacity">{item.brand}</p>
                  <h3 className="text-xs font-black uppercase tracking-widest opacity-50">{item.sneakerName}</h3>
                </div>

              </div>
              <div className="flex justify-between items-start mb-2 border-b py-2">
                <h3 className="text-xs  font-black uppercase opacity-50 tracking-widest">Size</h3>
                <span className="text-xs font-mono opacity-50">{item.size}</span>
              </div>
              <div className="flex justify-between items-start mb-2 border-b py-2">
                <h3 className="text-xs  font-black uppercase opacity-50 tracking-widest">Price</h3>
                <span className="text-xs font-mono opacity-50">${item.price}</span>
              </div>
              {/* <p className="text-sm text-black font-black text- uppercase mb-1 opacity-50">{item.brand}</p> */}
            </div>

          </motion.div>
        ))}
      </div>

      <div className="sticky top-40 bg-black/5 border border-black/10 p-10 rounded-3xl backdrop-blur-3xl">
        <h3 className="text-xs uppercase tracking-[0.3em] font-black mb-10 pb-6 border-b border-black/10">Valuation Summary</h3>
        <div className="space-y-6 mb-12">
          {[
            { label: 'Subtotal Value', value: `$${subtotal.toFixed(2)}` },
            { label: 'Logistics / Shipping', value: 'Complimentary' },
            { label: 'Estimated Duties', value: '$0.00' }
          ].map((row, i) => (
            <div key={i} className="flex justify-between text-xs tracking-wider">
              <span className="opacity-40">{row.label}</span>
              <span className="font-mono">{row.value}</span>
            </div>
          ))}
          <div className="pt-6 border-t border-white/10 flex justify-between">
            <span className="text-xs uppercase font-black tracking-widest">Grand Total</span>
            <span className="text-2xl font-light tracking-tighter">${subtotal.toFixed(2)}</span>
          </div>
        </div>
        <LuxuryButton total={subtotal} onClick={onCheckout} />
      </div>

    </div>
  );
}