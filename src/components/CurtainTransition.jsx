import React from "react";
import { motion } from "framer-motion";

// Swiss easing curve
const swissEase = [0.16, 1, 0.3, 1];

const swissFadeVariants = {
  container: {
    initial: {
      opacity: 0,
      y: 30,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: swissEase,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    },
  },

  content: {
    initial: {
      opacity: 0,
      y: 10,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.5,
        ease: swissEase,
      },
    },
    exit: { opacity: 0 },
  },

  image: {
    initial: { scale: 1.05 },
    animate: {
      scale: 1,
      transition: {
        duration: 1.2,
        ease: swissEase,
      },
    },
    exit: { opacity: 0 },
  },
};

const SwissFadeTransition = ({
  children,
  backgroundImage,
  className = "",
}) => {
  return (
    <motion.div
      variants={swissFadeVariants.container}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`relative w-full ${className}`}
    >
      {/* Optional background image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img
            src={backgroundImage}
            variants={swissFadeVariants.image}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      )}

      {/* Content layer */}
      <div className="relative z-10">
        <motion.div variants={swissFadeVariants.content}>
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SwissFadeTransition;