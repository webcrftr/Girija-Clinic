import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Phone, Mail, MapPin, Clock, ArrowUpRight, ShieldCheck, Award } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export default function Footer() {
  const { settings } = useUI();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#F8FAFC] text-[#64748B] border-t border-[#E2E8F0] transition-colors">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#E2E8F0]">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-5 text-left">
            <Link to="/" className="inline-flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shadow-sm">
                <HeartPulse size={20} />
              </div>
              <span className="text-xl font-bold font-display text-[#0F172A] tracking-tight">
                {settings?.clinicName || 'Girija Clinic'}
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed max-w-md font-normal">
              Girija Clinic is a modern private healthcare center dedicated to providing holistic diagnostics, compassionate care, and seamless appointment management.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <div className="inline-flex items-center space-x-1.5 text-[11px] font-semibold text-[#2563EB] bg-[#DBEAFE]/40 border border-[#DBEAFE] px-3 py-1 rounded-full">
                <Award size={13} />
                <span>Licensed Healthcare Center</span>
              </div>
              <div className="inline-flex items-center space-x-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                <ShieldCheck size={13} />
                <span>Verified Specialist</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-2 text-left space-y-4">
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-widest font-display">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-[#2563EB] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#2563EB] transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#2563EB] transition-colors">Medical Services</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#2563EB] transition-colors">Contact Clinic</Link>
              </li>
              <li>
                <Link to="/book" className="text-[#2563EB] font-bold hover:underline transition-colors inline-flex items-center gap-1 pt-1">
                  <span>Book Appointment</span>
                  <ArrowUpRight size={12} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-3 text-left space-y-4">
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-widest font-display">
              Contact Details
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start space-x-3">
                <div className="p-1.5 rounded-lg bg-[#DBEAFE]/50 text-[#2563EB] shrink-0 mt-0.5">
                  <MapPin size={14} />
                </div>
                <span className="leading-relaxed text-[#0F172A]">{settings?.address || 'Girija Clinic, Main Road, India'}</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="p-1.5 rounded-lg bg-[#DBEAFE]/50 text-[#2563EB] shrink-0">
                  <Phone size={14} />
                </div>
                <span className="text-[#0F172A]">{settings?.phone || '+91 98765 43210'}</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="p-1.5 rounded-lg bg-[#DBEAFE]/50 text-[#2563EB] shrink-0">
                  <Mail size={14} />
                </div>
                <span className="text-[#0F172A]">{settings?.email || 'care@girijaclinic.com'}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="md:col-span-2 text-left space-y-4">
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-widest font-display">
              Working Hours
            </h4>
            <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] space-y-2 shadow-subtle">
              <div className="flex items-center space-x-2 text-xs font-semibold text-[#2563EB]">
                <Clock size={14} />
                <span>Consultation Schedule</span>
              </div>
              <p className="text-xs text-[#0F172A] leading-relaxed font-medium">
                {settings?.openingHours || 'Mon - Sat: 09:00 AM - 08:00 PM'}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-[#64748B]">
          <p>&copy; {year} {settings?.clinicName || 'Girija Clinic'}. All rights reserved.</p>
          <div className="mt-4 sm:mt-0 flex items-center space-x-6">
            <Link
              to="/admin/login"
              className="text-[#64748B] hover:text-[#2563EB] transition font-medium flex items-center space-x-1"
            >
              <span>Doctor / Admin Portal</span>
              <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
