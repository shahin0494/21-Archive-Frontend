// --- Dependencies ---
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Shared Hook (Loader Logic) ---
const useLoader = (isActive, duration = 3000) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setProgress(0);
      return;
    }

    let start = null;
    let rafId;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const ratio = Math.min(elapsed / duration, 1);
      setProgress(ratio * 100);

      if (ratio < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isActive, duration]);

  return progress;
};

// --- KINETIC PRELOADER: SYS / TEM ---
const Ploader = ({ active }) => {
  const progress = useLoader(active, 3000);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="kinetic-loader"
          className="fixed inset-0 z-50 flex flex-col font-sans pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          {/* Top Panel */}
          <motion.div
            className="flex-1 bg-neutral-900 flex items-end justify-start p-4 md:p-12 overflow-hidden"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <h1 className="text-white text-[12vw] leading-[0.85] font-bold tracking-tighter overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: 160 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                21
              </motion.span>
            </h1>
          </motion.div>

          {/* Progress Strip – Center Split */}
          <div className="relative w-full h-1 md:h-1 z-20 overflow-hidden bg-transparent">
            <motion.div
              className="absolute left-1/2 top-0 h-full bg-red-700"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              style={{ transform: 'translateX(-50%)' }}
            >
              <motion.div
                className="absolute left-0 top-0 h-full bg-white"
                style={{ width: `${progress}%` }}
              />
            </motion.div>
          </div>

          {/* Bottom Panel */}
          <motion.div
            className="flex-1 bg-white h-full flex items-start justify-end p-4 md:p-12 overflow-hidden"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="text-right">
              <h1 className="text-neutral-900 text-[12vw]  leading-[0.85] font-bold  mix-blend-multiply overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: 160 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                  ARCHIVE
                </motion.span>
              </h1>
              <div className="mt-4 font-mono text-sm md:text-xl tracking-widest uppercase">
                Loading Resources… {Math.floor(progress)}%
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Ploader;
