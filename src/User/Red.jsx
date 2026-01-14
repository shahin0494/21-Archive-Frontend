import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Curtain from '../components/CurtainTransition'


const ArchiveRed = () => {
  const [isNotified, setIsNotified] = useState(false);
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);

  const reveal = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const handleNotify = (e) => {
    e.preventDefault();
    if(email) {
      setIsNotified(true);
      setTimeout(() => setShowModal(false), 2500);
    }
  };

  const navigate = useNavigate()

  return (
    <Curtain >
      <div className="h-screen bg-[#2f0505] text-white font-sans selection:bg-white selection:text-black overflow-hidden">
        <motion.nav
          initial="hidden"
          animate="visible"
          variants={reveal}
          className="fixed top-0 left-0 p-8 text-[9px] tracking-[0.35em] uppercase text-white/40"
        >
          Archive / Red
        </motion.nav>
        <main className="h-full flex items-center justify-center text-center">
          <div className="space-y-10">
            <motion.span
              variants={reveal}
              initial="hidden"
              animate="visible"
              className="block text-[9px] tracking-[0.45em] uppercase text-white/30"
            >
              Invitation Only
            </motion.span>
            <motion.span
              variants={reveal}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.05 }}
              className="block text-[8px] tracking-[0.5em] uppercase text-white/20"
            >
              Exclusive Drop
            </motion.span>
            <motion.h1
              variants={reveal}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="text-5xl goth text-neutral-700 md:text-8xl font-bold tracking-wide uppercase"
            >
              Archive
              <br />
              <span className="text-red-800 goth font-extrabold">Red</span>
            </motion.h1>
            <motion.p
              variants={reveal}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="text-[10px] tracking-[0.3em] uppercase text-white/40 max-w-sm mx-auto"
            >
              Dropping soon. Keep waiting.
            </motion.p>
            <div className='flex flex-col'>
              <motion.button
                variants={reveal}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.05 }}
                whileHover={{ opacity: 0.7 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowModal(true)}
                className="mt-12 text-[9px] tracking-[0.4em] uppercase border border-white/20 px-10 py-4 hover:border-red-700/60 transition-colors"
              >
                Request Access
              </motion.button>
              <motion.button
                variants={reveal}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.05 }}
                whileHover={{ opacity: 0.7 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/')}
                className="mt-5 text-[9px] tracking-[0.4em] uppercase border border-white/20 px-10 py-4 hover:bg-red-950 hover:border-gray-400/60 transition-colors"
              >
                 HOME
              </motion.button>
            </div>
            <motion.span
              variants={reveal}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.45 }}
              className="block text-[8px] tracking-[0.45em] uppercase text-white/20"
            >
              No public release
            </motion.span>
          </div>
        </main>
        <footer className="fixed bottom-0 left-0 p-8 text-[9px] tracking-[0.3em] uppercase text-white/20">
          Series 004
        </footer>
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#2b0505] cursor-default"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="w-full max-w-md p-12 text-center relative"
              >
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-0 right-0 p-8 text-[9px] tracking-[0.3em] uppercase text-white/30 hover:text-white transition-colors"
                >
                  Close
                </button>
                {!isNotified ? (
                  <div className="space-y-12">
                    <h2 className="text-sm tracking-[0.4em] uppercase text-white/60">
                      Identify Yourself
                    </h2>
                    <form onSubmit={handleNotify} className="flex flex-col gap-10">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent border-b border-white/20 py-4 text-center text-white placeholder:text-white/10 focus:outline-none focus:border-white/60 transition-colors text-sm tracking-widest font-light"
                        placeholder="EMAIL ADDRESS"
                      />
                      <button className="text-[9px] tracking-[0.4em] uppercase text-white/40 hover:text-white transition">
                        Submit
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <span className="block text-4xl text-white font-light tracking-widest">
                      ACCEPTED
                    </span>
                    <span className="block text-[9px] tracking-[0.3em] uppercase text-white/40">
                      Stand by for further instruction
                    </span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Curtain>
  );
};

export default ArchiveRed;