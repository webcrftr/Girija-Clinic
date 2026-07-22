import React from 'react';
import { useUI } from '../../context/UIContext';
import { Stethoscope, Activity, Heart, Eye, Baby, Clipboard, ChevronRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Services() {
  const { settings } = useUI();

  const serviceList = [
    { title: 'General Outpatient Care', desc: 'Routine diagnosis, prescription configurations, health parameters checkups, and wellness monitoring.', icon: Stethoscope },
    { title: 'Cardiovascular Care', desc: 'Heart checks, ECGs, blood pressure diagnostics, and specialized therapies.', icon: Activity },
    { title: 'Chronic Illness Schemes', desc: 'Management protocols for diabetes, high blood pressures, thyroid disorders, and vascular diseases.', icon: Heart },
    { title: 'Wellness & Nutrition', desc: 'Diet mapping, lifestyle diagnostics, preventive care indices, and recovery schemes.', icon: Clipboard },
    { title: 'Pediatric Checkups', desc: 'Child growth tracking, wellness indicators, vaccinations advice, and health monitoring.', icon: Baby },
    { title: 'Geriatric Specialized Care', desc: 'Targeted support structures for senior patients dealing with multiple conditions.', icon: Eye }
  ];

  return (
    <div className="font-sans antialiased text-[#0F172A] bg-white transition-colors duration-200 py-28 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Banner */}
        <div className="max-w-3xl mb-20 space-y-4">
          <span className="text-xs font-bold text-[#2563EB] bg-[#F5F8FD] border border-[#DBEAFE] px-4 py-1.5 rounded-full uppercase tracking-wider">
            Our Care Catalog
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] font-display tracking-tight leading-tight">
            Medical Specializations
          </h1>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed font-normal">
            We provide specialized disciplines and support networks to manage patient care timelines efficiently.
          </p>
        </div>

        {/* Services mapping grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {serviceList.map((svc, index) => {
            const Icon = svc.icon;
            return (
              <motion.div 
                key={index}
                whileHover={{ y: -4 }}
                className="bg-white border border-[#E2E8F0] p-8 rounded-3xl shadow-card hover:shadow-soft-hover transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 bg-[#DBEAFE] text-[#2563EB] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-200">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] font-display mb-3 group-hover:text-[#2563EB] transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed font-normal">
                    {svc.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#F1F5F9] flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Outpatient Discipline</span>
                  <Link 
                    to="/book"
                    className="p-2 bg-[#F5F8FD] text-[#2563EB] rounded-xl group-hover:bg-[#2563EB] group-hover:text-white transition-colors"
                    title="Book for this service"
                  >
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Block */}
        <div className="bg-[#F5F8FD] border border-[#DBEAFE] p-8 sm:p-12 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-subtle">
          <div className="max-w-xl text-left space-y-2">
            <h4 className="text-2xl font-bold text-[#0F172A] font-display">Need a Customized Treatment Chart?</h4>
            <p className="text-xs sm:text-sm text-[#64748B] font-normal">
              Schedule a diagnostic appointment with <strong className="text-[#0F172A] font-semibold">{settings?.doctorName || 'Dr. Girija Prasad'}</strong> to map your health targets.
            </p>
          </div>
          <Link
            to="/book"
            className="px-7 py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-full text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center space-x-2 shrink-0"
          >
            <Calendar size={16} />
            <span>Schedule Consultation</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
