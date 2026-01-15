import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MoveDownLeft } from 'lucide-react';
import Curtain from '../components/CurtainTransition'
import Header from '../components/Header'

const blockReveal = {
  hidden: { y: '0%' },
  visible: (delay = 0) => ({
    y: '100%',
    transition: {
      duration: 0.9,
      ease: [0.77, 0, 0.175, 1],
      delay
    }
  })
};

const textReveal = {
  hidden: { y: '20%' },
  visible: (delay = 0) => ({
    y: '0%',
    transition: {
      duration: 0.9,
      ease: [0.77, 0, 0.175, 1],
      delay
    }
  })
};

export default function BoldRedApp() {
  return (
    <>
      <Header />
      <Curtain>

        <div className="min-h-screen bg-red-800 text-black font-sans mt-24 selection:bg-white selection:text-black">
          {/* 1. Header */}
          <header className="px-6 md:px-12 py-8 flex justify-between items-center mix-blend-normal  top-0 z-50">
            {/* <div className="bg-black text-white px-2 py-1 font-bold text-xl tracking-tighter">
                        21-ARCHIVE
                        </div> */}
            <div className="hidden md:block w-32 h-2 bg-black"></div>
          </header>
          {/* 2. Hero Typography */}
          <section className="px-6 md:px-12 pt-12 pb-24 relative">
            {/* Subtle decorative line */}
            <div className="absolute right-12 top-0 h-full w-px bg-black opacity-10"></div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <h1 className="text-[15vw] lg:text-[12vw] leading-[0.8] font-black tracking-tighter uppercase break-words">
                  {/* LINE 1 */}
                  <div className="relative overflow-hidden">
                    <motion.div
                      initial={{ y: '0%' }}
                      animate={{ y: '100%' }}
                      transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
                      className="absolute inset-0 bg-black z-10"
                    />
                    <motion.span
                      initial={{ y: '20%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
                      className="relative block"
                    >
                      We Move
                    </motion.span>
                  </div>

                  {/* LINE 2 */}
                  <div className="relative overflow-hidden">
                    <motion.div
                      initial={{ y: '0%' }}
                      animate={{ y: '100%' }}
                      transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.12 }}
                      className="absolute inset-0 bg-white z-10"
                    />
                    <motion.span
                      initial={{ y: '20%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.12 }}
                      className="relative block text-white"
                    >
                      Culture
                    </motion.span>
                  </div>

                  {/* LINE 3 */}
                  <div className="relative overflow-hidden">
                    <motion.div
                      initial={{ y: '0%' }}
                      animate={{ y: '100%' }}
                      transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.24 }}
                      className="absolute inset-0 bg-black z-10"
                    />
                    <motion.span
                      initial={{ y: '20%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.24 }}
                      className="relative block"
                    >
                      Forward.
                    </motion.span>
                  </div>
                </h1>
              </div>
              {/* <div className="lg:col-span-4 flex flex-col justify-end pb-4">
                                <div className="bg-black text-white p-8 shadow-[10px_10px_0px_rgba(255,255,255,0.2)]">
                                    <p className="text-lg font-medium leading-tight mb-8">
                                        60% Passion. 30% Grit. 10% Air. <br />
                                        A design-led sneaker archive built for the modern collector.
                                    </p>
                                    <button className="w-full bg-white text-black py-4 font-bold uppercase flex justify-between px-6 hover:bg-[#D00000] hover:text-white transition-colors group">
                                        Explore <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                                    </button>
                                </div>
                            </div> */}
            </div>
          </section>
          {/* 3. NEW SECTION: Story & Journey (The Path) */}
          <section className="px-6 md:px-12 py-24 border-t-2 border-black">
            <div className="grid md:grid-cols-12 gap-16">
              {/* Sticky Title */}
              <div className="md:col-span-4 relative">
                <div className="sticky top-32">
                  <h2 className="text-6xl md:text-7xl font-black text-white uppercase leading-none mb-6">
                    <div className="relative overflow-hidden">
                      <motion.div
                        variants={blockReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0}
                        className="absolute inset-0 bg-black z-10"
                      />
                      <motion.span
                        variants={textReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0}
                        className="relative block"
                      >
                        The
                      </motion.span>
                    </div>

                    <div className="relative overflow-hidden">
                      <motion.div
                        variants={blockReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.12}
                        className="absolute inset-0 bg-black z-10"
                      />
                      <motion.span
                        variants={textReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.12}
                        className="relative block"
                      >
                        Path.
                      </motion.span>
                    </div>
                  </h2>
                  <MoveDownLeft size={48} className="text-white animate-pulse" />
                </div>
              </div>
              {/* Narrative Timeline */}
              <div className="md:col-span-8 space-y-20 text-white">
                {/* Chapter 1 */}
                <div className="group text-white">
                  <span className="inline-block bg-black text-white font-mono text-xs px-2 py-1 mb-4">CHAPTER 01</span>
                  <div className="relative overflow-hidden mb-4">
                    <motion.div
                      variants={blockReveal}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="absolute inset-0 bg-white z-10"
                    />
                    <motion.h3
                      variants={textReveal}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="relative text-3xl font-bold uppercase group-hover:pl-4 transition-all duration-300"
                    >
                      The Spark (2021)
                    </motion.h3>
                  </div>
                  <p className="text-xl font-medium leading-relaxed max-w-2xl border-l-4 border-black pl-6">
                    It started with frustration. The market was flooded with fakes and bots. We wanted to build a sanctuary for real heads. No apps, no raffles, just direct access to the heat.
                  </p>
                </div>
                {/* Chapter 2 */}
                <div className="group">
                  <span className="inline-block bg-white text-black font-mono text-xs px-2 py-1 mb-4 border border-black">CHAPTER 02</span>
                  <div className="relative overflow-hidden mb-4">
                    <motion.div
                      variants={blockReveal}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="absolute inset-0 bg-white z-10"
                    />
                    <motion.h3
                      variants={textReveal}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="relative text-3xl font-bold uppercase group-hover:pl-4 transition-all duration-300"
                    >
                      The Grind (2022-23)
                    </motion.h3>
                  </div>
                  <p className="text-xl font-medium leading-relaxed max-w-2xl border-l-4 border-white pl-6">
                    We operated out of a storage unit. Authentication was done by hand, pair by pair. We built our reputation the hard way: one legit check at a time.
                  </p>
                </div>
                {/* Chapter 3 */}
                <div className="group">
                  <span className="inline-block bg-black text-white font-mono text-xs px-2 py-1 mb-4">CHAPTER 03</span>
                  <div className="relative overflow-hidden mb-4">
                    <motion.div
                      variants={blockReveal}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="absolute inset-0 bg-white z-10"
                    />
                    <motion.h3
                      variants={textReveal}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="relative text-3xl font-bold uppercase group-hover:pl-4 transition-all duration-300"
                    >
                      The Vision (Now)
                    </motion.h3>
                  </div>
                  <p className="text-xl font-medium leading-relaxed max-w-2xl border-l-4 border-black pl-6">
                    Today, ARCHIVE. is more than a shop. It's a curator of street history. We aren't just selling shoes; we're archiving the culture that raised us.
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* 4. Big Data / Minimal Content */}
          <section className="bg-black text-[#D00000] px-6 md:px-12 py-52 relative overflow-hidden">
            {/* Decorative Background Text */}
            <div className="absolute top-0 right-0 text-[20vw] font-black text-[#1a1a1a] leading-none -mt-10 select-none pointer-events-none">
              DATA
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-8 relative z-10">
              {/* Stat 1 */}
              <div className="border-t-4 border-[#D00000] pt-6 hover:-translate-y-2 transition-transform duration-300">
                <span className="block text-white font-mono text-sm mb-2">01 / ORIGIN</span>
                <h3 className="text-6xl md:text-7xl font-black text-white mb-4">2021</h3>
                <p className="text-gray-400 max-w-xs font-mono text-sm">
                  Founded in a basement. No investors. Just skateboards and shoe boxes.
                </p>
              </div>
              {/* Stat 2 */}
              <div className="border-t-4 border-[#D00000] pt-6 hover:-translate-y-2 transition-transform duration-300 delay-100">
                <span className="block text-white font-mono text-sm mb-2">02 / VOLUME</span>
                <h3 className="text-6xl md:text-7xl font-black text-white mb-4">5K+</h3>
                <p className="text-gray-400 max-w-xs font-mono text-sm">
                  Pairs authenticated and re-homed. Zero fakes. Zero compromises.
                </p>
              </div>
              {/* Stat 3 */}
              <div className="border-t-4 border-[#D00000] pt-6 hover:-translate-y-2 transition-transform duration-300 delay-200">
                <span className="block text-white font-mono text-sm mb-2">03 / FUTURE</span>
                <h3 className="text-6xl md:text-7xl font-black text-white mb-4">∞</h3>
                <p className="text-gray-400 max-w-xs font-mono text-sm">
                  We are just getting started. The archive is expanding daily.
                </p>
              </div>
            </div>
          </section>
          {/* 5. Contrast Footer */}
          <footer className="bg-white px-6 md:px-12 py-40">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
              <div>
                <h2 className="text-[#D00000] text-5xl md:text-6xl font-black uppercase tracking-tight mb-2">
                  Stay Loud.
                </h2>
                <p className="text-black font-bold text-lg">
                  Join the newsletter. No spam, just heat.
                </p>
              </div>
              <div className="mt-8 md:mt-0 flex flex-col items-end">
                <div className="w-full h-2 bg-black mb-4 w-64"></div>
                <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">
                  ©2024 ARCHIVE Resell Collective
                </p>
              </div>
            </div>
          </footer>
        </div>
      </Curtain>
    </>
  );
}