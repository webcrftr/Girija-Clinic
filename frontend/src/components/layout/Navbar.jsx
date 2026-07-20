import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, HeartPulse, User } from 'lucide-react';
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
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/60 rounded-xl text-primary-500">
                <HeartPulse size={28} className="animate-pulse" />
              </div>
              <span className="text-xl font-bold font-display text-slate-800 dark:text-white">
                {settings?.clinicName}
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-primary-500 dark:text-primary-400 font-semibold'
                    : 'text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin/login"
              className="p-2 text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-white rounded-xl transition"
              title="Admin Portal"
            >
              <User size={20} />
            </Link>
            <Link
              to="/book"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/20 active:scale-95"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center md:hidden">
            <Link
              to="/admin/login"
              className="p-2 mr-2 text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-white rounded-xl"
            >
              <User size={20} />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-white rounded-xl"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors animate-fade-in">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-lg ${
                  isActive(link.path)
                    ? 'text-primary-500 bg-primary-50 dark:bg-primary-950/20 font-semibold'
                    : 'text-slate-600 hover:text-primary-500 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 px-3">
              <Link
                to="/book"
                onClick={() => setIsOpen(false)}
                className="block text-center px-4 py-3 text-base font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-xl transition"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
