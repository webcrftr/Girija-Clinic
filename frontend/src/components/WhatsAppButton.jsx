import React from 'react';
import { useUI } from '../context/UIContext';
import { MessageSquareText } from 'lucide-react';

export default function WhatsAppButton() {
  const { settings } = useUI();
  
  // Clean phone number for WhatsApp link
  // e.g. remove spaces, brackets, characters
  const cleanPhone = settings?.phone?.replace(/[^0-9]/g, '') || '';
  const waUrl = `https://wa.me/${cleanPhone}?text=Hello%20Girija%20Clinic,%20I'd%20like%20to%20inquire%20about%20your%20services%20or%20book%20an%20appointment.`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group flex items-center space-x-2"
      title="Contact us via WhatsApp"
    >
      <MessageSquareText size={22} />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out text-sm font-semibold whitespace-nowrap">
        Chat with us
      </span>
    </a>
  );
}
