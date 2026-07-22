import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Doctors', path: '/doctors' },
    { label: 'Testimonials', path: '/testimonials' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="relative bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Top footer row: brand & links */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-12 border-b border-slate-800 gap-8">
          {/* Logo Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg leading-none">G</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Girija Clinic
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed font-light">
              Premium, board-certified healthcare designed for modern leaders, focusing on precision cardiology, cellular longevity, and proactive health preservation.
            </p>
          </div>

          {/* Links list */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                id={`footer-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Middle footer row: legal & clinical notices */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-[11px] leading-relaxed text-slate-600 border-b border-slate-800/60 font-light">
          <div className="space-y-1">
            <span className="block font-bold text-slate-400 uppercase tracking-wider">HIPAA compliance</span>
            <p>
              Girija Clinic is a fully registered HIPAA compliant medical facility. All digital records, laboratory scan dispatches, and diagnostics telemetry logs are stored using end-to-end medical-grade encryption.
            </p>
          </div>
          <div className="space-y-1">
            <span className="block font-bold text-slate-400 uppercase tracking-wider">medical disclaimer</span>
            <p>
              The materials and case descriptions published on this website are for educational and narrative mapping purposes only. They do not constitute general self-treatment advice. All treatments require formal physical clinical clearance.
            </p>
          </div>
          <div className="space-y-1">
            <span className="block font-bold text-slate-400 uppercase tracking-wider">practice credentialing</span>
            <p>
              All practicing specialists hold active board certifications and medical licensure from state medical councils. Direct consulting schedules are managed strictly by private healthcare concierges.
            </p>
          </div>
        </div>

        {/* Bottom footer row: copyright & scroll to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <div className="flex items-center gap-1">
            <span>© 2026 Girija Clinic Inc. All rights reserved. Designed for elite longevity.</span>
            <Heart className="h-3 w-3 text-brand-500 fill-brand-500" />
          </div>

          <button
            onClick={handleScrollToTop}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer group"
            id="footer-scroll-to-top"
          >
            <span>Scroll to Summit</span>
            <ArrowUp className="h-3.5 w-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
