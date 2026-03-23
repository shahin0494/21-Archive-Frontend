import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { 
  ShoppingBag, 
  X, 
  Minus, 
  Plus, 
  ArrowRight, 
  CreditCard,
  PanelRight,
  Columns,
  List,
  Receipt,
  LayoutGrid,
  ShieldCheck
} from 'lucide-react';

// --- Mock Data ---
const INITIAL_CART = [
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
  { id: 'slide', name: 'Slide', icon: <PanelRight size={14} /> },
  { id: 'split', name: 'Split', icon: <Columns size={14} /> },
  { id: 'minimal', name: 'Minimal', icon: <List size={14} /> },
  { id: 'receipt', name: 'Receipt', icon: <Receipt size={14} /> },
  { id: 'grid', name: 'Grid', icon: <LayoutGrid size={14} /> },
];

export default function CartApp() {
  const [items, setItems] = useState(INITIAL_CART);
  const [activeVariety, setActiveVariety] = useState('split');
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setSubtotal(total);
  }, [items]);

  const updateQuantity = (id, delta) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] text-[#111] font-sans selection:bg-black selection:text-white pb-20">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#F8F8F8]/90 backdrop-blur-md px-6 py-6 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold text-xs rounded-full">
            <ShoppingBag size={14} />
          </div>
          <span className="text-sm font-bold tracking-widest uppercase hidden sm:block">Cart_View.02</span>
        </div>

        {/* Variety Switcher */}
        <nav className="flex bg-white rounded-full p-1 gap-1 border border-gray-200 shadow-sm">
          {VARIETIES.map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveVariety(v.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                activeVariety === v.id 
                ? 'bg-black text-white' 
                : 'text-gray-400 hover:text-black hover:bg-gray-50'
              }`}
            >
              {v.icon}
              <span className="hidden sm:inline">{v.name}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1400px] mx-auto p-4 md:p-8">
        <LayoutGroup>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeVariety}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {activeVariety === 'slide' && <CartSlide items={items} updateQuantity={updateQuantity} removeItem={removeItem} subtotal={subtotal} />}
              {activeVariety === 'split' && <CartSplit items={items} updateQuantity={updateQuantity} removeItem={removeItem} subtotal={subtotal} />}
              {activeVariety === 'minimal' && <CartMinimal items={items} updateQuantity={updateQuantity} removeItem={removeItem} subtotal={subtotal} />}
              {activeVariety === 'receipt' && <CartReceipt items={items} updateQuantity={updateQuantity} removeItem={removeItem} subtotal={subtotal} />}
              {activeVariety === 'grid' && <CartGrid items={items} updateQuantity={updateQuantity} removeItem={removeItem} subtotal={subtotal} />}
            </motion.div>
          </AnimatePresence>
        </LayoutGroup>
      </main>
    </div>
  );
}

// --- Common Components ---
const QuantityControl = ({ quantity, onUpdate }) => (
  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-8 w-24 bg-white">
    <button onClick={() => onUpdate(-1)} className="flex-1 flex items-center justify-center hover:bg-gray-50 transition-colors"><Minus size={12} /></button>
    <span className="flex-1 text-center text-xs font-medium">{quantity}</span>
    <button onClick={() => onUpdate(1)} className="flex-1 flex items-center justify-center hover:bg-gray-50 transition-colors"><Plus size={12} /></button>
  </div>
);

const CheckoutButton = ({ total }) => (
  <button className="w-full bg-black text-white h-14 rounded-xl flex items-center justify-between px-6 hover:bg-gray-900 transition-all active:scale-[0.99]">
    <span className="text-xs font-bold uppercase tracking-widest">Checkout</span>
    <span className="text-sm font-medium flex items-center gap-2">
      ${total.toFixed(2)} <ArrowRight size={16} />
    </span>
  </button>
);

// --- 1. Cart Slide (The Drawer) ---
function CartSlide({ items, updateQuantity, removeItem, subtotal }) {
  return (
    <div className="flex justify-end">
      <div className="w-full max-w-md bg-white min-h-[80vh] shadow-2xl border border-gray-100 rounded-2xl overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-light tracking-tight">Your Bag ({items.length})</h2>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.map((item) => (
            <motion.div layout key={item.id} className="flex gap-4">
              <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{item.sub} / {item.size}</p>
                </div>
                <div className="flex justify-between items-end">
                  <QuantityControl quantity={item.quantity} onUpdate={(d) => updateQuantity(item.id, d)} />
                  <button onClick={() => removeItem(item.id)} className="text-xs text-gray-400 underline hover:text-red-500">Remove</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100">
          <div className="flex justify-between mb-4 text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-bold">${subtotal.toFixed(2)}</span>
          </div>
          <CheckoutButton total={subtotal} />
        </div>
      </div>
    </div>
  );
}

// --- 2. Cart Split (Classic E-com) ---
function CartSplit({ items, updateQuantity, removeItem, subtotal }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Items Column */}
      <div className="lg:col-span-8">
        <h2 className="text-3xl font-light mb-8">Shopping Cart</h2>
        <div className="border-t border-gray-200">
          {items.map((item) => (
            <motion.div layout key={item.id} className="py-8 border-b border-gray-200 flex gap-6 sm:gap-8">
              <div className="w-32 h-32 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.sub}</p>
                    <div className="inline-block px-2 py-1 bg-gray-100 text-[10px] font-bold uppercase rounded mt-2">{item.size}</div>
                  </div>
                  {/* <p className="text-lg font-bold">${item.price.toFixed(2)}</p> */}
                </div>
                <div className="flex justify-between items-end mt-4">
                  <QuantityControl quantity={item.quantity} onUpdate={(d) => updateQuantity(item.id, d)} />
                  <button onClick={() => removeItem(item.id)} className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2Icon /> Remove
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary Column */}
      <div className="lg:col-span-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-32">
          <h3 className="text-lg font-bold mb-6">Order Summary</h3>
          <div className="space-y-4 mb-8 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-base text-black">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
          
          <CheckoutButton total={subtotal} />
          
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
            <ShieldCheck size={14} />
            <span>Secure Checkout with Authenticity Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 3. Cart Minimal (Focused Stack) ---
function CartMinimal({ items, updateQuantity, removeItem, subtotal }) {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-12">Your Selection</h2>
      
      <div className="space-y-12 mb-16">
        {items.map((item) => (
          <motion.div layout key={item.id} className="group relative">
            <div className="flex flex-col items-center">
              <div className="w-full h-64 bg-white rounded-2xl overflow-hidden mb-6 relative">
                 <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                 <button onClick={() => removeItem(item.id)} className="absolute top-4 right-4 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 hover:text-red-500">
                    <X size={16} />
                 </button>
              </div>
              <h3 className="text-2xl font-light tracking-tight">{item.name}</h3>
              <p className="text-sm text-gray-400 mt-2 mb-4">{item.sub} / {item.size}</p>
              <div className="flex items-center gap-6">
                {/* <span className="text-lg font-medium">${item.price.toFixed(2)}</span> */}
                <div className="h-4 w-px bg-gray-200"></div>
                <QuantityControl quantity={item.quantity} onUpdate={(d) => updateQuantity(item.id, d)} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white sticky bottom-8 p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center justify-between gap-8">
         <div className="text-left">
           <p className="text-xs text-gray-400 uppercase font-bold">Total</p>
           {/* <p className="text-xl font-bold">${subtotal.toFixed(2)}</p> */}
         </div>
         <button className="bg-black text-white px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-wider hover:scale-105 transition-transform">
           Proceed to Pay
         </button>
      </div>
    </div>
  );
}

// --- 4. Cart Receipt (The Ticket) ---
function CartReceipt({ items, updateQuantity, removeItem, subtotal }) {
  return (
    <div className="flex justify-center py-8">
      <div className="w-full max-w-sm bg-white p-8 shadow-2xl relative font-mono text-sm leading-relaxed">
        {/* Receipt Jagged Edge Top */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-[#F8F8F8]" style={{ clipPath: 'polygon(0 0, 5% 100%, 10% 0, 15% 100%, 20% 0, 25% 100%, 30% 0, 35% 100%, 40% 0, 45% 100%, 50% 0, 55% 100%, 60% 0, 65% 100%, 70% 0, 75% 100%, 80% 0, 85% 100%, 90% 0, 95% 100%, 100% 0)' }}></div>
        
        <div className="text-center mb-8 pt-4 border-b-2 border-dashed border-gray-200 pb-6">
          <h2 className="text-2xl font-black uppercase tracking-tighter">GRAIL.CORP</h2>
          <p className="text-xs text-gray-500 mt-1">Order #8842-19</p>
          <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-6 mb-8">
          {items.map((item) => (
            <motion.div layout key={item.id} className="flex flex-col">
              <div className="flex justify-between items-start font-bold">
                <span>{item.quantity}x {item.name}</span>
                {/* <span>${(item.price * item.quantity).toFixed(2)}</span> */}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1 pl-4 border-l-2 border-gray-100">
                <span>{item.sub} ({item.size})</span>
                <div className="flex gap-2">
                   <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-black">+</button>
                   <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-black">-</button>
                   <button onClick={() => removeItem(item.id)} className="hover:text-red-500">x</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="border-t-2 border-dashed border-gray-200 pt-6 space-y-2 mb-8">
          <div className="flex justify-between">
            <span>SUBTOTAL</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>TAX (0%)</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between text-lg font-black mt-4">
            <span>TOTAL</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
           <div className="h-12 bg-black text-white flex items-center justify-center font-bold uppercase cursor-pointer hover:bg-gray-800">
             Confirm Payment
           </div>
           <div className="text-[10px] text-center text-gray-400 mt-4">
             THANK YOU FOR SHOPPING WITH GRAIL.
           </div>
           <div className="flex justify-center mt-2">
             <div className="h-8 w-48 bg-gray-800 opacity-20"></div> {/* Fake Barcode */}
           </div>
        </div>

        {/* Receipt Jagged Edge Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#F8F8F8]" style={{ clipPath: 'polygon(0 100%, 5% 0, 10% 100%, 15% 0, 20% 100%, 25% 0, 30% 100%, 35% 0, 40% 100%, 45% 0, 50% 100%, 55% 0, 60% 100%, 65% 0, 70% 100%, 75% 0, 80% 100%, 85% 0, 90% 100%, 95% 0, 100% 100%)' }}></div>
      </div>
    </div>
  );
}

// --- 5. Cart Grid (Visual Gallery) ---
function CartGrid({ items, updateQuantity, removeItem, subtotal }) {
  return (
    <div>
      <div className="flex justify-between items-end mb-8 border-b border-black pb-4">
        <h2 className="text-4xl font-black uppercase tracking-tighter">Your Haul</h2>
        <p className="text-xl font-medium">${subtotal.toFixed(2)}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {items.map((item) => (
          <motion.div layout key={item.id} className="bg-white p-4 border border-gray-100 hover:border-black transition-colors group">
            <div className="aspect-square bg-gray-100 mb-4 overflow-hidden relative">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/50 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="font-mono text-xs">{item.size}</p>
              </div>
            </div>
            <div className="flex justify-between items-start mb-4">
               <div>
                 <h3 className="font-bold uppercase text-sm leading-tight">{item.name}</h3>
                 <p className="text-xs text-gray-500">{item.sub}</p>
               </div>
               <span className="font-medium text-sm">${item.price}</span>
            </div>
            
            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <QuantityControl quantity={item.quantity} onUpdate={(d) => updateQuantity(item.id, d)} />
              <button onClick={() => removeItem(item.id)} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors"><Trash2Icon size={16} /></button>
            </div>
          </motion.div>
        ))}
        
        {/* Checkout Card in Grid */}
        <div className="bg-black text-white p-8 flex flex-col justify-between aspect-square">
           <div>
             <h3 className="text-2xl font-bold uppercase mb-2">Ready?</h3>
             <p className="text-gray-400 text-sm">Review your selection and proceed to secure payment.</p>
           </div>
           <div className="space-y-4">
             <div className="flex justify-between text-sm border-b border-gray-800 pb-2">
               <span>Total Items</span>
               <span>{items.reduce((a,c) => a+c.quantity,0)}</span>
             </div>
             <div className="flex justify-between text-xl font-bold">
               <span>Total</span>
               <span>${subtotal.toFixed(2)}</span>
             </div>
             <button className="w-full bg-white text-black py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
               Pay Now
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}

// Helper Icon
function Trash2Icon({ size = 16 }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M3 6h18"/>
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
      <line x1="10" x2="10" y1="11" y2="17"/>
      <line x1="14" x2="14" y1="11" y2="17"/>
    </svg>
  );
}