import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Award, Languages, Users, Star, ArrowRight } from 'lucide-react';
import { Doctor } from '../types';

interface DoctorModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBook: (doctorId: string, specialty: string) => void;
}

export default function DoctorModal({ doctor, onClose, onBook }: DoctorModalProps) {
  return (
    <AnimatePresence>
      {doctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            id="doctor-modal-backdrop"
          />

          {/* Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white p-0 luxury-shadow border border-slate-100 max-h-[90vh] flex flex-col z-10"
            id="doctor-modal-content"
          >
            {/* Header close button absolute over image */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 rounded-full p-2 bg-white/80 backdrop-blur text-slate-500 hover:bg-white hover:text-slate-800 transition-colors shadow-sm"
              id="close-doc-modal-btn"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Split layout inside scrollable area */}
            <div className="flex-1 overflow-y-auto">
              {/* Doctor visual and summary banner */}
              <div className="relative flex flex-col md:flex-row items-stretch bg-gradient-to-br from-brand-50/50 to-slate-50 border-b border-slate-100">
                <div className="w-full md:w-2/5 h-64 md:h-auto min-h-[220px] relative">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent md:bg-gradient-to-r" />
                </div>

                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center space-y-3">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-brand-500 uppercase">
                    Board-Certified Consultant
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                    {doctor.name}
                  </h3>
                  <p className="text-sm font-semibold text-brand-600 leading-none">
                    {doctor.specialty}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    <div className="bg-white px-2.5 py-1 rounded-full border border-slate-100 text-xs text-slate-600 font-medium flex items-center gap-1 shadow-sm">
                      <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-slate-800">{doctor.rating}</span>
                      <span className="text-slate-400">({doctor.reviewsCount} patient reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Extended Details Body */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Biography */}
                <div className="space-y-2">
                  <h4 className="font-display text-sm font-bold text-slate-800 uppercase tracking-wider">
                    Physician Narrative
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-light">
                    {doctor.bio}
                  </p>
                </div>

                {/* Structured Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="flex gap-3">
                    <div className="bg-brand-50 text-brand-500 p-2.5 rounded-xl h-fit border border-brand-100 shadow-sm">
                      <Award className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-400 uppercase tracking-wide">Credentials</span>
                      <span className="text-sm font-semibold text-slate-800 leading-tight mt-0.5 block">{doctor.education}</span>
                      <span className="text-xs font-medium text-slate-500 mt-0.5 block">{doctor.experience}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-brand-50 text-brand-500 p-2.5 rounded-xl h-fit border border-brand-100 shadow-sm">
                      <Languages className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-400 uppercase tracking-wide">Communication</span>
                      <span className="text-sm font-semibold text-slate-800 mt-0.5 block">{doctor.languages.join(', ')}</span>
                      <span className="text-xs font-medium text-slate-500 mt-0.5 block">Fluent consultation & reports</span>
                    </div>
                  </div>
                </div>

                {/* Consultation Availability */}
                <div className="border-t border-slate-100 pt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 text-slate-600 p-2.5 rounded-xl">
                      <Calendar className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-400 uppercase tracking-wide">Practice Days</span>
                      <span className="text-sm font-semibold text-slate-800">
                        {doctor.availability.join(', ')} (By Appointment Only)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Booking Trigger */}
            <div className="border-t border-slate-100 bg-slate-50 p-6 flex items-center justify-between gap-4">
              <div className="hidden sm:block">
                <span className="text-xs text-slate-500 leading-none block">Private Consultation</span>
                <span className="text-sm font-bold text-slate-800 mt-1 block">Request Custom Schedule</span>
              </div>
              <button
                onClick={() => {
                  onBook(doctor.id, doctor.specialty);
                  onClose();
                }}
                className="flex-1 sm:flex-initial bg-slate-900 text-white rounded-full px-8 py-3.5 text-center text-sm font-semibold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-sm"
                id="doc-modal-book-btn"
              >
                Secure Consultation with {doctor.name.split(' ').slice(-1)[0]} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
