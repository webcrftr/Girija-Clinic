import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, PhoneCall, MessageSquare, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CTABanner({
  title = "Ready to experience root-cause Ayurvedic healing?",
  subtitle = "Consult with Dr. Ombeer R. Pal & Dr. Chandrakumar Deshmukh today for personalized, non-surgical treatment plans.",
  primaryBtnText = "Book Doctor Consultation",
  secondaryBtnText = "WhatsApp Direct Consult",
  variant = "default" // 'default' | 'gold' | 'compact'
}) {
  return (
    <div className="w-full my-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`relative overflow-hidden rounded-3xl p-8 sm:p-12 text-white shadow-2xl ${
          variant === 'gold'
            ? 'bg-gradient-to-r from-[#1B3B2B] via-[#27523C] to-[#C59B27] border border-[#C59B27]/40'
            : 'bg-gradient-to-br from-[#14291D] via-[#1B3B2B] to-[#27523C] border border-emerald-900/50'
        }`}
      >
        {/* Subtle Background Herbal Watermark Pattern */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-[#C59B27]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-flex items-center space-x-2 text-xs font-bold text-[#C59B27] bg-[#C59B27]/15 px-4 py-1.5 rounded-full uppercase tracking-wider border border-[#C59B27]/30">
              <Sparkles size={14} className="text-[#C59B27]" />
              <span>Begin Your Wellness Journey</span>
            </span>

            <h3 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white leading-tight">
              {title}
            </h3>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl font-normal">
              {subtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-emerald-200 font-medium">
              <div className="flex items-center space-x-2">
                <ShieldCheck size={16} className="text-[#C59B27]" />
                <span>100% Authentic Classical Ayurveda</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck size={16} className="text-[#C59B27]" />
                <span>Non-Surgical Pain Protocols</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-end">
            <Link
              to="/book"
              className="px-7 py-4 bg-gradient-to-r from-[#C59B27] to-[#B2881E] hover:from-[#D4AF37] hover:to-[#C59B27] text-white font-bold rounded-2xl text-sm transition-all shadow-lg shadow-[#C59B27]/25 flex items-center justify-center space-x-2.5 group active:scale-95"
            >
              <Calendar size={18} />
              <span>{primaryBtnText}</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="https://wa.me/15550192834?text=Hello%20Girija%20Clinic,%20I%20would%20like%20to%20consult%20Dr.%20Ombeer%20R.%20Pal"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl text-sm border border-white/20 backdrop-blur-md transition-all flex items-center justify-center space-x-2 active:scale-95"
            >
              <MessageSquare size={17} className="text-emerald-300" />
              <span>{secondaryBtnText}</span>
            </a>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
