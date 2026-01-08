import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Twitter, Instagram, Github, Mail, Heart, Zap, Send, MessageCircle } from 'lucide-react';

const footerLinks = [
  { title: "The Archive", items: ["Origins", "Icons", "Heat", "Collabs"] },
{ title: "The Brand", items: ["About Us", "Work With Us", "Media", "Contact"] },
{ title: "Fine Print", items: ["Terms", "Privacy", "Cookies"] },
];

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Github, href: "#", label: "Github" },
];

// --- 01. The "Next Issue" (Clean & Classic) ---
// Minimalist white footer with a thick top border and "ink" hover effects.
const FooterCleanClassic = () => {
  return (
    <footer className="bg-yellow-300 border-t-4 border-black pt-16 pb-8 font-sans">
      <div className="container  mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:w-1/3 space-y-4">
            <h2 className="text-3xl grotesq1 font-black italic uppercase tracking-tighter">
              The End?
            </h2>
            <p className="text-black grotesq1 font-bold max-w-xs">
              Don't miss the next DROP. Subscribe to our newsletter for weekly updates from the multiverse.
            </p>
            <div className="relative max-w-xs group">
                <input 
                  type="email" 
                  placeholder="Enter your email..." 
                  className="w-full grotesq1 bg-neutral-100 border-2 border-black px-4 py-3 font-bold placeholder:text-neutral-400 focus:outline-none focus:shadow-[4px_4px_0_0_#000] transition-shadow"
                />
                <button className="absolute right-2 top-2 bottom-2 bg-yellow-400 border-2 border-black px-3 hover:bg-yellow-300 transition-colors">
                  <ArrowRight className="w-5 h-5 text-black" />
                </button>
            </div>
          </div>

          {/* Links Grid */}
          <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-8">
            {footerLinks.map((section, i) => (
              <div key={i}>
                <h3 className="font-black grotesq1 uppercase tracking-widest mb-6 text-sm border-b-2 border-neutral-200 pb-2 inline-block">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item, j) => (
                    <li key={j}>
                      <motion.a 
                        href="#" 
                        className="inline-block grotesq1 font-bold text-black relative"
                        whileHover={{ x: 5 }}
                      >
                        <span className="relative grotesq1 z-10">{item}</span>
                        {/* Hover Underline Pen Stroke */}
                        <span className="absolute left-0 grotesq1 bottom-0 w-full h-2 bg-yellow-200 -z-10 scale-x-0 transition-transform origin-left hover:scale-x-100"></span>
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-black border-dashed pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-xs font-bold uppercase tracking-widest grotesq1 text-black">
             © 2026 21-ARCHIVE. All Rights Reserved.
           </p>
           <div className="flex gap-4">
             {socialLinks.map((social, i) => (
               <motion.a 
                 key={i} 
                 href={social.href}
                 whileHover={{ y: -3, rotate: i % 2 === 0 ? 5 : -5 }}
                 className="p-2 border-2 grotesq1 border-black bg-white hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0_0_#000]"
               >
                 <social.icon size={18} />
               </motion.a>
             ))}
           </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterCleanClassic;