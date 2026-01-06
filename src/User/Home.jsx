import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Ploader from '../Pages/Ploader'
import AnimatedContent from '../reactbits/AnimatedContent'
import Header from '../components/Header'
import { Search, ChevronUp,   ArrowRight, ArrowLeft, ShoppingBag, Plus, ChevronDown,  X, Minimize2, Maximize2} from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 4,
      ease: "easeInOut"
    }
  }
};

const textUpVariants = {
  hidden: {
    y: "120%",
    opacity: 1,
    rotateX: -10
  },
  show: {
    y: "0%",
    opacity: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      mass: 0.8
    }
  }
};

const textDownVariants = {
  hidden: {
    y: "-120%",
    opacity: 1,
    rotateX: 10
  },
  show: {
    y: "0%",
    opacity: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      mass: 0.8
    }
  }
};

const springRiseVariant = {
  hidden: {
    y: "100%",
    opacity: 0
  },
  show: (i) => ({
    y: "0%",
    opacity: 1,
    transition: {
      delay: i * 0.1 + 4,
      type: "spring",
      stiffness: 80,
      damping: 20,
      mass: 0.8
    }
  })
};

const SplitText = ({ text, variants, className }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={`flex overflow-hidden ${className}`}
    >
      {text.split("").map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            variants={variants}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

const NavTextUtility = () => {
  return (
    <nav className="w-full h-20 mt-5 flex items-center justify-between  px-8">
      {/* Search Section */}
      <div className="flex-1 max-w-sm left-174  relative group">
        <motion.span
          variants={springRiseVariant}
          custom={0}
          initial="hidden"
          animate="show"
          className="absolute top-1/2 -translate-y-1/2 left-0"
        >
          <Search
            size={14}
            className="text-neutral-900 group-focus-within:text-black transition-colors"
          />
        </motion.span>
        <motion.input
          type="text"
          placeholder="SEARCH"
          variants={springRiseVariant}
          custom={1}
          initial="hidden"
          animate="show"
          className="w-full pl-6 pr-4 py-2 bg-transparent border-b border-neutral-900 outline-none text-xs font-medium tracking-widest placeholder:text-neutral-300 focus:border-black transition-colors"
        />
      </div>

      {/* Text Links */}
      <div className="flex items-center ms-15 gap-8">
        <UtilityTextButton label="WISHLIST" count={2} index={0} />
        <UtilityTextButton label="ACCOUNT" index={1} />
        <UtilityTextButton label="CART" count={0} highlight index={2} />
      </div>
    </nav>
  );
};

const UtilityTextButton = ({ label, count, highlight, index }) => (
  <motion.button
    whileHover={{ y: -1 }}
    className={`group text-3xl font-medium tracking-widest flex items-center gap-1 ${highlight ? 'text-black' : 'text-neutral-500 hover:text-black'
      } transition-colors`}
  >
    <span className="relative block h-[1em] overflow-hidden leading-none">
      <motion.span
        variants={springRiseVariant}
        custom={index}
        initial="hidden"
        animate="show"
        className="block transition-transform duration-300 ease-out group-hover:-translate-y-full"
      >
        {label}
      </motion.span>

      <motion.span
        variants={springRiseVariant}
        custom={index}
        initial="hidden"
        animate="show"
        className="absolute left-0 top-full block transition-transform duration-300 ease-out group-hover:-translate-y-full"
        aria-hidden="true"
      >
        {label}
      </motion.span>
    </span>

    {count !== undefined && (
      <span className="text-[10px] align-top opacity-50">({count})</span>
    )}
  </motion.button>
);

const SNEAKERS = [
  {
    id: 1,
    name: "AIR MAX 90",
    subtitle: "INFRARED / OG",
    price: "$130",
    description: "The original Air Max 90 returns with its iconic Infrared colorway. Featuring the classic waffle sole and stitched overlays.",
    image: "https://cdn.shopify.com/s/files/1/0619/5347/4815/files/IshSilv-14_1024x1024.jpg?v=1741811758",
    bg: "#f3f4f6"
  },
  {
    id: 2,
    name: "JORDAN 1 HIGH",
    subtitle: "RETRO / MOCHA",
    price: "$180",
    description: "A fresh twist on a classic. The Dark Mocha offers a versatile look with premium leather and soft nubuck accents.",
    image: "https://snrkickz.com/cdn/shop/files/air-jordan-1-low-og-x-travis-scott-medium-olivedm7866-200snrkickz-9859130.jpg?v=1762983540",
    bg: "#e7e5e4"
  },
  {
    id: 3,
    name: "ADIDAS SAMBA",
    subtitle: "RETRO / ZEBRA",
    price: "$230",
    description: "Re-engineered Primeknit upper with a post-dyed monofilament side stripe. The Boost midsole ensures comfort.",
    image: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/AP8075s.jpg",
    bg: "#e5e5e5"
  },
  {
    id: 4,
    name: "DUNK LOW",
    subtitle: "PANDA / RETRO",
    price: "$110",
    description: "Created for the hardwood but taken to the streets, the '80s b-ball icon returns with perfectly sheened overlays.",
    image: "https://www.routeone.co.uk/cdn/shop/files/001174809_e93dfa68-54f5-4161-be2f-9455b1e76306.jpg?v=1741257719&width=1000",
    bg: "#f8fafc"
  },
  {
    id: 5,
    name: "NEW BALANCE 530",
    subtitle: "WHITE / GREY",
    price: "$120",
    description: "Simple & clean, not overbuilt. We recreated a timeless classic with this tribute to '90s pro ballers.",
    image: "https://cdn.media.amplience.net/i/frasersdev/12250731_o_a1?fmt=auto&upscale=false&w=767&h=767&sm=scaleFit&$h-ttl$",
    bg: "#f1f5f9"
  }
];


const VerticalSplit = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () =>
    setIndex((prev) => (prev + 1) % SNEAKERS.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + SNEAKERS.length) % SNEAKERS.length);

  const current = SNEAKERS[index];

  return (
    <div className="relative w-full h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      
      {/* Left: Text */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-8 md:p-20 relative z-10 bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-black" />
              <span className="text-5xl font-medium tracking-widest uppercase text-neutral-500">
                Featured This Week
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              {current.name}
            </h1>

            <p className="text-neutral-600 text-lg leading-relaxed mb-8">
              {current.description}
            </p>

            <div className="flex items-center justify-between border-t border-neutral-100 pt-8">
              <span className="text-3xl font-black">
                {current.price}
              </span>
              <button className="text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-neutral-500 hover:border-neutral-500 transition-colors">
                View Details
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right: Image */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-neutral-100">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={current.image}
              alt={current.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/5" />
          </motion.div>
        </AnimatePresence>

        {/* Vertical Controls */}
        <div className="absolute right-0 bottom-0 md:top-1/2 md:-translate-y-1/2 flex flex-row md:flex-col bg-white border-l border-t md:border-t-0 border-neutral-200">
          <button
            onClick={prevSlide}
            className="p-6 hover:bg-neutral-50 transition-colors"
          >
            <ChevronUp className="hidden md:block" />
            <ArrowLeft className="md:hidden" />
          </button>

          <div className="w-[1px] h-6 bg-neutral-200 md:hidden" />
          <div className="h-[1px] w-6 bg-neutral-200 hidden md:block" />

          <button
            onClick={nextSlide}
            className="p-6 hover:bg-neutral-50 transition-colors"
          >
            <ChevronDown className="hidden md:block" />
            <ArrowRight className="md:hidden" />
          </button>
        </div>
      </div>
    </div>
  );
};

const delayedRevealVariant = {
  hidden: {
    opacity: 0,
    scale: 0.98
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 4,
      duration: 0.35,
      ease: "easeOut"
    }
  }
};

function Home() {
  return (
    <div className='bg-white'>
      {/* <Ploader /> */}
      <SplitText
        text="21 ARCHIVE"
        variants={textUpVariants}
        className="top-[1vh] ms-3 absolute text-9xl gap-0.5 font-light tracking-tighter text-slate-700"
      />
      <div className="absolute top-[13vh] w-full h-[5px] bg-gradient-to-r from-neutral-600 to-neutral-600" />
      <Header />
      <NavTextUtility />
      <SplitText
        text="WELCOME TO"
        variants={textDownVariants}
        className="top-[14vh] ms-3 absolute text-7xl gap-0.5 font-light tracking-tighter text-neutral-800"
      />
      <hr className='text-neutral-300' />
      
      <motion.div
        variants={delayedRevealVariant}
        initial="hidden"
        animate="show"
      >
        <VerticalSplit />
      </motion.div>
    </div>
  )
}

export default Home
