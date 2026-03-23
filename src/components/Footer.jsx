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

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

// --- 01. The "Next Issue" (Clean & Classic) ---
// Minimalist white footer with a thick top border and "ink" hover effects.
const FooterCleanClassic = () => (
  <footer className="bg-zinc-950 text-zinc-300 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row justify-between gap-16 mb-24">
        <div className="lg:w-1/3">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-medium tracking-tighter text-white mb-6">Archive 21</h2>
            <p className="text-zinc-500 text-sm leading-relaxed mb-8 max-w-sm">
              Exploring the intersection of modern aesthetics and timeless design principles.
            </p>
          </motion.div>
        </div>

        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-8"
        >
          {footerLinks.map((section, i) => (
            <motion.div variants={fadeUpItem} key={i}>
              <h3 className="text-zinc-100 font-medium mb-6 text-sm">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item, j) => (
                  <li key={j}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 4, color: '#fff' }}
                      className="inline-flex items-center text-sm text-zinc-500 transition-colors"
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-zinc-600 font-medium tracking-wide uppercase">Systems Operational</span>
        </div>
        <div className="flex gap-4">
           {socialLinks.map((social, i) => (
            <motion.a
              key={i} href={social.href}
              whileHover={{ scale: 1.1, color: '#fff' }}
              className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 transition-colors hover:bg-zinc-800"
            >
              <social.icon size={18} strokeWidth={1.5} />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default FooterCleanClassic;