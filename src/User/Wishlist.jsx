import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  ExternalLink, 
  LayoutGrid, 
  List, 
  Layers, 
  MoveRight,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight
} from 'lucide-react';

// --- Mock Data with Real Photography ---
const INITIAL_WISHLIST = [
  { 
    id: 1, 
    name: 'Dunk Low Pro', 
    sub: 'Chicago Colorway',
    price: '$450.00', 
    size: 'US 10.5', 
    brand: 'Nike SB', 
    image: '/snkr1.png' 
  },
  { 
    id: 2, 
    name: 'Air Jordan 1 Retro', 
    sub: 'Dark Mocha',
    price: '$520.00', 
    size: 'US 9.0', 
    brand: 'Jordan Brand', 
image: '/snkr2.png'  },
  { 
    id: 3, 
    name: 'Yeezy Slide', 
    sub: 'Pure / Bone',
    price: '$140.00', 
    size: 'US 10.0', 
    brand: 'Adidas', 
image: '/snkr3.png'  },
  { 
    id: 4, 
    name: '2002R Protection', 
    sub: 'Rain Cloud',
    price: '$190.00', 
    size: 'US 11.0', 
    brand: 'New Balance', 
image: '/snkr5.png'  },
  { 
    id: 5, 
    name: 'AJ1 Low OG', 
    sub: 'Reverse Mocha',
    price: '$1,200.00', 
    size: 'US 9.5', 
    brand: 'Travis Scott', 
image: '/snkr7.png'  },
];

const VARIETIES = [
  { id: 'stack', name: 'Stack', icon: <Layers size={14} /> },
  { id: 'grid', name: 'Grid', icon: <LayoutGrid size={14} /> },
  { id: 'rail', name: 'Rail', icon: <MoveRight size={14} /> },
  { id: 'list', name: 'Index', icon: <List size={14} /> },
  { id: 'focus', name: 'Focus', icon: <Plus size={14} /> },
];

