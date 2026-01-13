import React, { useState } from 'react';
import { ShoppingBag, Heart, Menu, ArrowRight, Plus, Minus } from 'lucide-react';''
import Header from '../components/Header'
import FooterCleanClassic from '../components/Footer';

// Product Data - Premium Editorial Style
const products = [
  {
    id: 1,
    name: "Ghost Low",
    subtitle: "Essential Collection",
    price: 185,
    description: "Stripped back to the absolute essentials. The Ghost Low features premium Italian leather and a monochrome palette designed to disappear into any outfit while making a silent statement.",
    details: ["Premium Italian Leather", "Hand-stitched sole", "Memory foam insole", "Made in Portugal"],
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200&flip=h", // Simulated variety
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200&rot=180", // Simulated variety
    ],
  },
  {
    id: 2,
    name: "Canyon Runner",
    subtitle: "Terra Firma Series",
    price: 210,
    description: "Inspired by the sedimentary layers of the Grand Canyon. Breathable mesh meets rugged suede overlays for a shoe that handles the trail as comfortably as it handles the street.",
    details: ["Rugged Suede Overlays", "Vibram® Outsole", "Water-resistant mesh", "Reinforced toe cap"],
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=1200&flip=h",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=1200&rot=180",
    ],
  },
  {
    id: 3,
    name: "Volt Strike",
    subtitle: "Night Run Division",
    price: 245,
    description: "Not for the faint of heart. The Volt Strike utilizes our proprietary energy-return foam in a silhouette that demands attention. Designed for night runs and neon lights.",
    details: ["Energy Return Foam", "3M Reflective details", "Flyknit upper", "Carbon fiber plate"],
    images: [
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=1200&flip=h",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=1200&rot=180",
    ],
  },
  {
    id: 4,
    name: "Midnight Air",
    subtitle: "Stealth Ops",
    price: 195,
    description: "Engineered for the shadows. A triple-black colorway with reflective 3M detailing that only reveals itself when the light hits just right.",
    details: ["Triple Black Colorway", "Hidden lacing system", "Air-cushioned sole", "Anti-abrasion coating"],
    images: [
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&q=80&w=1200&flip=h",
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&q=80&w=1200&rot=180",
    ],
  },
  {
    id: 5,
    name: "Retro Court",
    subtitle: "Archive 1993",
    price: 170,
    description: "A love letter to the 90s. We dug into the archives to bring back the chunky silhouette and bold blue accents, updated with modern comfort materials.",
    details: ["Full-grain leather", "Archive silhouette", "Yellowed vintage sole", "Padded tongue"],
    images: [
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=1200&flip=h",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=1200&rot=180",
    ],
  }
];

const sizes = [39, 40, 41, 42, 43, 44, 45, 46];



const App = () => {
  const [activeId, setActiveId] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const product = products[activeId];

  const handleStyleChange = (index) => {
    if (index === activeId) return;
    setIsAnimating(true);
    // Smooth scroll to top of page when changing product
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      setActiveId(index);
      setIsAnimating(false);
      setSelectedSize(null);
    }, 500);
  };

  return (
    <div className="bg-white text-black font-sans selection:bg-black selection:text-white">
<Header/>
      <main className="flex flex-col lg:flex-row pt-20">

        {/* Left Side - Vertical Scroll Gallery */}
        <div className="w-full lg:w-[65%] bg-gray-50/50">
          <div className={`flex flex-col gap-4 lg:gap-8 p-4 lg:p-8 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            {product.images.map((img, idx) => (
              <div key={idx} className="w-full h-[85vh] relative overflow-hidden bg-gray-200">
                <img
                  src={img}
                  alt={`${product.name} view ${idx + 1}`}
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-[2000ms]"
                />
                {/* Subtle Image Counter */}
                <div className="absolute bottom-6 left-6 text-xs font-bold text-black/50 uppercase tracking-widest bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full">
                  {idx + 1} — {product.images.length}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Sticky Product Details */}
        <div className="w-full lg:w-[35%] relative">
          <div className="sticky top-20 h-[calc(100vh-80px)] overflow-y-auto px-8 py-12 lg:px-16 lg:py-20 flex flex-col justify-between">

            <div className={`transition-all duration-500 delay-100 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              {/* Header */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
                  <span className="text-xs sat font-bold uppercase tracking-[0.2em] text-gray-500">{product.subtitle}</span>
                </div>
                <h1 className="text-5xl sat lg:text-6xl font-medium tracking-tighter mb-4 leading-[0.9]">{product.name}</h1>
                <p className="text-2xl sat font-light tracking-tight text-gray-900">${product.price}</p>
              </div>

              {/* Description */}
              <div className="mb-12 border-t border-gray-100 pt-8">
                <p className="text-sm sat font-medium leading-loose text-gray-500 max-w-sm mb-6">
                  {product.description}
                </p>
                <ul className="space-y-2">
                  {product.details.map((detail, i) => (
                    <li key={i} className="text-xs sat font-bold uppercase tracking-wider flex items-center gap-2">
                      <Plus size={10} className="text-gray-400 " /> {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Variant Selector */}
              <div className="mb-12">
                <span className="text-xs sat font-bold uppercase tracking-widest text-gray-400 block mb-4">Colorway</span>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {products.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => handleStyleChange(idx)}
                      className={`flex-shrink-0 w-16 h-20 border transition-all sat duration-300 relative group
                              ${activeId === idx ? 'border-black opacity-100' : 'border-transparent opacity-50 hover:opacity-100 grayscale hover:grayscale-0'}
                           `}
                    >
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-12">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-xs font-bold uppercase sat tracking-widest text-gray-400">Select Size (EU)</span>
                  <button className="text-xs font-bold underline  sat decoration-gray-300 underline-offset-4 hover:decoration-black transition-all">Size Guide</button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-12 sat border text-sm transition-colors duration-200 flex items-center justify-center
                               ${selectedSize === size
                          ? 'bg-black text-white border-black'
                          : 'border-gray-200 text-gray-900 hover:border-black'}
                            `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Area */}
            <div className="pt-6 bg-white border-t border-gray-100">
              <button
                disabled={!selectedSize}
                className={`w-full h-16  bg-black text-white text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:bg-gray-900 flex items-center justify-between px-8 group
                    ${!selectedSize && 'opacity-50 cursor-not-allowed hover:bg-black'}
                  `}
              >
                <span className='sat'>{selectedSize ? 'Add to Bag' : 'Select Size'}</span>
                <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${selectedSize ? 'group-hover:translate-x-2' : ''}`} />
              </button>
              <div className="text-center mt-4 text-[10px] text-gray-400 font-medium uppercase sat tracking-widest">
                Free shipping worldwide • 30-day returns
              </div>
            </div>

          </div>
        </div>

      </main>
      
    </div>
  );
};

export default App;