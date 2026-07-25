import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ArrowUpRight, ShieldCheck, Award, Sparkles, Heart, Flame } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export default function Footer() {
  const { settings } = useUI();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#14291D] text-emerald-100/80 border-t border-emerald-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-emerald-900/60">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-5 text-left">
            <Link to="/" className="inline-flex items-center space-x-3 group">
              <div className="w-11 h-11 rounded-2xl bg-[#1B3B2B] text-[#C59B27] border border-[#C59B27]/40 flex items-center justify-center shadow-lg">
                <span className="text-xl">🌿</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold font-display text-white tracking-tight">
                  Om Ayurveda
                </span>
                <span className="text-[10px] font-bold text-[#C59B27] tracking-widest uppercase">
                  Main Branch & Girija Clinic
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-emerald-100/75 leading-relaxed max-w-md font-normal">
              Om Ayurveda is a premier healthcare practice led by <strong className="text-white">Dr. Ombeer R. Pal</strong> and <strong className="text-white">Dr. Jyoti O. Pal</strong>, delivering authentic root-cause healing, Panchakarma, Agnikarma, Viddhakarma, and holistic Homeopathy across two branches in Mira Road (East).
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <div className="inline-flex items-center space-x-1.5 text-[11px] font-bold text-[#C59B27] bg-[#C59B27]/15 border border-[#C59B27]/30 px-3 py-1 rounded-full">
                <Award size={13} />
                <span>Govt Certified Ayurveda Institute</span>
              </div>
              <div className="inline-flex items-center space-x-1.5 text-[11px] font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-full">
                <ShieldCheck size={13} />
                <span>Dr. Ombeer R. Pal Lead Physician</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-2 text-left space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-display border-b border-[#C59B27]/30 pb-2">
              Signature Care
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/services" className="hover:text-[#C59B27] transition-colors flex items-center space-x-1.5">
                  <Flame size={12} className="text-[#C59B27]" />
                  <span>Agnikarma Pain Relief</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#C59B27] transition-colors flex items-center space-x-1.5">
                  <Sparkles size={12} className="text-[#C59B27]" />
                  <span>Viddhakarma Needling</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#C59B27] transition-colors flex items-center space-x-1.5">
                  <span>🌿 Panchakarma Detox</span>
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="hover:text-[#C59B27] transition-colors">Our Doctor Team</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C59B27] transition-colors">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Branch 1 Address */}
          <div className="md:col-span-2 text-left space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-display border-b border-[#C59B27]/30 pb-2 flex items-center space-x-1.5">
              <span>🌿 Main Branch</span>
            </h4>
            <div className="space-y-2 text-[11px] text-emerald-100/90 leading-relaxed">
              <p className="font-bold text-[#C59B27]">Om Ayurveda</p>
              <p>Shop No. 5, Bldg 10, Sec 4, Shanti Garden, Opp MBMC Garden</p>
              <p className="font-medium text-emerald-200">Mira Road (E), Thane – 401107</p>
              <p className="text-[10px] text-emerald-300/80 pt-1">
                ⏱ 09:00 AM – 10:00 PM<br/>
                ⏱ 02:00 PM – 03:30 PM (By Appt)
              </p>
            </div>
          </div>

          {/* Branch 2 Address */}
          <div className="md:col-span-3 text-left space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-display border-b border-[#C59B27]/30 pb-2 flex items-center space-x-1.5">
              <span>🌿 Branch 2</span>
            </h4>
            <div className="space-y-2 text-[11px] text-emerald-100/90 leading-relaxed">
              <p className="font-bold text-[#C59B27]">Girija Clinic</p>
              <p>Shop No. 1, Tukaram Mhatre Chawl, Datta Mandir Road, Penkarpada</p>
              <p className="font-medium text-emerald-200">Mira Road (E), Thane – 401107</p>
              <p className="text-[10px] text-emerald-300/80 pt-1">
                ⏱ Morning: 10:00 AM – 01:30 PM<br/>
                ⏱ Evening: 06:00 PM – 10:30 PM
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-emerald-200/60">
          <p>&copy; {year} Om Ayurveda & Girija Clinic. Led by Dr. Ombeer R. Pal & Dr. Jyoti O. Pal. All rights reserved.</p>
          <div className="mt-4 sm:mt-0 flex items-center space-x-6">
            <Link
              to="/admin/login"
              className="text-emerald-200 hover:text-[#C59B27] transition font-medium flex items-center space-x-1"
            >
              <span>Doctor Portal</span>
              <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

