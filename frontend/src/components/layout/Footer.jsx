import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export default function Footer() {
  const { settings } = useUI();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 dark:bg-slate-950 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-white">
              <HeartPulse size={26} className="text-primary-400" />
              <span className="text-xl font-bold font-display">{settings?.clinicName}</span>
            </div>
            <p className="text-sm">
              Providing holistic and modern healthcare treatments tailored to individual patient wellness.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/services" className="hover:text-white transition">Medical Services</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link to="/book" className="hover:text-white transition">Book Appointment</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2.5">
                <MapPin size={16} className="text-primary-400 mt-0.5 shrink-0" />
                <span>{settings?.address}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone size={16} className="text-primary-400 shrink-0" />
                <span>{settings?.phone}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail size={16} className="text-primary-400 shrink-0" />
                <span>{settings?.email}</span>
              </li>
            </ul>
          </div>

          {/* Opening timings */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">Opening Hours</h3>
            <div className="flex items-start space-x-2.5 text-sm">
              <Clock size={16} className="text-primary-400 mt-0.5 shrink-0" />
              <span>{settings?.openingHours}</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {year} {settings?.clinicName}. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-6">
            <Link to="/admin/login" className="hover:text-white transition font-medium">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
