import { motion } from "framer-motion";

export const curtainVariants = {
  initial: { clipPath: "inset(0 100% 0 0)" },
  enter: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
  },
  exit: {
    clipPath: "inset(0 0 0 100%)",
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
  }
};

export const CurtainTransition = ({ children }) => {
  return (
    <motion.div
      variants={curtainVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="w-full h-full bg-black"
    >
      {children}
    </motion.div>
  );
};
export default CurtainTransition;