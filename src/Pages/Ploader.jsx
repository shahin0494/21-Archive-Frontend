// --- Dependencies ---
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

// --- IMPULSE: GLITCH ---
const VarietyImpulseGlitch = ({ active }) => {
  if (!active) return null;
  const rawProgress = useLoader(active, 3000);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const progress = Math.floor(rawProgress / 5) * 5; // quantized steps

  return (
    <div className="fixed inset-0 z-50 bg-white flex justify-center">
      <style>{`body { overflow: hidden; }`}</style>
      <div className="absolute top-[13vh] w-full">
        
        <div className="w-full h-[5px] bg-white overflow-hidden relative rounded-none">
          {/* Main Bar */}
          <motion.div
            className="h-full bg-neutral-900"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'tween', duration: 0.1 }}
          />

          {/* Glitch Flash */}
          <motion.div
            key={progress}
            className="absolute inset-0 bg-white/80"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        </div>

        {/* Status Text */}
        <div className="mt-2 flex justify-between font-mono text-[10px] text-stone-400 uppercase">
          <span>Loading_Packet_{Math.floor(progress / 10)}</span>
          <motion.span
            key={`text-${progress}`}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {progress < 100 ? 'BUFFERING...' : 'COMPLETE'}
          </motion.span>
        </div>

      </div>
    </div>
  );
};

export default VarietyImpulseGlitch;
