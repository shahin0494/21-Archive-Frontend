import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveLeft, ShoppingCart, Info, Search, RotateCcw } from 'lucide-react';


// --- VARIETY 3: THE EMPTY BOX (Hypebeast/Product) ---
const EmptyBox = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-zinc-50 text-black">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative w-64 h-40 border-2 border-black rounded-sm shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center flex-col bg-white"
    >
      <div className="absolute top-2 left-2 flex gap-1">
        <div className="w-2 h-2 bg-black rounded-full" />
        <div className="w-2 h-2 bg-black rounded-full opacity-20" />
      </div>
      <span className="text-4xl font-black">L</span>
      <span className="text-[10px] font-mono tracking-tighter">OUT OF STOCK / PAGE NOT FOUND</span>
    </motion.div>
    <div className="mt-16 text-center">
      <p className="font-mono text-sm uppercase tracking-widest text-zinc-400">Error Code: 404</p>
      <h2 className="text-3xl font-bold mt-2">Took an 'L' on this URL.</h2>
      <a href="/" className="mt-8 inline-block underline underline-offset-8 font-bold hover:text-orange-600 transition-colors">
        RE-ENTER THE RAFFLE
      </a>
    </div>
  </div>
);

// --- MAIN WRAPPER COMPONENT ---
export default function Sneaker404Page() {

  return (
    <div className="relative">
      {/* Variety Switcher (For Preview Purposes) */}


      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.4 }}
        >
          <EmptyBox />,
        </motion.div>
      </AnimatePresence>
    </div>
  );
}