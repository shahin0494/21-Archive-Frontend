import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Ensure AnimatePresence is imported if you plan to use it later
import { ShoppingBag, Search, User, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import CurtainTransition from './CurtainTransition'

// --- Animation Variants ---

const springRiseVariant = {
  hidden: { y: "100%", opacity: 0 },
  show: (i) => ({
    y: "0%",
    opacity: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const navContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// --- Reusable Components ---

const MagnetLink = ({ label, path, index }) => {
  return (
    <Link to={path} className="group relative block overflow-hidden cursor-pointer py-2">
      <div className="relative overflow-hidden text-xs lg:text-sm font-bold uppercase tracking-[0.2em] text-neutral-900">
        <motion.span
          className="block group-hover:-translate-y-full sat transition-transform duration-500 ease-[0.16,1,0.3,1]"
        >
          {label}
        </motion.span>
        <motion.span
          className="absolute top-0 left-0 block sat translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] text-red-700"
          aria-hidden="true"
        >
          {label}
        </motion.span>
      </div>
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-900 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
    </Link>
  );
};

const UtilityItem = ({ icon: Icon, label, count, path }) => {
  return (
    <Link
      to={path}
      className="group flex items-center gap-2 text-neutral-900 hover:text-neutral-500 transition-colors"
    >
      <div className="relative overflow-hidden h-4 w-auto flex items-center">
        {Icon && <Icon size={16} strokeWidth={1.5} className="mr-2" />}
        <div className="flex flex-col h-full relative">
          <span className="text-[10px] sat font-bold uppercase tracking-widest leading-4 group-hover:-translate-y-4 transition-transform duration-300 ease-out">
            {label}
          </span>
          <span className="absolute sat top-0 left-0 text-[10px] font-bold uppercase tracking-widest leading-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out text-red-700">
            {label}
          </span>
        </div>
      </div>
      {count !== undefined && (
        <span className="text-[10px] font-medium text-neutral-400 group-hover:text-black">
          ({count})
        </span>
      )}
    </Link>
  );
};

// --- Main Header Component ---

const PremiumHeader = () => {

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 1. New State to track preloader status
  const [isLoaded, setIsLoaded] = useState(() => {
    return sessionStorage.getItem("headerLoaded") === "true";
  });

  const location = useLocation();

  // 2. Timer to trigger header appearance after 4 seconds
  useEffect(() => {
    if (isLoaded) return;

    const timer = setTimeout(() => {
      setIsLoaded(true);
      sessionStorage.setItem("headerLoaded", "true");
    }, 4000);

    return () => clearTimeout(timer);
  }, [isLoaded]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Men", path: "/shop/men" },
    { label: "Women", path: "/shop/women" },
    { label: "Red", path: "/archive" },
    { label: "Origin", path: "/about" },
  ];

  return (
    // 3. Changed <header> to <motion.header> for entrance animation
    <>
      <motion.header
        key={location.pathname}
        initial={{ y: "-20%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-20%", opacity: 0 }}
        transition={{ duration: 0.54, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0  bg-white left-0 w-full z-50 transition-colors duration-500 border-b  ${isScrolled
            ? 'bg-white/95 backdrop-blur py-4 border-neutral-200'
            : 'bg-transparent py-4 border-transparent'
          }`}
      >
        <div className="max-w-[1600px] h-full mx-auto px-6  lg:px-12">
          <motion.nav
            className="flex items-center justify-between"
            variants={navContainerVariants}
            initial="hidden"
            // 4. Bind the internal items animation to the loading state
            animate={isLoaded ? "show" : "hidden"}
          >
            {/* Left Section: Logo & Brand */}
            <div className="flex-1 flex items-center justify-start">
              <Link to="/" className="group relative z-20">
                <div className="overflow-hidden">
                  <motion.h1
                    variants={springRiseVariant}
                    custom={0}
                    className="text-5xl goth font-black tracking-wid text-red-800 leading-none"
                  >
                    21 ARCHIVE
                  </motion.h1>
                </div>
                <div className="overflow-hidden">
                  <motion.span
                    variants={springRiseVariant}
                    custom={1}
                    className="text-[9px] sat font-bold tracking-[0.3em] uppercase text-neutral-400 block ml-1"
                  >
                    Est. 2006 — Pluto
                  </motion.span>
                </div>
              </Link>
            </div>
            {/* Center Section: Navigation Links */}
            <div className="hidden md:flex flex-1 items-center justify-center gap-12">
              {navLinks.map((link, i) => (
                <MagnetLink
                  key={i}
                  {...link}
                  index={i}
                />
              ))}
            </div>
            {/* Right Section: Utilities */}
            <div className="flex-1 flex items-center justify-end gap-8">
              <div className={`relative flex items-center transition-all duration-300 ${isSearchOpen ? 'w-48' : 'w-24'}`}>
                <Search size={16} strokeWidth={1.5} className="absolute left-0 text-neutral-900 pointer-events-none" />
                <input
                  type="text"
                  placeholder="SEARCH"
                  onFocus={() => setIsSearchOpen(true)}
                  onBlur={() => setIsSearchOpen(false)}
                  className="w-full sat bg-transparent border-b border-neutral-300 focus:border-black py-1 pl-6 text-[10px] font-bold tracking-widest uppercase placeholder:text-neutral-400 outline-none transition-all"
                />
              </div>
              <div className="hidden sm:flex items-center gap-6">
                <UtilityItem label="Account" path="/account" />
                <UtilityItem label="Cart" path="/cart" count={2} />
              </div>
              <button className="md:hidden text-neutral-900">
                <Menu size={24} strokeWidth={1} />
              </button>
            </div>
          </motion.nav>
        </div>
      </motion.header>
    </>
  );
};

export default PremiumHeader;