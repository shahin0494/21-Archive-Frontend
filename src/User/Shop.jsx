import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowRight, X, Plus, Search } from "lucide-react";
import Header from '../components/Header'
import { useLocation } from "react-router-dom";
import FooterCleanClassic from "../components/Footer";
import CurtainTransition from "../components/CurtainTransition";

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

const SNEAKERS = [
  {
    id: 1,
    name: "Air Force 1 '07",
    brand: "Nike",
    price: "$110.00",
    category: "Lifestyle",
    gender: "men",
    bg: "bg-gray-50",
    accent: "text-gray-800",
    image:
      "https://extrabutterny.in/cdn/shop/files/AURORA_CW2288-111_PHSLH000-2000.jpg?v=1731659048",
    desc:
      "A streetwear icon with timeless design, premium leather, and everyday comfort."
  },
  {
    id: 2,
    name: " Originals Samba OG",
    brand: "Adidas",
    price: "$100.00",
    category: "Lifestyle",
    gender: "men",
    bg: "bg-neutral-50",
    accent: "text-neutral-800",
    image:
      "https://assets.adidas.com/images/w_600,f_auto,q_auto/3bbecbdf584e40398446a8bf0117cf62_9366/Samba_OG_Shoes_White_B75806_01_00_standard.jpg",
    desc:
      "A legendary terrace classic redefined for modern street culture."
  },
  {
    id: 3,
    name: "550",
    brand: "New Balance",
    price: "$120.00",
    category: "Heritage",
    gender: "men",
    bg: "bg-stone-50",
    accent: "text-stone-800",
    image:
      "https://www.superkicks.in/cdn/shop/files/1_40a7dfc7-8487-450b-b6f7-b382249fe335.jpg?v=1711439152&width=1946",
    desc:
      "A retro basketball silhouette turned modern lifestyle essential."
  },
  {
    id: 4,
    name: "Gel-Kayano 30",
    brand: "Asics",
    price: "$160.00",
    category: "Running",
    gender: "men",
    bg: "bg-blue-50",
    accent: "text-blue-600",
    image:
      "https://www.runningxpert.com/media/catalog/product/cache/e1bfa30f5f000aa573b2ee969a7a0fde/1/0/1011b685_002_sr_rt_glb_png_1500x1500-jpg.jpg",
    desc:
      "Industry-leading stability and cushioning for long-distance runners."
  },
  {
    id: 5,
    name: " Palermo OG",
    brand: "Puma",
    price: "$90.00",
    category: "Lifestyle",
    gender: "men",
    bg: "bg-yellow-50",
    accent: "text-yellow-600",
    image:
      "https://www.careofcarl.com/bilder/artiklar/zoom/27066711r_1.jpg?m=1727445485",
    desc:
      "A revived terrace classic blending football heritage with street style."
  },
  {
    id: 6,
    name: "Nike Air Zoom Pegasus 40",
    price: "$130.00",
    category: "Running",
    gender: "women",
    bg: "bg-pink-50",
    accent: "text-pink-600",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800",
    desc: "Responsive cushioning and lightweight support designed for everyday runs."
  },
  {
    id: 7,
    name: "adidas Ultraboost Light",
    price: "$190.00",
    category: "Running",
    gender: "women",
    bg: "bg-purple-50",
    accent: "text-purple-600",
    image: "https://images.unsplash.com/photo-1600185365926-3f8c1a94bcd2?auto=format&fit=crop&q=80&w=800",
    desc: "Energy-return cushioning with a sleek silhouette built for comfort."
  },
  {
    id: 8,
    name: "New Balance 327",
    price: "$100.00",
    category: "Lifestyle",
    gender: "women",
    bg: "bg-rose-50",
    accent: "text-rose-600",
    image: "https://images.unsplash.com/photo-1624005340901-e9b2c6a6c2c4?auto=format&fit=crop&q=80&w=800",
    desc: "A bold retro-inspired design with modern everyday comfort."
  }
];


/* -------------------------------------------------------------------------- */
/*                               SNEAKER CARD                                 */
/* -------------------------------------------------------------------------- */

