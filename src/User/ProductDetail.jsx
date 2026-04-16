import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, Heart, ChevronDown, Star, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom';
import { getSingleSneakerAPI } from '@/Services/allAPI';
import { addToWishlistAPI } from '@/Services/allAPI';
import { addToCartAPI } from '@/Services/allAPI';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const App = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  

  const handleAddToWishlist = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.warning("Please login first");
      return;
    }

    if (!selectedSize) {
      toast.warning("Please select a size");
      return;
    }

    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`
      };

      const body = {
        size: selectedSize
      };

      const result = await addToWishlistAPI(id, body, reqHeader);

      if (result.status === 200) {
        toast.success("Added to wishlist");
        setIsFavorite(true);
      } else if (result.status === 409) {
        toast.warning("Already in wishlist");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast.warning("Already in wishlist");
      } else {
        toast.error("Something went wrong");
        console.log(error);
      }
    }
  };

  const handleAddToCart = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      toast.warning("Please login first");
      return;
    }

    if (!selectedSize) {
      toast.warning("Please select a size");
      return;
    }

    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`
      };

      const body = {
        size: selectedSize,
        quantity: 1
      };

      const result = await addToCartAPI(id, body, reqHeader);

      if (result.status === 200) {
        toast.success("Added to cart");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.warning(error.response.data);
      } else if (error.response?.status === 409) {
        toast.warning("Stock issue");
      } else {
        toast.error("Something went wrong");
        console.log(error);
      }
    }
  };

  const { id } = useParams()
  const [sneakerV, setSneakerV] = useState({})
  console.log(sneakerV);

  useEffect(() => {
    if (id) {
      viewSneakerDetails()
    }
  }, [id])

  const viewSneakerDetails = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await getSingleSneakerAPI(id, reqHeader)

        if (result.status === 200) {
          const data = result.data

          // Helper to clean the path and prevent duplicate base URLs
          const formatImageUrl = (path) => {
            if (!path) return "";
            // Remove brackets, quotes, and whitespace
            const cleanedPath = path.replace(/^[\[\("\s]+|[\]"\)\s]+$/g, '');

            // If it's a Cloudinary URL (or any absolute URL), return it directly
            if (cleanedPath.startsWith('http')) {
              return cleanedPath;
            }

            // If it's a local file path, append localhost
            return `http://localhost:3000/${cleanedPath}`;
          };

          const updatedData = {
            ...data,
            image: data.photos?.length
              ? formatImageUrl(data.photos[0])
              : "",
            gallery: data.photos?.map(img => formatImageUrl(img)) || []
          }

          setSneakerV(updatedData)
          setActiveImage(updatedData.image || updatedData.gallery?.[0] || "");
        }

      } catch (error) {
        if (error.response?.status === 401) {
          toast.warning(error.response.data)
        } else {
          console.log("API ERROR:", error)
        }
      }
    }
  }


  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 mt-5 flex items-center justify-center p-0 md:p-12 font-sans text-[#1a1a1a]">

        {/* Main Container */}
        <div className="w-full max-w-[1400px] bg-gray-100 flex flex-col md:flex-row gap-0 md:gap-16 min-h-[80vh]">

          {/* LEFT: Image Gallery Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-[65%] relative"
          >
            <div
              className="sticky top-0 md:top-8 h-[55vh] md:h-[85vh] w-full bg-[#f6f6f6] flex items-center justify-center overflow-hidden relative"
            >
              <motion.img
                key={activeImage}
                src={activeImage}
                alt={sneakerV?.sneakerName}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-[85%] md:w-[70%] object-contain mix-blend-multiply filter contrast-[1.05]"
              />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 bg-white/80 backdrop-blur-md px-4 py-3 rounded-xl shadow-sm">
                {!sneakerV?.gallery?.length && (
                  <p className="text-sm text-gray-400">No images available</p>
                )}
                {sneakerV?.gallery?.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`w-12 h-12 bg-[#f6f6f6] flex items-center justify-center rounded-md overflow-hidden border transition-all
                      ${activeImage === img ? 'border-black scale-105' : 'border-transparent hover:border-gray-300'}
                    `}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-[80%] object-contain mix-blend-multiply"
                    />
                  </button>
                ))}
              </div>


            </div>
          </motion.div>

          {/* RIGHT: Product Details Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full md:w-[35%] px-6 md:px-0 pt-10 md:pt-12 flex flex-col"
          >

            {/* Header */}
            <motion.div variants={itemVariants} className="mb-10 pb-8 border-b border-gray-100 relative">
              {/* Subtle Brand Identity Line */}
              <div className="w-6 h-1 bg-red-600 mb-6"></div>

              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{sneakerV?.brand}</p>
                  <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-2 leading-none">{sneakerV?.sneakerName}</h1>
                  <p className="text-sm text-gray-500 font-medium">{sneakerV?.category}</p>
                </div>
              </div>
              <div className="text-xl font-medium tracking-tight mt-4">{sneakerV?.price} USD</div>
            </motion.div>

            {/* Size Selection */}
            <motion.div variants={itemVariants} className="mb-10">
              <div className="flex justify-between items-end mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-black">Select Size</span>
                <span className="text-xs text-gray-400 underline decoration-gray-300 underline-offset-4 hover:text-red-600 cursor-pointer transition-colors">Size Guide</span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {sneakerV?.sizes?.map((item) => (
                  <button
                    key={item._id}
                    onClick={() => setSelectedSize(item.size)}
                    disabled={item.stock === 0}
                    className={`
                    h-12 border transition-all duration-200 text-sm font-medium relative overflow-hidden group
                    ${selectedSize === item.size
                        ? 'bg-red-700 text-white border-neutral-500 shadow-lg'
                        : 'border-gray-200 text-gray-600 hover:border-black bg-transparent'}
                    ${item.stock === 0 ? 'opacity-40 cursor-not-allowed' : ''}
                  `}
                  >
                    <span className="relative z-10">{item.size}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex gap-3 mb-12">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`
                flex-1 py-4 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300
                ${selectedSize
                    ? 'bg-black text-white hover:bg-red-600 shadow-md hover:shadow-red-200'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
              `}
              >
                {selectedSize ? 'Add to Cart' : 'Select Size'}
              </button>

              <button
                onClick={handleAddToWishlist}
                className={`
                w-14 border flex items-center justify-center transition-all duration-300 bg-white
                ${isFavorite ? 'border-red-200 bg-red-50' : 'border-gray-200 hover:border-black'}
              `}
              >
                <Heart
                  size={20}
                  className={`transition-colors duration-300 ${isFavorite ? 'fill-red-600 stroke-red-600' : 'stroke-black'}`}
                  strokeWidth={1.5}
                />
              </button>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants} className="mb-10">
              <p className="text-sm leading-7 text-gray-600 font-normal">
                {sneakerV?.description}
              </p>
              {/* <button className="mt-4 text-xs font-bold uppercase tracking-wider underline underline-offset-4 hover:text-red-600 transition-colors">
                Read More
              </button> */}
            </motion.div>

            {/* Functional Accordions */}
            <motion.div variants={itemVariants} className="border-t border-gray-100">

              <AccordionItem
                id="delivery"
                title="Free Delivery & Returns"
                icon={Truck}
                isOpen={activeAccordion === 'delivery'}
                onClick={() => toggleAccordion('delivery')}
              >
                Standard delivery for all orders. Free returns within 30 days. We ship internationally to most regions with tracking included.
              </AccordionItem>

              <AccordionItem
                id="warranty"
                title="Warranty & Care"
                icon={ShieldCheck}
                isOpen={activeAccordion === 'warranty'}
                onClick={() => toggleAccordion('warranty')}
              >
                2 year warranty against manufacturing defects. Clean with soft cloth and mild detergent. Do not machine wash.
              </AccordionItem>

            </motion.div>

          </motion.div>

        </div>
      </div>
      <Footer/>

      <Toaster
        position="top-right"
        richColors
        theme="dark" />
    </>

  );
};

// Sub-component for Accordion Item to keep code clean
const AccordionItem = ({ id, title, icon: Icon, isOpen, onClick, children }) => {
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={onClick}
        className="w-full py-5 flex justify-between items-center cursor-pointer group hover:bg-gray-50 transition-colors px-2 -mx-2"
      >
        <span className="text-sm font-medium flex items-center gap-3 transition-colors group-hover:text-black">
          <Icon size={16} className={`transition-colors duration-300 ${isOpen ? "text-red-600" : "text-gray-400 group-hover:text-black"}`} />
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} className={`transition-colors ${isOpen ? "text-black" : "text-gray-300"}`} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 pt-1 text-sm text-gray-500 leading-relaxed px-2 pl-9">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

  );
};

export default App;