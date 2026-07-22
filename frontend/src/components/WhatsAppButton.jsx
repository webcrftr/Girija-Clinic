import React from 'react';
import { useUI } from '../context/UIContext';
import { MessageSquareText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  const { settings } = useUI();
  
  const cleanPhone = settings?.phone?.replace(/[^0-9]/g, '') || '';
  const waUrl = `https://wa.me/${cleanPhone}?text=Hello%20Girija%20Clinic,%20I'd%20like%20to%20inquire%20about%20your%20services%20or%20book%20an%20appointment.`;

  return (
    <motion.a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 sm:p-4 rounded-full shadow-lg border border-emerald-500/30 group flex items-center space-x-2.5"
      title="Contact us via WhatsApp"
    >
      <MessageSquareText size={22} className="text-white" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out text-xs font-bold whitespace-nowrap tracking-wide">
        Chat with Us
      </span>
    </motion.a>
  );
}
