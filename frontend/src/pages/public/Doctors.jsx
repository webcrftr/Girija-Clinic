import React from 'react';
import { useUI } from '../../context/UIContext';
import { Award, CheckCircle2, Calendar, Sparkles, Stethoscope, Clock, ShieldCheck, Heart, UserCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Doctors() {
  const { settings } = useUI();

  const doctorData = {
    name: settings?.doctorName || 'Dr. Girija Prasad',
    role: 'Head Medical Director & Senior Physician',
    degrees: 'MBBS, MD (Internal Medicine)',
    experience: '15+ Years Clinical Experience',
    bio: 'Dr. Girija Prasad is a distinguished medical practitioner specializing in internal medicine, holistic diagnostics, and chronic care management. With over 15 years of clinical practice, Dr. Girija is dedicated to evidence-based healthcare tailored to each patient’s unique physiological profile.',
    specialties: [
      'Internal Medicine & Acute Care',
      'Cardiology Diagnostics & ECG',
      'Diabetes & Hypertension Management',
      'Preventive Metabolic Programs',
      'Geriatric Health Protocols',
      'Holistic Wellness Counseling'
    ],
    qualifications: [
      { title: 'MBBS', institution: 'Premier University of Medical Sciences' },
      { title: 'MD (Internal Medicine)', institution: 'National Institute of Medical Research' },
      { title: 'Fellowship in Clinical Diagnostics', institution: 'International Board of Internal Medicine' }
    ]
  };

  return (
    <div className="font-sans antialiased text-[#0F172A] bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-300 py-24 text-left selection:bg-blue-600 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16 space-y-4"
        >
          <span className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-4 py-1.5 rounded-full uppercase tracking-wider border border-blue-200/50 dark:border-blue-800/40">
            <Sparkles size={13} />
            <span>Medical Leadership</span>
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] dark:text-white font-display tracking-tight leading-tight">
            Specialist <span className="text-gradient-primary">Medical Director</span>
          </h1>
          <p className="text-base sm:text-lg text-[#64748B] dark:text-slate-400 leading-relaxed font-normal">
            Meet our lead physician providing personalized consultations, advanced diagnostics, and long-term care programs at Girija Clinic.
          </p>
        </motion.div>

        {/* Main Doctor Showcase Card */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-slate-900 rounded-4xl border border-slate-200/80 dark:border-slate-800 shadow-luxury p-8 sm:p-12 mb-20 relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Doctor Portrait visual */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] rounded-3xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-700 text-white flex flex-col items-center justify-center p-8 text-center shadow-xl relative overflow-hidden group">
                <div className="w-32 h-32 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center text-7xl mb-6 shadow-2xl border border-white/20 group-hover:scale-105 transition-transform duration-300">
                  👨‍⚕️
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display">{doctorData.name}</h3>
                <p className="text-xs text-blue-100 font-bold uppercase tracking-wider mt-1">{doctorData.degrees}</p>
                <div className="mt-6 inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 px-4 py-2 rounded-full text-xs font-semibold text-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Available for Consultations</span>
                </div>
              </div>
            </div>

            {/* Doctor Details */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                  Head Medical Director
                </span>
                <h2 className="text-3xl font-extrabold text-[#0F172A] dark:text-white font-display mt-1">
                  {doctorData.name}
                </h2>
                <p className="text-xs text-[#64748B] dark:text-slate-400 font-semibold mt-1">
                  {doctorData.experience} • {doctorData.degrees}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 leading-relaxed font-normal">
                {doctorData.bio}
              </p>

              {/* Specialties List */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">
                  Clinical Specialties & Focus Areas
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {doctorData.specialties.map((spec, i) => (
                    <div key={i} className="flex items-center space-x-2.5 p-2.5 bg-[#F8FAFC] dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs font-medium text-[#0F172A] dark:text-slate-200">
                      <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consultation Timings & Action */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4 border-t border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center space-x-3 text-xs text-[#64748B] dark:text-slate-400 font-medium">
                  <Clock size={18} className="text-blue-600 shrink-0" />
                  <span>Mon - Sat: 09:00 AM - 08:00 PM</span>
                </div>

                <Link
                  to="/book"
                  className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl text-xs transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 active:scale-95"
                >
                  <Calendar size={16} />
                  <span>Book Appointment with Dr. Girija</span>
                </Link>
              </div>

            </div>

          </div>
        </motion.div>

        {/* Qualifications Section */}
        <div className="border-t border-slate-200/80 dark:border-slate-800 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl font-extrabold text-[#0F172A] dark:text-white font-display">
              Qualifications & Credentials
            </h2>
            <p className="text-xs text-[#64748B] dark:text-slate-400 font-medium">
              Academic honors, medical certifications, and ongoing professional affiliations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doctorData.qualifications.map((q, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-card text-left space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center border border-blue-100 dark:border-blue-800">
                  <Award size={20} />
                </div>
                <h4 className="text-base font-bold text-[#0F172A] dark:text-white font-display">{q.title}</h4>
                <p className="text-xs text-[#64748B] dark:text-slate-400 font-normal leading-relaxed">{q.institution}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
