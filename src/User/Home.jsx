import React, { useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Header from '../components/Header'
import { Search, ChevronUp, ArrowRight, ArrowLeft, ShoppingBag, ArrowUpRight, Plus, ChevronDown, X, Minimize2, Maximize2, Zap, ChevronLeft, ChevronRight, Heart, Star } from 'lucide-react'



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
    name: "SB AIR MAX ISHOD ",
    subtitle: "INFRARED / OG",
    price: "$130",
    description: "Infused with elements taken from iconic '90s hoops shoes, the Air Max Ishod is built with all the durability you need to skate hard. This creative twist on the original Ishod design features our iconic bullet-train-inspired colourway, exposed Nike Air (with Max Air technology) and a flexible sole that breaks in easily. Now step in and skate like you mean it.",
    image: "https://cdn.shopify.com/s/files/1/0619/5347/4815/files/IshSilv-14_1024x1024.jpg?v=1741811758",
    bg: "#f3f4f6",
  },
  {
    id: 2,
    name: "AIR JORDAN 1 RETRO LOW OG SP TRAVIS SCOTT",
    subtitle: "RETRO / MOCHA",
    price: "$180",
    description: "The Nike Air Jordan 1 Retro Low OG SP Travis Scott Medium Olive redefines sneaker culture with premium suede and leather overlays, reverse Swooshes, and earthy olive tones. Comfortable Air cushioning and a sleek profile make it perfect for any wardrobe.",
    image: "https://snrkickz.com/cdn/shop/files/air-jordan-1-low-og-x-travis-scott-medium-olivedm7866-200snrkickz-9859130.jpg?v=1762983540",
    bg: "#e7e5e4"
  },
  {
    id: 3,
    name: "ADIDAS SAMBA XLG",
    subtitle: "RETRO / ZEBRA",
    price: "$230",
    description: "The adidas Samba shoes have dominated the street scene for decades. This version stays authentic to the original look but absorbs influences from two dominant cultures: football and skateboarding. Signature XLG tooling and the sidewall pattern add attitude, and a thicker midsole gives it a slight lift. Comfort comes in strong with a full-length EVA drop-in plus extra padding on the moulded tongue.",
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

const DROPSNEAKERS = [
  {
    id: 1,
    name: "CONS CTAS Pro Milton Martinez",
    subtitle: "INFRARED / OG",
    price: "$130",
    image: "https://localitystore.com.au/cdn/shop/files/A17708C_D_2048x.jpg?v=1764629115",
    bg: "#f3f4f6",
  },
  {
    id: 2,
    name: "ADIDAS Campus 00s ",
    subtitle: "RETRO / MOCHA",
    price: "$180",
    description: "The Nike Air Jordan 1 Retro Low OG SP Travis Scott Medium Olive redefines sneaker culture with premium suede and leather overlays, reverse Swooshes, and earthy olive tones. Comfortable Air cushioning and a sleek profile make it perfect for any wardrobe.",
    image: "https://www.outbacksylt.com/img/38769/adidas-campus-00s-cream-white-green-js3446-1.jpg?options=rs:fill:1000:1000/g:ce/dpr:1",
    bg: "#e7e5e4"
  },
  {
    id: 3,
    name: "Nike C1TY",
    subtitle: "RETRO / ZEBRA",
    price: "$230",
    description: "The adidas Samba shoes have dominated the street scene for decades. This version stays authentic to the original look but absorbs influences from two dominant cultures: football and skateboarding. Signature XLG tooling and the sidewall pattern add attitude, and a thicker midsole gives it a slight lift. Comfort comes in strong with a full-length EVA drop-in plus extra padding on the moulded tongue.",
    image: "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/1ddd7376-2b7c-449e-977c-d40f439cc114/NIKE+C1TY.png",
    bg: "#e5e5e5"
  },
  {
    id: 4,
    name: "Nike Shox Ride 2",
    subtitle: "PANDA / RETRO",
    price: "$110",
    description: "Created for the hardwood but taken to the streets, the '80s b-ball icon returns with perfectly sheened overlays.",
    image: "https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto/b73245fe-db3d-4b32-a7f7-254fa6a57a66/NIKE+SHOX+RIDE+2+PRM.png",
    bg: "#f8fafc"
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

            <p style={{ fontFamily: 'General San,sans-serif' }} className="text-neutral-600 text-sm font-bold leading-relaxed mb-8">
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

const GlassCards = () => {
  return (
    <div className="w-full flex flex-wrap gap-6 justify-center">
      {DROPSNEAKERS.map((product) => (
        <GlassItem key={product.id} product={product} />
      ))}
    </div>
  );
};

const GlassItem = ({ product }) => {
  return (
    <div className="w-full max-w-sm mx-auto h-[400px] rounded-2xl overflow-hidden relative border-neutral-200/70 border transition-all  group">

      {/* Background Image Layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
      >
        <img
          src={product.image}
          className="w-full h-full object-cover"
          alt={product.name}
        />
      </motion.div>

      {/* Glass Overlay */}
      <div className="absolute inset-x-4 bottom-2  bg-white/10  backdrop-blur-md border border-neutral-100  p-4 rounded-xl shadow-sm">
        <div className="flex justify-between items-start">
          <div className="text-neutral-800 h-3 drop-shadow-md">
            <motion.h3
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="font-bold text-lg"
              style={{ fontFamily: 'General San,sans-serif' }}
            >
              {product.name}
            </motion.h3>
            <p style={{ fontFamily: 'General San,sans-serif' }} className="text-sm font-bold opacity-90">{product.subtitle}</p>
          </div>
          {/* <span className="bg-black/50 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">
            {product.price}
          </span> */}
        </div>

        <div className="mt-4 flex justify-end items-center">
          {/* <div className="flex gap-1">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-white/70"
              />
            ))}
          </div> */}
          <button className="text-md uppercase text-end tracking-widest text-black">
            <><ArrowUpRight /></>
          </button>
        </div>
      </div>
    </div>
  );
};

const DROPS = [
  {
    id: 1,
    name: "Air Jordan 1 'Lost & Found'",
    date: "2023-11-19T09:00:00",
    price: "$180",
    image: "./snkr5.png",
    brand: "Jordan",
    status: "Dropping Soon",
    sku: "DZ5485-612",
    colorway: "Varsity Red / Black / Sail"
  },

];
const DROPS1 = [
  {
    id: 2,
    name: "Dunk Low 'GATO'",
    date: "2023-11-21T10:00:00",
    price: "$110",
    image: "./snkr88.png",
    brand: "Nike",
    status: "Restock",
    sku: "DD1391-100",
    colorway: "White / Black"
  }
];
const DROPS2 = [
  {
    id: 4,
    name: "VANS AHS Knu-Skool",
    date: "2023-12-01T00:00:00",
    price: "$200",
    image: "./snkr44.png",
    brand: "VANS",
    status: "Upcoming",
    sku: "M990GL6",
    colorway: "Grey / Castlerock"
  }
];

const AcidBrutalistDrop = () => {
  const drop = DROPS[0];

  return (
    <div className="w-full bg- border-4 border-black p-4 md:p-8 relative overflow-hidden group">
      {/* Background Marquee Text */}
      <div className="  absolute inset-0 opacity-10 font-black text-9xl text-black leading-none whitespace-nowrap overflow-hidden select-none pointer-events-none flex items-center -rotate-12 transform scale-150">
        DROP DROP DROP DROP DROP DROP
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
        {/* Image Container with hard shadow */}
        <motion.div
          whileHover={{ rotate: 3, scale: 1.05 }}
          className="w-full md:w-1/2 bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-2"
        >
          <img src={drop.image} className="w-full h-64 object-cover border-2 border-black" alt="acid-drop" />
          <div className="bg-black text-white text-center py-2 font-mono font-bold mt-2 uppercase tracking-widest">
            {drop.status}
          </div>
        </motion.div>

        {/* Content Side */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="bg-black text-white px-4 py-1 self-start transform -rotate-2 font-bold uppercase text-sm border-2 border-white inline-block shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            Warning: High Heat
          </div>

          <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.85] tracking-wide  text-black mix-blend-multiply">
            {drop.brand}  <span className="text-white  bg-black px-2">{drop.name.split(' ').slice(2).join(' ')}</span>
          </h2>

          <div className="flex gap-4 font-mono font-bold text-lg border-t-4 border-black pt-4 mt-2">
            <div className="flex-1">
              <span className="block text-xs uppercase">Date</span>
              {new Date(drop.date).toLocaleDateString()}
            </div>
            <div className="flex-1 border-l-4 border-black pl-4">
              <span className="block text-xs uppercase">Price</span>
              {drop.price}
            </div>
          </div>

          <button className="w-full py-4 hover:bg-red-600/80 text-black border-4 border-black font-black uppercase text-xl  hover:text-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3">
            <Zap size={24} fill="black" /> Cop Now
          </button>
        </div>
      </div>
    </div>
  );
};
const AcidBrutalistDrop1 = () => {
  const drop = DROPS1[0];

  return (
    <div className="w-full bg-lime-00 border-4 border-black p-4 md:p-8 relative overflow-hidden group">
      {/* Background Marquee Text */}
      <div className="absolute inset-0 opacity-10 font-black text-9xl text-black leading-none whitespace-nowrap overflow-hidden select-none pointer-events-none flex items-center -rotate-12 transform scale-150">
        RESTOCK RESTOCK RESTOCK RESTOCK RESTOCK
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">


        {/* Content Side */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="bg-black text-white px-4 py-1 self-start transform -rotate-2 font-bold uppercase text-sm border-2 border-white inline-block shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            Warning: High Heat
          </div>

          <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.85] tracking-wide  text-black mix-blend-multiply">
            {drop.brand}  <span className="text-white  bg-black px-2">{drop.name.split(' ').slice(2).join(' ')}</span>
          </h2>

          <div className="flex gap-4 font-mono font-bold text-lg border-t-4 border-black pt-4 mt-2">
            <div className="flex-1">
              <span className="block text-xs uppercase">Date</span>
              {new Date(drop.date).toLocaleDateString()}
            </div>
            <div className="flex-1 border-l-4 border-black pl-4">
              <span className="block text-xs uppercase">Price</span>
              {drop.price}
            </div>
          </div>

          <button className="w-full py-4 hover:bg-amber-700 text-black border-4 border-black font-black uppercase text-xl bg-white hover:text-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3">
            <Zap size={24} fill="black" /> Cop Now
          </button>
        </div>

        {/* Image Container with hard shadow */}
        <motion.div
          whileHover={{ rotate: 3, scale: 1.05 }}
          className="w-full md:w-1/2 bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-2"
        >
          <img src={drop.image} className="w-full h-64 object-cover border-2 border-black" alt="acid-drop" />
          <div className="bg-black text-white text-center py-2 font-mono font-bold mt-2 uppercase tracking-widest">
            {drop.status}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
const AcidBrutalistDrop2 = () => {
  const drop = DROPS2[0];

  return (
    <div className="w-full  border-4 border-black p-4 md:p-8 relative overflow-hidden group">
      {/* Background Marquee Text */}
      <div className="absolute inset-0 opacity-10 font-black text-9xl text-black leading-none whitespace-nowrap overflow-hidden select-none pointer-events-none flex items-center -rotate-12 transform scale-150">
        DROP DROP DROP DROP DROP DROP
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
        {/* Image Container with hard shadow */}
        <motion.div
          whileHover={{ rotate: 3, scale: 1.05 }}
          className="w-full md:w-1/2 bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-2"
        >
          <img src={drop.image} className="w-full h-64 object-cover border-2 border-black" alt="acid-drop" />
          <div className="bg-black text-white text-center py-2 font-mono font-bold mt-2 uppercase tracking-widest">
            {drop.status}
          </div>
        </motion.div>

        {/* Content Side */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="bg-black text-white px-4 py-1 self-start transform -rotate-2 font-bold uppercase text-sm border-2 border-white inline-block shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            Warning: High Heat
          </div>

          <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.85] tracking-wide  text-black mix-blend-multiply">
            {drop.brand}  <span className="text-white  bg-black px-2">{drop.name.split(' ').slice(2).join(' ')}</span>
          </h2>

          <div className="flex gap-4 font-mono font-bold text-lg border-t-4 border-black pt-4 mt-2">
            <div className="flex-1">
              <span className="block text-xs uppercase">Date</span>
              {new Date(drop.date).toLocaleDateString()}
            </div>
            <div className="flex-1 border-l-4 border-black pl-4">
              <span className="block text-xs uppercase">Price</span>
              {drop.price}
            </div>
          </div>

          <button className="w-full py-4 hover:bg-blue-400 hover:text-white text-black border-4 border-black font-black uppercase text-xl bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3">
            <Zap size={24} fill="black" /> Cop Now
          </button>
        </div>
      </div>
    </div>
  );
};



function Home() {
  return (
    <div className='bg-white'>
      {/* <Ploader /> */}
      <SplitText
        text="21 ARCHIVE"
        variants={textUpVariants}
        className="top-[1vh] ms-3 absolute text-9xl gap-0.5 font-light tracking-tighter text-red-800"
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
      </motion.div> <hr className='text-neutral-200' />

      <h2 className="text-9xl font-black text-center py-2 uppercase italic">FEED</h2>

      <section className="space-y- ">
        <AcidBrutalistDrop />
        <AcidBrutalistDrop1 />
        <AcidBrutalistDrop2 />
      </section>

      <h2 className="font-bold text-8xl  py-2 uppercase italic text-center text-neutral-900  border-b-4">LATEST DROPS</h2>

      <section className="flex flex-col gap-1">
        <GlassCards />
      </section>

      <div className='flex justify-center  items-center '>
        <button style={{ fontFamily: 'General San,sans-serif' }} className="font-bold text-xl gap-1 text-center py-5 text-neutral-900  ">Explore More </button> <ArrowRight className='text-black' />
      </div>


    </div>
  )
}

export default Home
