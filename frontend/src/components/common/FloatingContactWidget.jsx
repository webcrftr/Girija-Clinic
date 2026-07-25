import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FloatingContactWidget() {
  const phoneRaw = '+919969505111';
  const whatsappUrl = 'https://wa.me/919969505111?text=Hello%20Om%20Ayurveda%20%26%20Girija%20Clinic,%20I%20would%20like%20to%20inquire%20about%20your%20services%20or%20book%20an%20appointment.';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 items-end pointer-events-auto">
      {/* WhatsApp Button (Green - Top) */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:p-4 rounded-full shadow-lg border border-emerald-400/30 group flex items-center justify-center transition-all duration-300 cursor-pointer"
        title="Chat on WhatsApp (+91 99695 05111)"
        aria-label="Chat on WhatsApp with Om Ayurveda & Girija Clinic"
      >
        <MessageSquare size={22} className="text-white shrink-0" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out text-xs font-bold whitespace-nowrap tracking-wide pl-0 group-hover:pl-2">
          WhatsApp Us
        </span>
      </motion.a>

      {/* Call Button (Golden - Bottom) */}
      <motion.a
        href={`tel:${phoneRaw}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="bg-[#C59B27] hover:bg-[#B2881E] text-white p-3.5 sm:p-4 rounded-full shadow-lg border border-amber-300/30 group flex items-center justify-center transition-all duration-300 cursor-pointer"
        title="Call Clinic (+91 99695 05111)"
        aria-label="Call Om Ayurveda & Girija Clinic"
      >
        <Phone size={22} className="text-white shrink-0" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out text-xs font-bold whitespace-nowrap tracking-wide pl-0 group-hover:pl-2">
          Call Now
        </span>
      </motion.a>
    </div>
  );
}