const SneakerCard = ({ sneaker, onSelect }) => (
  <motion.div
    layoutId={`card-${sneaker.id}`}

    className="cursor-pointer space-y-4 group"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    {/* Image */}
    <div className={`relative aspect-[4/5] rounded-xl overflow-hidden ${sneaker.bg}`}>
      <motion.img
        layoutId={`image-${sneaker.id}`}
        src={sneaker.image}
        alt={sneaker.name}
        className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition"
      />

      {/* Quick add */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition">
        <div className="bg-white p-3 rounded-full shadow">
          <Plus className="w-5 h-5" />
        </div>
      </div>
    </div>

    {/* Info */}
    <div className="px-3 py-4">
      <div className="flex justify-between items-baseline ">
        <h2 className="text-lg sat font-medium tracking-wide text-gray-600">{sneaker.brand}</h2>
      </div>
      <div className="flex items-center justify-between  gap-2">
        <h3 className="text-sm sat font-medium tracking-wide text-gray-500">{sneaker.name}</h3>

        <span className="sat font-medium text-gray-900">{sneaker.price}</span>
      </div>
      <hr className="border-b border-gray-100 my-1" />
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-400 uppercase tracking-widest sat font-medium">{sneaker.category}</p>
        <div className="w-2 h-2 rounded-full bg-gray-200 group-hover:bg-black transition-colors" />
      </div>
    </div>
  </motion.div>
);


/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default function App() {



  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [activeSneaker, setActiveSneaker] = useState(null);

  const location = useLocation();

  const activeGender =
    location.pathname === "/shop/men"
      ? "men"
      : location.pathname === "/shop/women"
        ? "women"
        : "all";

  const filteredSneakers =
    activeGender === "all"
      ? SNEAKERS
      : SNEAKERS.filter((s) => s.gender === activeGender);

  const visibleSneakers = filteredSneakers
    .filter((s) =>
      categoryFilter === "all" ? true : s.category === categoryFilter
    )
    .sort((a, b) => {
      if (sortBy === "price-low") {
        return parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", ""));
      }
      if (sortBy === "price-high") {
        return parseFloat(b.price.replace("$", "")) - parseFloat(a.price.replace("$", ""));
      }
      return 0;
    });

  return (
    <>
    <Header/>
      <CurtainTransition>
        <div className="min-h-screen mt-25 px-5 bg-white text-gray-900">
          {/* header */}
          
          {/* Content */}
          <main className="ma mx-auto px-6 pt-5 ">
            {/* Header */}
            <div className=" text-start flex justify-center py-3 0">
              {/* <h1 className="text-6xl  sat font-bold tracking-tight">
                Discover
                <span className="text-gray-300 sat font-bold tracking-tight"> Men.</span>
              </h1> */}
              <div className={`relative flex items-center transition-all duration-300 ${isSearchOpen ? 'w-98' : 'w-66'}`}>
                <Search size={16} strokeWidth={1.5} className="absolute left-0 text-neutral-900 pointer-events-none" />
                <input
                  type="text"
                  placeholder="SEARCH"
                  onFocus={() => setIsSearchOpen(true)}
                  onBlur={() => setIsSearchOpen(false)}
                  className="w-full sat bg-transparent border-b border-neutral-300 focus:border-black py-1 pl-6 text-[10px] font-bold tracking-widest uppercase placeholder:text-neutral-400 outline-none
                  transition-all"
                />
              </div>
              <div className="flex items-center gap-6 ml-8">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sat bg-transparent border-b border-neutral-300 text-[10px] font-bold tracking-widest uppercase outline-none"
                >
                  <option value="default">Sort</option>
                  <option value="price-low">Price: Low → High</option>
                  <option value="price-high">Price: High → Low</option>
                </select>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="sat bg-transparent border-b border-neutral-300 text-[10px] font-bold tracking-widest uppercase outline-none"
                >
                  <option value="all">All</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Running">Running</option>
                  <option value="Heritage">Heritage</option>
                </select>
              </div>
            </div>
            <hr className="py-4 ms-1 text-neutral-200" />
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
              {visibleSneakers.map((sneaker) => (
                <SneakerCard
                  key={sneaker.id}
                  sneaker={sneaker}
                  onSelect={setActiveSneaker}
                />
              ))}
            </div>
          </main>
          {/* Modal */}
          <AnimatePresence>
            {activeSneaker && (
              <SneakerModal
                sneaker={activeSneaker}
                onClose={() => setActiveSneaker(null)}
              />
            )}
          </AnimatePresence>
          {/* <FooterCleanClassic/> */}
        </div>
      </CurtainTransition>
    </>
  );
}