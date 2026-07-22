import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  onOpenAppointment: () => void;
}

export default function Navbar({ onOpenAppointment }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Doctors', path: '/doctors' },
    { label: 'Testimonials', path: '/testimonials' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'border-b border-white/40 bg-white/30 backdrop-blur-md py-3.5 luxury-shadow' 
            : 'bg-transparent py-5'
        }`}
        id="main-navbar"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
          {/* Logo Brand */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group focus:outline-none"
            id="navbar-logo"
          >
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
              <span className="text-white font-bold text-lg leading-none">G</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Girija Clinic
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 text-[13px] font-medium text-slate-500 uppercase tracking-widest">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative transition-colors py-1 ${
                    isActive ? 'text-brand-500' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  id={`nav-link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-brand-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAppointment}
              className="hidden sm:inline-flex px-6 py-2.5 bg-slate-900 text-white rounded-full text-sm font-semibold hover:bg-brand-600 transition-colors shadow-lg shadow-slate-200 cursor-pointer"
              id="navbar-cta-btn"
            >
              Book Appointment
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors focus:outline-none"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-30 lg:hidden glass-thick border-b border-slate-200/50 p-6 flex flex-col gap-4 shadow-lg"
            id="mobile-navigation-menu"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`py-2 px-3 rounded-xl font-semibold text-sm transition-colors ${
                      isActive 
                        ? 'bg-brand-50 text-brand-600' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                    id={`mobile-nav-link-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <div className="border-t border-slate-100 pt-4 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAppointment();
                }}
                className="w-full bg-brand-500 text-white font-semibold text-sm py-3 rounded-xl hover:bg-brand-600 transition-colors shadow-sm"
                id="mobile-menu-cta-btn"
              >
                Book Appointment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