export default function App() {
  const [items, setItems] = useState(INITIAL_WISHLIST);
  const [activeVariety, setActiveVariety] = useState('stack');

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111] font-sans selection:bg-[#EAEAEA] selection:text-black pb-20">
      
      {/* Minimal Header */}
      <header className="sticky top-0 z-50 bg-[#FAFAFA]/90 backdrop-blur-sm px-6 py-6 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-black rounded-full" />
          <h1 className="text-sm font-medium tracking-widest uppercase">Grail Registry_05</h1>
        </div>

        {/* Minimal Variety Switcher */}
        <nav className="flex bg-[#F0F0F0] rounded-full p-1 gap-1">
          {VARIETIES.map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveVariety(v.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                activeVariety === v.id 
                ? 'bg-white text-black shadow-sm' 
                : 'text-gray-400 hover:text-black'
              }`}
            >
              {v.icon}
              <span className="hidden sm:inline">{v.name}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1600px] mx-auto p-6 md:p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVariety}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeVariety === 'stack' && <ViewStack items={items} onRemove={removeItem} />}
            {activeVariety === 'grid' && <ViewGrid items={items} onRemove={removeItem} />}
            {activeVariety === 'rail' && <ViewRail items={items} onRemove={removeItem} />}
            {activeVariety === 'list' && <ViewList items={items} onRemove={removeItem} />}
            {activeVariety === 'focus' && <ViewFocus items={items} onRemove={removeItem} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

// --- 1. The Stack (Editorial Lists) ---
function ViewStack({ items, onRemove }) {
  return (
    <div className="flex flex-col gap-px bg-gray-100 border border-gray-100">
      {items.map((item, i) => (
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
          key={item.id}
          className="group relative flex flex-col md:flex-row bg-white hover:bg-gray-50 transition-colors h-auto md:h-64"
        >
          {/* Image Area */}
          <div className="w-full md:w-1/3 h-64 md:h-full relative overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
            />
          </div>

          {/* Content Area */}
          <div className="flex-1 p-8 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 block mb-2">{item.brand}</span>
                <h3 className="text-2xl md:text-3xl font-light tracking-tight">{item.name}</h3>
                <p className="text-gray-400 font-light mt-1">{item.sub}</p>
              </div>
              <div className="text-right">
                <span className="block text-xl font-medium">{item.price}</span>
                <span className="text-xs text-gray-400 font-mono">SIZE: {item.size}</span>
              </div>
            </div>

            <div className="flex justify-between items-end mt-8">
              <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:underline">
                View Analysis <ArrowUpRight size={14} />
              </button>
              <button 
                onClick={() => onRemove(item.id)}
                className="text-gray-300 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// --- 2. The Grid (Gallery) ---
function ViewGrid({ items, onRemove }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
      {items.map((item, i) => (
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
          key={item.id}
          className="group cursor-pointer"
        >
          <div className="relative aspect-[4/5] bg-gray-100 mb-6 overflow-hidden">
             <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <button 
              onClick={(e) => { e.stopPropagation(); onRemove(item.id); }}
              className="absolute top-4 right-4 p-2 bg-white/0 text-white opacity-0 group-hover:opacity-100 group-hover:bg-black/20 backdrop-blur-md rounded-full transition-all"
            >
              <Trash2 size={14} />
            </button>
          </div>
          
          <div className="flex justify-between items-baseline">
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wide">{item.name}</h3>
              <p className="text-xs text-gray-400 mt-1">{item.brand} — {item.size}</p>
            </div>
            <span className="text-sm font-mono text-gray-500">{item.price}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// --- 3. The Rail (Horizontal Scroll) ---
function ViewRail({ items, onRemove }) {
  return (
    <div className="w-full h-[60vh] flex items-center overflow-x-auto gap-8 pb-8 snap-x no-scrollbar px-12">
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="snap-center shrink-0 w-[400px] group"
        >
          <div className="relative aspect-square bg-gray-50 mb-6 overflow-hidden">
             <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/5 transition-colors z-10" />
             <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between border-b border-black pb-2 mb-2">
               <span className="text-xs font-bold uppercase tracking-widest">{item.brand}</span>
               <span className="text-xs font-mono">{item.price}</span>
            </div>
            <h3 className="text-3xl font-light leading-none">{item.name}</h3>
            <div className="flex justify-between items-center mt-2">
               <span className="text-xs text-gray-400">{item.sub}</span>
               <button onClick={() => onRemove(item.id)} className="text-xs text-red-400 hover:text-red-600">REMOVE</button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// --- 4. The Index (Technical List) ---
function ViewList({ items, onRemove }) {
  return (
    <div className="border-t border-gray-200">
      <div className="grid grid-cols-12 gap-4 py-4 border-b border-gray-200 text-[10px] font-bold uppercase tracking-widest text-gray-400">
        <div className="col-span-1 hidden md:block">Ref</div>
        <div className="col-span-2 hidden md:block">Preview</div>
        <div className="col-span-5 md:col-span-4">Product</div>
        <div className="col-span-2">Size</div>
        <div className="col-span-3 md:col-span-2 text-right">Market Value</div>
        <div className="col-span-1 hidden md:block text-right"></div>
      </div>
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          layout
          className="grid grid-cols-12 gap-4 py-4 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors group"
        >
          <div className="col-span-1 hidden md:block text-xs font-mono text-gray-300">0{i + 1}</div>
          <div className="col-span-2 hidden md:block">
            <div className="w-16 h-10 bg-gray-100 overflow-hidden">
              <img src={item.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"/>
            </div>
          </div>
          <div className="col-span-5 md:col-span-4">
             <h4 className="text-sm font-medium">{item.name}</h4>
             <p className="text-[10px] text-gray-400 uppercase tracking-wide">{item.brand} / {item.sub}</p>
          </div>
          <div className="col-span-2 text-xs font-mono text-gray-500">{item.size}</div>
          <div className="col-span-3 md:col-span-2 text-right text-sm font-medium">{item.price}</div>
          <div className="col-span-1 hidden md:flex justify-end">
            <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-black transition-colors"><Trash2 size={14} /></button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// --- 5. The Focus (Ultra Minimal Editorial) ---
function ViewFocus({ items, onRemove }) {
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
          {/* Text Column (Sticky) */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col pt-4 md:sticky md:top-32">
             <div className="mb-12">
                <span className="text-[10px] font-mono text-gray-300 block mb-6">ITEM 0{i+1}</span>
                <h2 className="text-4xl md:text-5xl font-light tracking-tighter leading-[0.95] mb-4 text-black">{item.name}</h2>
                <p className="text-sm text-gray-400 font-light">{item.sub}</p>
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
                   <button className="text-xs font-bold uppercase tracking-widest hover:text-gray-600 transition-colors">Purchase</button>
                   <button onClick={() => onRemove(item.id)} className="text-xs font-bold uppercase tracking-widest text-red-200 hover:text-red-500 transition-colors">Remove</button>
                </div>
             </div>
          </div>

          {/* Image Column */}
          <div className="md:col-span-8 lg:col-span-9 order-first md:order-last">
             <div className="aspect-[3/4] md:aspect-[16/10] bg-gray-50 overflow-hidden w-full">
                <motion.img 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                />
             </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}