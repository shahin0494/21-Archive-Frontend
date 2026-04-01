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

// --- Form Component (Reusable) ---
const NewsletterForm = ({ placeholder = "ENTER EMAIL ADDRESS" }) => (
    <motion.form variants={itemVariants} className="relative w-full group mt-8">
        <input
            type="email"
            placeholder={placeholder}
            className="w-full bg-transparent border-b border-[#1a1a1a]/30 pb-3 text-sm tracking-widest uppercase placeholder-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a] transition-colors rounded-none"
            required
        />
        <button
            type="submit"
            className="absolute right-0 top-0 bottom-3 flex items-center justify-center text-[#1a1a1a] opacity-50 group-hover:opacity-100 transition-opacity hover:translate-x-1"
        >
            <ArrowRight size={18} strokeWidth={1.5} />
        </button>
    </motion.form>
);

// ==========================================
// VARIATION 1: The Editorial Card
// Directly mimics the layout structure of the cards in the reference image.
// ==========================================
const VariantOne = () => (
    <motion.div
        key="v1"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full h-full flex items-center justify-center "
        style={{ backgroundColor: colors.bgDark }}
    >

        <div className="w-full p-2  h-full bg-stone-100 flex flex-col relative overflow-hidden shadow-2xl"
            style={{ color: colors.textDark }}>

            {/* Top Section */}
            <div className=" flex-1 flex flex-col justify-between">
                {/* <Header /> */}
                <div className="flex justify-between  items-start">
                    <motion.div variants={itemVariants} className="">
                        <h3 className='grotesq text-stone-900 font-medium text-lg tracking-wide '>Latest</h3> <hr />
                        <h1 className="font-black grotesq text-4xl md:text-9xl lg:text-9xl leading-[0.9]  -tracking-normal text-stone-900 uppercase">The Blueprint <br /> of Flight</h1>
                        <span className='text-4xl grotesq  font-bold p-0  text-blue-900 tracking-normal  '>The Air Jordan 1 Legacy</span>
                        <p className="text-[#5c5c5c] tracking-tight max-w-7xl font-extralight  text-sm text-justify">This vintage-styled infographic captures the definitive origin story of sneaker culture's most iconic silhouette: the Air Jordan 1. Tracing the timeline from Michael Jordan's 1982 NCAA Championship and All-American honors to his explosive 1984-1985 rookie season impact at the Chicago Stadium, the design masterfully blends retro aesthetics with historic milestones. Through stylized elements like classic ticket stubs, attendance data, and the unmistakable profile of the Jordan 1s kicked back in defiance, this visual time capsule celebrates the exact moment a basketball shoe transcended the court to become an enduring global phenomenon.This vintage-styled infographic captures the definitive origin story of sneaker culture's most iconic silhouette: the Air Jordan 1. Tracing the timeline from Michael Jordan's 1982 NCAA Championship and All-American honors to his explosive 1984-1985 rookie season impact at the Chicago Stadium, the design masterfully blends retro aesthetics with historic milestones. Through stylized elements like classic ticket stubs, attendance data, and the unmistakable profile of the Jordan 1s kicked back in defiance, this visual time capsule celebrates the exact moment a basketball shoe transcended the court to become an enduring global phenomenonThis vintage-styled infographic captures the definitive origin story of sneaker culture's most iconic</p>
                    </motion.div>

                    {/* Top Right Meta / Thumbnail */}
                    <motion.div variants={itemVariants} className="hidden md:flex flex-col items-end gap-4">
                        <div className="w-16 h-20 overflow-hidden bg-gray-300">
                            <img src="./fd1.jpg" alt="detail" className="w-full h-full object-cover grayscale" />
                        </div>
                        <div className="w-16 h-20 overflow-hidden bg-gray-300">
                            <img src="./fd2.jpg" alt="detail" className="w-full h-full object-cover grayscale" />
                        </div>
                        <div className="w-16 h-20 overflow-hidden bg-gray-300">
                            <img src="./fd3.jpg" alt="detail" className="w-full h-full object-cover grayscale" />
                        </div>
                        <div className="w-16 h-20 overflow-hidden bg-gray-300">
                            <img src="./fd4.jpg" alt="detail" className="w-full h-full object-cover grayscale" />
                        </div>
                        <span className="text-[9px] uppercase tracking-widest font-medium">Vol. 001</span>
                    </motion.div>
                </div>

            </div>

            {/* Bottom Section: Feature Image */}
            <motion.div variants={itemVariants} className="h-[50%] w-full bg-gray-200 relative ">
                <div className="w-full h-full overflow-hidden">
                    <img
                        src="./feedsnkr1.png"
                        alt="Interior"
                        className="w-full h-full object-cover object-center  opacity-80 mix-blend-multiply"
                    />
                </div>
            </motion.div>
        </div>
    </motion.div>
);


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