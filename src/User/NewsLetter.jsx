import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Header from '../components/Header'

// --- Shared Animation Variants ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

// --- Shared Styles ---
const colors = {
    bgDark: '#2c2a27',
    cardLight: '#d5d1c8',
    textDark: '#1a1a1a',
    textMuted: '#5c5c5c'
};


const newsletters = [
    {
        id: 1,
        title: "The Blueprint of Flight",
        subtitle: "The Air Jordan 1 Legacy",
        description: "This vintage-styled infographic captures the definitive origin story of sneaker culture's most iconic silhouette.. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi voluptate voluptas non aliquid! Harum atque tempore in, doloribus dolorem possimus et eligendi, esse, sed eveniet blanditiis voluptas vel cum minus This vintage-styled infographic captures the definitive origin story of sneaker culture's most iconic silhouette.. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi voluptate voluptas non aliquid! Harum atque tempore in, doloribus dolorem possimus et eligendi, esse, sed eveniet blanditiis voluptas vel cum minusThis vintage-styled infographic captures the definitive origin story of sneaker culture's most iconic silhouette.. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi voluptate voluptas non aliquid! Harum atque tempore in, doloribus dolorem possimus et eligendi, esse, sed eveniet blanditiis voluptas vel cum minusThis vintage-styled infographic captures the definitive origin story of sneaker culture's most iconic silhouette.. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi voluptate voluptas non aliquid! Harum atque tempore in, doloribus dolorem possimus et eligendi, esse, sed eveniet blanditiis voluptas vel cum minusThis vintage-styled infographic captures the definitive origin story of sneaker culture's most iconic silhouette.. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi voluptate voluptas non aliquid! Harum atque tempore in, doloribus doloremculture's most iconic silhouette.. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi voluptate voluptas non aliquid! Harum atque tempore in, doloribus doloremculture's most iconic silhouette.. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi voluptate voluptas non aliquid! Harum atque tempore in, doloribus doloremculture's most iconic silhouette.. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi voluptate voluptas non aliquid! Harum atque tempore in, doloribus  " ,
        images: ["./fd1.jpg", "./fd2.jpg", "./fd3.jpg", "./fd4.jpg"],
        hero: "./feedsnkr1.png"
    },
    {
        id: 2,
        title: "Rise of Street Culture",
        subtitle: "From Courts to Concrete",
        description: "Exploring how basketball sneakers transitioned into everyday streetwear and global culture dominance...",
        images: ["./fd2.jpg", "./fd3.jpg", "./fd4.jpg", "./fd1.jpg"],
        hero: "./feedsnkr2.png"
    },
    {
        id: 3,
        title: "The Blueprint of Flight",
        subtitle: "The Air Jordan 1 Legacy",
        description: "This vintage-styled infographic captures the definitive origin story of sneaker culture's most iconic silhouette.. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi voluptate voluptas non aliquid! Harum atque tempore in, doloribus dolorem possimus et eligendi, esse, sed eveniet blanditiis voluptas vel cum minus This vintage-styled infographic captures the definitive origin story of sneaker culture's most iconic silhouette.. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi voluptate voluptas non aliquid! Harum atque tempore in, doloribus dolorem possimus et eligendi, esse, sed eveniet blanditiis voluptas vel cum minusThis vintage-styled infographic captures the definitive origin story of sneaker culture's most iconic silhouette.. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi voluptate voluptas non aliquid! Harum atque tempore in, doloribus dolorem possimus et eligendi, esse, sed eveniet blanditiis voluptas vel cum minusThis vintage-styled infographic captures the definitive origin story of sneaker culture's most iconic silhouette.. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi voluptate voluptas non aliquid! Harum atque tempore in, doloribus dolorem possimus et eligendi, esse, sed eveniet blanditiis voluptas vel cum minusThis vintage-styled infographic captures the definitive origin story of sneaker culture's most iconic silhouette.. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi voluptate voluptas non aliquid! Harum atque tempore in, doloribus doloremculture's most iconic silhouette.. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi voluptate voluptas non aliquid! Harum atque tempore in, doloribus doloremculture's most iconic silhouette.. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi voluptate voluptas non aliquid! Harum atque tempore in, doloribus doloremculture's most iconic silhouette.. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi voluptate voluptas non aliquid! Harum atque tempore in, doloribus  " ,
        images: ["./fd1.jpg", "./fd2.jpg", "./fd3.jpg", "./fd4.jpg"],
        hero: "./feedsnkr3.png"
    },
    {
        id: 3,
        title: "Rise of Street Culture",
        subtitle: "From Courts to Concrete",
        description: "Exploring how basketball sneakers transitioned into everyday streetwear and global culture dominance...",
        images: ["./fd2.jpg", "./fd3.jpg", "./fd4.jpg", "./fd1.jpg"],
        hero: "./feedsnkr2.png"
    }
];

// ==========================================
// VARIATION 1: The Editorial Card
// Directly mimics the layout structure of the cards in the reference image.
// ==========================================
const VariantOne = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = newsletters[activeIndex];

    return (
        <motion.div
            key="v1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full h-full flex items-center justify-center "
            style={{ backgroundColor: colors.bgDark }}
        >

            

            <div  className="w-full bg-neutral-900  h-full  flex flex-col relative overflow-hidden shadow-2xl"
                style={{
                    color: colors.textDark,
                    // backgroundImage: `url(./lg2.jpg)`,
                    // backgroundSize: "cover",
                    // backgroundPosition: "center",
                    // backgroundRepeat: "no-repeat"
                }}>
<Header/>
                {/* Top Section */}
                <div className=" flex-1 flex mt-25 flex-col justify-between">
                    
                    {/* <Header /> */}
                    <div className="flex justify-between  items-end">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active.id}
                                variants={itemVariants}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className=""
                            >
                                <h3 className='grotesq text-red-600 font-medium text-lg tracking-wide '></h3> 
                                <h1 className="font-black goth text-4xl md:text-9xl lg:text-9xl leading-[0.9]  -tracking-normal text-red-800 uppercase">{active.title}</h1>
                                <span className='text-4xl grotesq  font-black uppercase p-0  text-neutral-600 tracking-normal  '>{active.subtitle}</span>
                                <p className="text-neutral-500 tracking-tight max-w-5xl font-medium  text-sm text-justify">{active.description}</p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Top Right Meta / Thumbnail */}
                        <motion.div variants={itemVariants} className="hidden md:flex mt-2 flex-col items-end gap-2">
                            {active.images.map((img, index) => (
                                <div
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`w-16 h-20 overflow-hidden cursor-pointer transition-all ${activeIndex === index ? "ring-2 ring-black" : "opacity-60 hover:opacity-100"
                                        }`}
                                >
                                    <img src={img} alt="detail" className="w-full h-full object-cover grayscale" />
                                </div>
                            ))}
                            
                        </motion.div>
                    </div>

                </div>

                {/* Bottom Section: Feature Image */}
                <motion.div variants={itemVariants} className="h-[50%]  w-full bg-red-500 relative ">
                    <div className="w-full h-full overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={active.hero}
                                src={active.hero}
                                alt="Interior"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="w-full h-full object-cover object-center opacity-80 mix-blend-multiply"
                            />
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};


// ==========================================
// MAIN COMPONENT CONTAINER
// ==========================================
export default function App() {
    return (
        <div className="w-full h-screen relative overflow-hidden">
            {/* Content Area */}

            <VariantOne />
        </div>
    );
}