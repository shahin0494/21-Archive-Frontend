import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const App = () => {
  // Split the text into an array of characters for the letter-by-letter animation
  const brandText = ["ARCHIVE 21", ""];
  const letters = brandText.map((line) => line.split(""));

  return (
    <div className="bg-[#e8e6e1] font-sans selection:bg-[#181818] selection:text-[#e8e6e1]">

      {/* Spacer to simulate page content and enable scrolling */}


      {/* Redesigned Footer */}
      <footer className="bg-[#1a1a1a] text-[#e6e4dc] min-h-[75vh] md:h-[90vh] flex flex-col justify-between px-5 md:px-10 py-6 md:py-10 relative overflow-hidden">

        {/* Top Navigation Grid */}
        <div className="flex flex-col md:flex-row justify-between items-start text-[15px] font-medium tracking-tight w-full z-10">

          {/* Logo / Brand */}
          <div className="w-full md:w-1/5 mb-8 md:mb-0">
            <span className="cursor-pointer hover:opacity-70 transition-opacity">
              Archive
            </span>
          </div>

          {/* Nav Links */}
          <div className="w-full md:w-1/5 flex flex-col gap-1.5 mb-8 md:mb-0">
            {['Index', 'Services', 'Our Work', 'About'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="w-max hover:text-zinc-400 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Center Text */}
          <div className="w-full md:w-1/5 text-left md:text-center text-zinc-400 mb-8 md:mb-0">
            {/* <span>( Reach out )</span> */}
          </div>

          {/* Socials / Contact */}
          <div className="w-full md:w-1/5 flex flex-col gap-1.5 mb-8 md:mb-0 md:pl-12">
            {['X', 'Instagram','Facebook'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="w-max flex  hover:text-zinc-400 transition-colors"
              >
                {link}<ArrowUpRight className='text-neutral-700 ms-1'/>
              </a>
            ))}
          </div>

          {/* Menu */}
          <div className="w-full md:w-1/5 text-left md:text-right">
            <button className="hover:opacity-70 transition-opacity">
              {/* Menu */}
            </button>
          </div>
        </div>

        {/* Bottom Section containing huge animated text and sub-footer */}
        <div className="mt-auto w-full flex flex-col justify-end pt-16 md:pt-40 z-10">

          {/* Letter-by-Letter Animated Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.05 }
              },
              hidden: {}
            }}
            className="flex flex-col items-end w-full font-serif font-black tracking-tight md:tracking-tighter text-[#e6e4dc]"
            style={{ fontSize: window.innerWidth < 768 ? '5rem' : '20rem', lineHeight: 0.82 }}
          >
            {letters.map((line, lineIndex) => (
              <div key={lineIndex} className="flex justify-end w-full">
                {line.map((char, index) => (
                  <span
                    key={`${lineIndex}-${index}`}
                    className="overflow-hidden inline-flex"
                    style={{ paddingBottom: '0.05em', marginBottom: '-0.05em' }}
                  >
                    <motion.span
                      variants={{
                        hidden: { y: '110%' },
                        visible: {
                          y: 0,
                          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                        }
                      }}
                      className="inline-block origin-bottom"
                    >
                      {char}
                    </motion.span>
                  </span>
                ))}
              </div>
            ))}
          </motion.div>

          {/* Very Bottom Sub-footer */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-start md:items-center text-[12px] md:text-[13px] font-medium mt-6 md:mt-12 text-zinc-400 w-full">
            <span className="hover:text-white transition-colors cursor-pointer">
              © 2025
            </span>
            <span className="hover:text-white transition-colors cursor-pointer">
              {/* By ( Archive Collab ) */}
            </span>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default App;