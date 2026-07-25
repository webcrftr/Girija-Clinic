import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Calendar, Flame, PhoneCall, Clock, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUI } from '../../context/UIContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { settings } = useUI();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Treatments', path: '/services' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Quick Contact Strip */}
      <div className="bg-[#14291D] text-emerald-100 text-[11px] font-medium py-1.5 px-4 hidden sm:block border-b border-emerald-950">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5">
              <Clock size={13} className="text-[#C59B27]" />
              <span>Mira Road (E): Shanti Garden & Datta Mandir Rd</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Sparkles size={13} className="text-[#C59B27]" />
              <span>Agnikarma • Viddhakarma • Panchakarma</span>
            </span>
          </div>

          <div className="flex items-center space-x-5">
            <a href="tel:+919876543210" className="flex items-center space-x-1.5 hover:text-white transition">
              <PhoneCall size={12} className="text-[#C59B27]" />
              <span>+91 98765 43210 / +91 98765 43211</span>
            </a>
            <span className="text-emerald-800">|</span>
            <span className="text-emerald-300 font-semibold">Dr. Ombeer R. Pal</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EAE4D9] shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo & Brand */}
            <Link to="/" className="flex items-center space-x-3 group shrink-0">
              <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-[#1B3B2B] text-[#C59B27] shadow-md group-hover:bg-[#14291D] border border-[#C59B27]/30 transition-colors">
                <span className="text-xl">🌿</span>
              </div>

              <div className="flex flex-col text-left">
                <span className="text-xl font-bold font-display tracking-tight text-[#14291D]">
                  Om Ayurveda
                </span>
                <span className="text-[10px] font-bold text-[#C59B27] tracking-widest uppercase">
                  Main Branch & Girija Clinic
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <div className="flex items-center space-x-1 bg-[#F6F2EA] p-1.5 rounded-full border border-[#EAE4D9]">
                {links.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`relative px-4 py-2 text-xs font-bold rounded-full transition-all duration-200 ${
                        active
                          ? 'text-white bg-[#1B3B2B] shadow-sm font-extrabold'
                          : 'text-[#4A3B32] hover:text-[#1B3B2B] hover:bg-white/60'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <div className="flex items-center space-x-3">
                <Link
                  to="/admin/login"
                  className="p-2.5 text-[#5C6B61] hover:text-[#1B3B2B] hover:bg-[#F6F2EA] rounded-xl transition-colors border border-transparent hover:border-[#EAE4D9]"
                  title="Admin Portal"
                >
                  <User size={19} />
                </Link>
                
                <Link
                  to="/book"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C59B27] hover:from-[#C59B27] hover:to-[#B2881E] text-white text-xs font-bold tracking-wide shadow-gold-glow transition-all duration-200 flex items-center space-x-2 shrink-0 active:scale-95"
                >
                  <Calendar size={14} />
                  <span>Book Consultation</span>
                </Link>
              </div>
            </div>

            {/* Mobile Trigger */}
            <div className="flex items-center lg:hidden space-x-2">
              <Link
                to="/admin/login"
                className="p-2 text-[#5C6B61] hover:text-[#1B3B2B] rounded-xl"
              >
                <User size={20} />
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-[#14291D] hover:text-[#C59B27] rounded-xl transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="lg:hidden border-b border-[#EAE4D9] bg-[#FDFBF7] overflow-hidden"
            >
              <div className="px-4 pt-3 pb-6 space-y-2 text-left">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 text-xs font-bold rounded-xl transition-all ${
                      isActive(link.path)
                        ? 'text-white bg-[#1B3B2B]'
                        : 'text-[#4A3B32] hover:text-[#1B3B2B] hover:bg-[#F6F2EA]'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-2">
                  <Link
                    to="/book"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center space-x-2 w-full text-center px-5 py-3.5 text-xs font-bold text-white bg-gradient-to-r from-[#D4AF37] to-[#C59B27] rounded-xl shadow-md transition"
                  >
                    <Calendar size={16} />
                    <span>Book Consultation</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

