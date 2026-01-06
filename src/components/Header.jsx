import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, delay } from 'framer-motion';
import { ShoppingBag, Search, User, Menu, X, ArrowRight, Heart } from 'lucide-react';

const springRiseVariant = {
  hidden: {
    y: "100%",
    opacity: 0
  },
  show: (i) => ({
    y: "0%",
    opacity: 1,
    transition: {
      delay: i * 0.1 + 4, // staggered + 4s global delay
      type: "spring",
      stiffness: 80,
      damping: 20,
      mass: 0.8
    }
  })
};

const headerTextUpVariants = {
  hidden: {
    y: "120%",
    opacity: 0,
    rotateX: -10
  },
  show: {
    y: "0%",
    opacity: 1,
    rotateX: 0,
    transition: {
      delay: 4,
      type: "spring",
      stiffness: 80,
      damping: 20,
      mass: 0.8
    }
  }
};
// =============================================================================
// OPTION 1: "The Spotlight"
// =============================================================================
const SpotlightNav = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const links = ["New ARRIVALS", "Men", "Women", "Collections", "Sale"];

  return (
    <>
      <nav className="w-full py-11 px-0 flex items-center justify-end mt-5 relative z-20">
        <div className="text-xl font-bold tracking-tighter z-10"></div>
        <div className="absolute  -translate-x-1/50 flex gap-10" onMouseLeave={() => setHoveredIndex(null)}>
          {links.map((link, i) => (
            <motion.a
              key={i}
              href="#"
              onMouseEnter={() => setHoveredIndex(i)}
              animate={{ opacity: hoveredIndex === null || hoveredIndex === i ? 1 : 0.3 }}
              transition={{ duration: 0.2 }}
              className="group relative text-6xl font-medium header text-justify text-neutral-900 uppercase tracking-wide cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-[3px] after:w-full after:bg-neutral-900 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out"
            >
              <span className="relative block h-[1em] overflow-hidden leading-none">
                <motion.span
                  variants={springRiseVariant}
                  custom={i}
                  initial="hidden"
                  animate="show"
                  className="block transition-transform duration-400 ease-out group-hover:-translate-y-full"
                >
                  {link}
                </motion.span>
                <motion.span
                  variants={springRiseVariant}
                  custom={i}
                  initial="hidden"
                  animate="show"
                  className="absolute left-0 top-full block transition-transform duration-400 ease-out group-hover:-translate-y-full"
                >
                  {link}
                </motion.span>
              </span>
            </motion.a>
          ))}
        </div>
        {/* <div className="flex items-center gap-5 z-10">
          <Search size={38} className="cursor-pointer hover:opacity-50" />
          <ShoppingBag size={38} className="cursor-pointer hover:opacity-50" />
        </div> */}
      </nav>
    </>
  );
};

export default SpotlightNav;