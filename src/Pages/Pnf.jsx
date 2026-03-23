import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveLeft, ShoppingCart, Info, Search, RotateCcw } from 'lucide-react';

// --- VARIETY 1: THE SNAP (Minimalist/Gritty) ---
const BrokenDeck = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-[#111] text-white p-6">
    <motion.div 
      initial={{ rotate: 0 }}
      animate={{ rotate: [0, -10, 10, -5, 0] }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative flex items-center justify-center mb-12"
    >
      <div className="text-[12rem] font-black tracking-tighter leading-none opacity-20">404</div>
      <motion.div 
        initial={{ width: 0 }} animate={{ width: "110%" }}
        className="absolute h-4 bg-red-600 top-1/2 -rotate-12 shadow-[0_0_20px_rgba(220,38,38,0.5)]"
      />
    </motion.div>
    <h2 className="text-2xl font-mono uppercase tracking-widest mb-4">Deck Snapped.</h2>
    <p className="text-zinc-500 max-w-xs text-center mb-8 font-light">
      You bailed hard. This page doesn't exist or was moved to a different spot.
    </p>
    <button className="px-8 py-3 border border-white hover:bg-white hover:text-black transition-colors duration-300 uppercase text-xs tracking-[0.2em] font-bold">
      Back to Drop
    </button>
  </div>
);

// --- VARIETY 2: THE ROLLING WHEEL (Clean/Kinetic) ---
const RollingWheel = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-white text-black overflow-hidden">
    <div className="relative w-full h-24 overflow-hidden border-y border-zinc-100 flex items-center">
      <motion.div 
        animate={{ x: ["-100%", "100%"] }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        className="flex items-center space-x-4 italic font-black text-6xl text-zinc-200 uppercase"
      >
        <span>Not Found</span>
        <div className="w-12 h-12 rounded-full border-8 border-black border-dashed animate-spin" />
        <span>404 Error</span>
      </motion.div>
    </div>
    <div className="mt-12 text-center">
      <h1 className="text-8xl font-black italic italic uppercase tracking-tighter">Missed the mark.</h1>
      <p className="mt-4 text-zinc-400 font-medium">This pair is out of stock, or the link is dead.</p>
      <div className="mt-8 flex gap-4 justify-center">
        <button className="bg-black text-white px-6 py-2 flex items-center gap-2 hover:bg-zinc-800 transition-all">
          <MoveLeft size={16} /> Home
        </button>
        <button className="border border-black px-6 py-2 flex items-center gap-2 hover:invert transition-all">
          <Search size={16} /> Shop All
        </button>
      </div>
    </div>
  </div>
);

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

// --- VARIETY 4: THE CONCRETE JUNGLE (Streetwear/Brutalist) ---
const StreetStyle = () => (
  <div className="h-screen bg-[#eee] flex items-center justify-center font-sans">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-black max-w-4xl w-full mx-4 overflow-hidden">
      <div className="bg-black p-12 flex flex-col justify-between text-white aspect-square md:aspect-auto">
        <h1 className="text-9xl font-black italic leading-none">404</h1>
        <div className="space-y-4">
          <p className="text-xs tracking-widest uppercase opacity-60">Status: Discontinued</p>
          <p className="text-xl font-medium leading-tight">The sneakers you're looking for have moved to a different warehouse.</p>
        </div>
      </div>
      <div className="bg-white p-12 flex flex-col justify-center gap-6">
        <div className="space-y-2">
          <div className="h-1 w-20 bg-black" />
          <h2 className="text-4xl font-black uppercase">Wiped Out.</h2>
        </div>
        <nav className="flex flex-col gap-3 font-bold uppercase tracking-tighter text-2xl">
          <a href="#" className="hover:line-through decoration-4">Shop Latest</a>
          <a href="#" className="hover:line-through decoration-4">Our Story</a>
          <a href="#" className="hover:line-through decoration-4">Support</a>
        </nav>
        <button className="mt-4 flex items-center justify-between w-full border-b-2 border-black pb-2 font-black uppercase italic">
          Go Back <MoveLeft />
        </button>
      </div>
    </div>
  </div>
);

// --- VARIETY 5: THE GLITCH (DIY/Zine Culture) ---
const ZineGlitch = () => (
  <div className="h-screen bg-white flex flex-col items-center justify-center p-4">
    <motion.div 
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      className="cursor-grab active:cursor-grabbing relative"
    >
      <div className="bg-black text-white p-4 -rotate-2 shadow-xl">
        <h1 className="text-7xl font-black tracking-tighter uppercase italic">Lost in the</h1>
      </div>
      <div className="bg-yellow-400 text-black p-2 rotate-3 -mt-4 ml-12 shadow-xl inline-block">
        <h1 className="text-7xl font-black tracking-tighter uppercase">Shred.</h1>
      </div>
      <motion.div 
        animate={{ x: [2, -2, 2], y: [1, -1, 1] }}
        transition={{ repeat: Infinity, duration: 0.1 }}
        className="absolute -top-10 -right-10 text-red-600 font-black text-4xl"
      >
        404
      </motion.div>
    </motion.div>
    <div className="mt-16 text-center max-w-sm">
      <p className="font-mono text-sm leading-relaxed mb-6">
        The page you are looking for has been skated over, waxed, and grinded into non-existence. 
      </p>
      <button className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 transition-transform active:scale-95">
        Return to Safety
      </button>
    </div>
  </div>
);

// --- MAIN WRAPPER COMPONENT ---
export default function Sneaker404Page() {
  const [variety, setVariety] = useState(0);
  const varieties = [
    <BrokenDeck />,
    <RollingWheel />,
    <EmptyBox />,
    <StreetStyle />,
    <ZineGlitch />
  ];

  return (
    <div className="relative">
      {/* Variety Switcher (For Preview Purposes) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-black/10 backdrop-blur-md p-2 rounded-full border border-white/20">
        {varieties.map((_, i) => (
          <button
            key={i}
            onClick={() => setVariety(i)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              variety === i ? 'bg-black text-white scale-110' : 'bg-white/50 text-black hover:bg-white'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={variety}
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.4 }}
        >
          {varieties[variety]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}