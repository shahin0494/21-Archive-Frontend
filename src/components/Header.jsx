import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import StaggeredMenu from './StaggeredMenu'; // Ensure this path matches your directory structure

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
const MagnetLink = ({ label, path, index, textColor }) => {
  return (
    <Link to={path} className={`group relative block overflow-hidden cursor-pointer py-2 ${textColor}`}>
      <div className="relative overflow-hidden text-xs lg:text-sm font-bold uppercase tracking-[0.2em]">
        <motion.span className="block group-hover:-translate-y-full sat transition-transform duration-500 ease-[0.16,1,0.3,1]">
          {label}
        </motion.span>
        <motion.span
          className={`absolute top-0 left-0 block sat translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] ${textColor}`}
          aria-hidden="true"
        >
          {label}
        </motion.span>
      </div>
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
    </Link>
  );
};

// --- Main Header Component ---
const PremiumHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(() => {
    return sessionStorage.getItem("headerLoaded") === "true";
  });

  const location = useLocation();
  const pageStyles = {
    "/": { base: "text-neutral-900", scrolled: "text-black" },
    "/about": { base: "text-red-700", scrolled: "text-red-700" },
    "/news": { base: "text-red-700", scrolled: "text-red-900" },
  };

  const currentPage = pageStyles[location.pathname] || pageStyles["/"];
  const currentTextColor = isScrolled ? currentPage.scrolled : currentPage.base;

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
    { label: "Briefs", path: "/news" },
  ];

const token = sessionStorage.getItem("token");

  // Map your old utilities into the StaggeredMenu structure
  const menuItems = [
    { label: "Account", link: "/account" },
    ...(token
      ? [{ label: "Profile", link: "/profile" }]
      : [{ label: "Login", link: "/login" }]),
    { label: "Wishlist", link: "/wishlist" },
    { label: "Cart", link: "/cart" }
  ];

  // Dynamic menu button color based on background/scroll state
  const isDarkBg = ["/about", "/archive"].includes(location.pathname) || (!isScrolled && location.pathname === "/");
  const menuBtnColor = isDarkBg ? "#000000" : "#000000";

  return (
    <motion.header
      key={location.pathname}
      initial={{ y: "-20%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-20%", opacity: 0 }}
      transition={{ duration: 0.54, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
        ["/about", "/archive"].includes(location.pathname)
          ? "bg-black text-white py-4 "
          : isScrolled
          ? "bg-transparent backdrop-blur-xl text-white py-4 "
          : "bg-transparent backdrop-blur text-white py-4 "
      }`}
    >
      <div className="max-w-[1600px] h-full mx-auto px-6 lg:px-12 relative">
        <motion.nav
          className="flex items-center justify-between"
          variants={navContainerVariants}
          initial="hidden"
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
          <div className="hidden md:flex flex-1 items-center justify-center gap-12 z-50 relative pointer-events-auto">
            {navLinks.map((link, i) => (
              <MagnetLink
                key={i}
                {...link}
                index={i}
                textColor={currentTextColor}
              />
            ))}
          </div>

          {/* Right Section: Staggered Menu */}
          <div className="flex-1 flex items-center justify-end z-50 relative pointer-events-auto">
            {/* The wrapper ensures the fixed menu coordinates correctly with your max-w container */}
            <div className="relative w-auto h-8 flex items-center justify-end">
              <StaggeredMenu
                items={menuItems}
                position="right"
                // Clean, minimal black/dark-grey overlay panels
                colors={['#1a1a1a', '#E53935']} 
                accentColor="#b91c1c" // Matches your red-800 brand color
                menuButtonColor={menuBtnColor}
                openMenuButtonColor="#000000"
                isFixed={true}
                displayItemNumbering={false}
              />
            </div>
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
};

export default PremiumHeader;