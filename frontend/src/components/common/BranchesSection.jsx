import React from 'react';
import { branchesData } from '../../data/branchesData';
import { MapPin, Clock, Phone, MessageSquare, Navigation, Calendar, Sparkles, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function BranchesSection({ showTitle = true, className = "" }) {
  return (
    <section className={`py-20 bg-[#FDFBF7] relative overflow-hidden text-left ${className}`}>
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C59B27]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1B3B2B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {showTitle && (
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center space-x-2 text-xs font-bold text-[#C59B27] bg-[#FDF7E7] px-4 py-1.5 rounded-full uppercase tracking-wider border border-[#C59B27]/40">
              <Sparkles size={14} />
              <span>Two Convenient Locations in Mira Road (East)</span>
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#14291D] font-display tracking-tight">
              Our <span className="text-gradient-gold">Branches</span>
            </h2>

            <p className="text-sm sm:text-base text-[#5C6B61] leading-relaxed font-normal">
              Healing Through Authentic Ayurveda – Visit the branch most convenient for you.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {branchesData.map((branch, index) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -4 }}
              className={`bg-white rounded-3xl p-8 sm:p-10 border transition-all flex flex-col justify-between relative overflow-hidden shadow-card ${
                branch.isMain 
                  ? 'border-[#C59B27] shadow-gold-glow' 
                  : 'border-[#EAE4D9] hover:border-[#C59B27]'
              }`}
            >
              {/* Header Badge & Name */}
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <span className={`text-[11px] uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-sm ${branch.badgeClass}`}>
                    {branch.badge}
                  </span>
                  
                  <span className="text-xs text-[#5C6B61] font-semibold flex items-center gap-1.5">
                    <Building2 size={15} className="text-[#C59B27]" />
                    <span>Mira Road (East)</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14291D] font-display flex items-center space-x-2">
                    <span>🌿 {branch.name}</span>
                  </h3>
                  <p className="text-xs text-[#C59B27] font-bold uppercase tracking-wider mt-1">
                    {branch.tagline}
                  </p>
                </div>

                {/* Address Card */}
                <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#EAE4D9] space-y-2">
                  <div className="flex items-start space-x-3 text-xs text-[#14291D]">
                    <MapPin size={18} className="text-[#C59B27] shrink-0 mt-0.5" />
                    <div className="space-y-0.5 leading-relaxed">
                      <p className="font-bold text-[#14291D]">{branch.address.line1}</p>
                      <p className="text-[#5C6B61]">{branch.address.line2}</p>
                      <p className="font-semibold text-[#1B3B2B]">{branch.address.city}</p>
                    </div>
                  </div>
                </div>

                {/* Hours Box */}
                <div className="p-4 bg-[#1B3B2B] text-white rounded-2xl border border-[#C59B27]/30 space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-[#C59B27] border-b border-emerald-800/80 pb-2">
                    <Clock size={16} />
                    <span>Consultation Hours</span>
                  </div>
                  <div className="space-y-1.5 pt-1 text-xs">
                    {branch.hours.map((h, i) => (
                      <div key={i} className="flex flex-col sm:flex-row justify-between text-emerald-100/90 gap-0.5">
                        <span className="font-medium text-emerald-200/70">{h.label}:</span>
                        <strong className="text-white font-semibold">{h.time}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-8 border-t border-[#EAE4D9] mt-8">
                {/* Get Directions */}
                <a
                  href={branch.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-2 bg-[#F6F2EA] hover:bg-[#EAE4D9] text-[#14291D] font-bold text-[11px] sm:text-xs rounded-xl flex items-center justify-center space-x-1.5 transition border border-[#EAE4D9] active:scale-95 text-center"
                >
                  <Navigation size={14} className="text-[#C59B27] shrink-0" />
                  <span>Get Directions</span>
                </a>

                {/* Call Now */}
                <a
                  href={`tel:${branch.phoneRaw}`}
                  className="py-3 px-2 bg-[#1B3B2B] hover:bg-[#14291D] text-white font-bold text-[11px] sm:text-xs rounded-xl flex items-center justify-center space-x-1.5 transition shadow-sm active:scale-95 text-center"
                >
                  <Phone size={14} className="text-[#C59B27] shrink-0" />
                  <span>Call Now</span>
                </a>

                {/* WhatsApp */}
                <a
                  href={branch.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-[11px] sm:text-xs rounded-xl flex items-center justify-center space-x-1.5 transition shadow-sm active:scale-95 text-center"
                >
                  <MessageSquare size={14} className="shrink-0" />
                  <span>WhatsApp</span>
                </a>

                {/* Book Appointment */}
                <Link
                  to={`/book?branch=${branch.id}`}
                  className="py-3 px-2 bg-gradient-to-r from-[#D4AF37] to-[#C59B27] hover:from-[#C59B27] hover:to-[#B2881E] text-white font-bold text-[11px] sm:text-xs rounded-xl flex items-center justify-center space-x-1.5 transition shadow-md active:scale-95 text-center col-span-2 sm:col-span-1"
                >
                  <Calendar size={14} className="shrink-0" />
                  <span>Book Visit</span>
                </Link>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
