import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Calendar, HeartPulse } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUI } from '../../context/UIContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { settings } = useUI();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center space-x-3 group shrink-0">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#2563EB] text-white shadow-sm group-hover:bg-[#1D4ED8] transition-colors">
              <HeartPulse size={22} className="text-white" />
            </div>

            <div className="flex flex-col text-left">
              <span className="text-xl font-bold font-display tracking-tight text-[#0F172A]">
                {settings?.clinicName || 'Girija Clinic'}
              </span>
              <span className="text-[10px] font-semibold text-[#64748B] tracking-wider uppercase">
                Private Healthcare
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-1 bg-[#F8FAFC] p-1.5 rounded-full border border-[#E2E8F0]">
              {links.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative px-5 py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
                      active
                        ? 'text-[#2563EB] bg-white shadow-sm font-bold'
                        : 'text-[#64748B] hover:text-[#0F172A]'
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
                className="p-2.5 text-[#64748B] hover:text-[#2563EB] hover:bg-[#F8FAFC] rounded-xl transition-colors border border-transparent hover:border-[#E2E8F0]"
                title="Admin Portal"
              >
                <User size={19} />
              </Link>
              
              <Link
                to="/book"
                className="px-6 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold tracking-wide shadow-sm hover:shadow-md transition-all duration-200 flex items-center space-x-2 shrink-0 active:scale-95"
              >
                <Calendar size={14} />
                <span>Book Appointment</span>
              </Link>
            </div>
          </div>

          {/* Mobile Trigger */}
          <div className="flex items-center md:hidden space-x-2">
            <Link
              to="/admin/login"
              className="p-2 text-[#64748B] hover:text-[#2563EB] rounded-xl"
            >
              <User size={20} />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#0F172A] hover:text-[#2563EB] rounded-xl transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="md:hidden border-b border-[#E2E8F0] bg-white overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2 text-left">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 text-xs font-semibold rounded-xl transition-all ${
                    isActive(link.path)
                      ? 'text-[#2563EB] bg-[#F5F8FD] font-bold'
                      : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2">
                <Link
                  to="/book"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full text-center px-5 py-3 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl shadow-sm transition"
                >
                  <Calendar size={16} />
                  <span>Book Appointment</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
