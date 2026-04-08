import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import Header from '../components/Header'
import { useLocation } from "react-router-dom";
import CurtainTransition from "../components/CurtainTransition";
import { getAllSneakersAPI } from "@/Services/allAPI";
import { Link } from "react-router-dom";

export default function App() {

  // 1. UPDATED SNEAKER CARD TO HANDLE EMPTY IMAGES SAFELY
  const SneakerCard = ({ sneaker, onSelect }) => (
    <Link to={`/sneakers/${sneaker._id}/view`}>
      <motion.article
        layoutId={`card-${sneaker._id}`}
        onClick={() => onSelect?.(sneaker)}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        whileHover={{ y: 0 }}
        className="group cursor-pointer border border-neutral-100 rounded-2xl bg-white hover:border-neutral-300 transition-all duration-200"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-2xl bg-neutral-50 flex items-center justify-center">
          {/* Safely check if photos array exists AND has items */}
          {sneaker.photos && sneaker.photos.length > 0 ? (
            <img
              src={sneaker.photos[0]}
              alt={sneaker.sneakerName}
              className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <span className="text-gray-400 text-sm">No Image</span>
          )}
        </div>
        <div className="px-4 py-4">
          <p className="text-xs text-gray-400 uppercase">{sneaker.brand}</p>
          <h3 className="text-sm font-medium uppercase">{sneaker.sneakerName}</h3>
          <p className="text-sm font-semibold mt-1">₹{sneaker.price}</p>
        </div>
      </motion.article>
    </Link>
  );

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeSneaker, setActiveSneaker] = useState(null);
  const location = useLocation();

  const [token, setToken] = useState("");
  const [sneaker, setSneaker] = useState([]);
  console.log(sneaker);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const userToken = sessionStorage.getItem("token");
      setToken(userToken);
      getAllSneakers(userToken);
    } else {
      setLoading(false);
    }
  }, []);

  const getAllSneakers = async (userToken) => {
    const reqHeader = { "Authorization": `Bearer ${userToken}` };
    try {
      const result = await getAllSneakersAPI(reqHeader);
      if (result.status === 200) {
        const dataToSet = Array.isArray(result.data) ? result.data : result.data.sneakers || [];
        setSneaker(dataToSet);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const activeGender =
    location.pathname === "/shop/men"
      ? "men"
      : location.pathname === "/shop/women"
        ? "women"
        : "all";

  // 2. FIXED GENDER FILTERING (Matches "Male" to "men" and includes "Unisex")
  const filteredSneakers =
    activeGender === "all"
      ? sneaker
      : sneaker.filter((s) => {
        const dbGender = (s.gender || "").toLowerCase();
        if (activeGender === "men") return dbGender === "men" || dbGender === "unisex";
        if (activeGender === "women") return dbGender === "women" || dbGender === "unisex";
        return true;
      });

  // 3. FIXED CATEGORY AND PRICE SORTING (Uses s.type, and Number(s.price))
  const visibleSneakers = filteredSneakers
    .filter((s) =>
      categoryFilter === "all" ? true : (s.type || "").toLowerCase() === categoryFilter.toLowerCase()
    )
    .sort((a, b) => {
      const priceA = Number(a.price) || 0;
      const priceB = Number(b.price) || 0;

      if (sortBy === "price-low") return priceA - priceB;
      if (sortBy === "price-high") return priceB - priceA;

      return 0;
    });

  return (
    <>
      <Header />
      <CurtainTransition>
        <div className="min-h-screen mt-25 px-5 bg-white text-gray-900">
          <main className="ma mx-auto px-6 pt-5 ">

            {/* Header / Controls */}
            <div className=" text-start flex justify-center py-3 0">
              <div className={`relative flex items-center transition-all duration-300 ${isSearchOpen ? 'w-98' : 'w-66'}`}>
                <Search size={16} strokeWidth={1.5} className="absolute left-0 text-neutral-900 pointer-events-none" />
                <input
                  type="text"
                  placeholder="SEARCH"
                  onFocus={() => setIsSearchOpen(true)}
                  onBlur={() => setIsSearchOpen(false)}
                  className="w-full sat bg-transparent border-b border-neutral-300 focus:border-black py-1 pl-6 text-[10px] font-bold tracking-widest uppercase placeholder:text-neutral-400 outline-none transition-all"
                />
              </div>
              <div className="flex items-center gap-6 ml-8">

                {/* SORTING */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sat bg-transparent border-b border-neutral-300 text-[10px] font-bold tracking-widest uppercase outline-none"
                >
                  <option value="default">Sort</option>
                  <option value="price-low">Price: Low → High</option>
                  <option value="price-high">Price: High → Low</option>
                </select>

                {/* 4. UPDATED CATEGORY DROPDOWN TO MATCH YOUR DB */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="sat bg-transparent border-b border-neutral-300 text-[10px] font-bold tracking-widest uppercase outline-none"
                >
                  <option value="all">All</option>
                  <option value="modern">Modern</option>
                  <option value="skateboarding">Skateboarding</option>
                  <option value="cultural`">Cultural</option>
                </select>
              </div>
            </div>

            <hr className="py-4 ms-1 text-neutral-200" />

            {/* Grid */}
            {loading ? (
              <div className="text-center py-20 text-gray-500 font-bold uppercase tracking-widest text-sm">
                Loading Data...
              </div>
            ) : visibleSneakers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                {visibleSneakers.map((snk) => (
                  <SneakerCard
                    key={snk._id}
                    sneaker={snk}
                    onSelect={setActiveSneaker}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-500 font-bold uppercase tracking-widest text-sm">
                No sneakers found for this filter.
              </div>
            )}
          </main>

        </div>
      </CurtainTransition>
    </>
  );
}