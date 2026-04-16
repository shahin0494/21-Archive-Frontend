import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const App = () => {
  return (
    <>
      {/* Content Spacer to show footer at bottom */}

      <footer className="bg-white  text-zinc-950 pt-16 pb-4 px-6 md:px-10 border-t border-zinc-100">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Top Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-0 mb-20">
            
            {/* Column 1: Description */}
            <div className="pr-8 pb-12  md:pb-0">
              <h3 className="font-bold mb-6 text-sm">SOCIALS</h3>
              <div className='flex items-center justify-center'>
                <ul className="text-m grotesq uppercase font-medium leading-relaxed text-red-600 max-w-[280px]">
                 Instagram
                </ul>
                <ArrowUpRight className='text-xl font-medium'/>
              </div>
              <div className='flex items-center justify-center'>
                <ul className="text-m grotesq uppercase font-medium leading-relaxed text-red-600 max-w-[280px]">
                 Facebook
                </ul>
                <ArrowUpRight className='text-xl font-medium'/>
              </div>
              <div className='flex items-center justify-center'>
                <ul className="text-m grotesq uppercase font-medium leading-relaxed text-red-600 max-w-[280px]">
                 X
                </ul>
                <ArrowUpRight className='text-xl font-medium'/>
              </div>
            </div>

            {/* Column 2: Location */}
            <div className="md:border-l border-zinc-200 px-8 pb-12 md:pb-0">
              <h3 className="font-bold mb-6 text-sm">Montréal</h3>
              <address className="text-sm not-italic text-center leading-relaxed text-red-600">
                160 rue St-Viateur Est<br />
                Suite 800<br />
                Montréal, Québec<br />
                H2T 1A8
              </address>
            </div>

            {/* Column 3: Contact */}
            <div className="md:border-l border-zinc-200 px-8 pb-12 md:pb-0">
              <h3 className="font-bold mb-6 text-sm">Contact</h3>
              <a 
                href="mailto:contact@telescopefilms.ca" 
                className="text-sm text-red-600  transition-colors"
              >
                contact@telescopefilms.ca
              </a>
            </div>

            {/* Column 4: Socials */}
            {/* <div className="md:border-l border-zinc-700 px-8 flex flex-col items-start gap-1">
              {['Instagram', 'Facebook', 'Vimeo'].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="text-sm text-zinc-500 hover:text-black transition-colors"
                >
                  {social}
                </a>
              ))}
            </div> */}
          </div>

          {/* Middle Credits Row */}
          <div className="flex flex-col md:flex-row justify-between items-center py-6 border-t border-zinc-200 text-[11px] font-medium text-zinc-400 tracking-wider uppercase">
            <div className="flex items-center gap-1">
              <span>© 2025 ARCHIVED</span>
            </div>
            <div className="mt-4 md:mt-0">
              {/* <span className="opacity-60">Web Design</span> <span className="text-zinc-900">Caserne</span> */}
            </div>
          </div>

          {/* Giant Bottom Logo Branding */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full overflow-hidden pt-4"
          >
            <h1 className="text-[17vw] leading-[0.8] font-[900] tracking-[-0.04em] text-red-600 text-center uppercase whitespace-nowrap overflow-visible" 
                style={{ 
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  transform: 'scaleY(1.1)' 
                }}>
              21 ARCHIVE
            </h1>
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default App;