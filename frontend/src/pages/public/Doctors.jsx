import React, { useState } from 'react';
import { useUI } from '../../context/UIContext';
import { Award, CheckCircle2, Calendar, Sparkles, Clock, ShieldCheck, Heart, UserCheck, ArrowRight, BookOpen, GraduationCap, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { doctorsData } from '../../data/doctorsData';
import SEOHead from '../../components/common/SEOHead';
import CTABanner from '../../components/common/CTABanner';

export default function Doctors() {
  const { settings } = useUI();
  const [selectedDoctor, setSelectedDoctor] = useState(doctorsData[0]);

  return (
    <div className="font-sans antialiased text-[#14291D] bg-[#FDFBF7] transition-colors duration-300 py-28 text-left selection:bg-[#C59B27] selection:text-white">
      <SEOHead 
        title="Senior Medical Specialists | Dr. Ombeer R. Pal & Dr. Jyoti O. Pal"
        description="Meet Dr. Ombeer R. Pal (Senior Panchakarma & Musculoskeletal Specialist) and Dr. Jyoti O. Pal (Senior Homeopathic Physician & Women's Health Specialist) at Girija Clinic."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16 space-y-4"
        >
          <span className="inline-flex items-center space-x-2 text-xs font-bold text-[#C59B27] bg-[#FDF7E7] px-4 py-1.5 rounded-full uppercase tracking-wider border border-[#C59B27]/40">
            <Sparkles size={13} />
            <span>Ayurvedic Medical Leadership</span>
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#14291D] font-display tracking-tight leading-tight">
            Our Senior <span className="text-gradient-gold">Medical Specialists</span>
          </h1>
          <p className="text-base sm:text-lg text-[#5C6B61] leading-relaxed font-normal">
            Meet our veteran Ayurvedic physicians combining ancient Vedic pulse diagnosis (Nadi Pariksha) with modern clinical science to deliver lasting, non-surgical relief.
          </p>
        </motion.div>

        {/* DOCTORS SHOWCASE CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          {doctorsData.map((doc, idx) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white rounded-3xl border-2 border-[#EAE4D9] hover:border-[#C59B27] shadow-card hover:shadow-soft-hover p-8 sm:p-10 flex flex-col justify-between transition-all text-left"
            >
              <div className="space-y-6">
                
                {/* Doctor Avatar Header */}
                <div className="flex items-start space-x-5">
                  <div className="w-20 h-20 rounded-2xl bg-[#1B3B2B] text-[#C59B27] border border-[#C59B27]/40 flex items-center justify-center text-4xl shrink-0 shadow-lg">
                    {doc.avatarIcon}
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-[#C59B27] uppercase tracking-wider">
                      {doc.title}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14291D] font-display mt-0.5">
                      {doc.name}
                    </h2>
                    <p className="text-xs text-[#5C6B61] font-semibold mt-1">
                      {doc.degrees}
                    </p>
                    <p className="text-xs font-extrabold text-[#1B3B2B] mt-0.5">
                      {doc.experience}
                    </p>
                  </div>
                </div>

                {/* Biography Summary */}
                <p className="text-xs sm:text-sm text-[#5C6B61] leading-relaxed font-normal border-t border-[#EAE4D9] pt-4">
                  {doc.summary}
                </p>

                {/* Specializations List */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-[#14291D] uppercase tracking-wider">
                    Clinical Specializations:
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {doc.specializations.map((spec, i) => (
                      <div key={i} className="flex items-center space-x-2.5 p-2.5 bg-[#FDFBF7] rounded-xl border border-[#EAE4D9] text-xs font-medium text-[#14291D]">
                        <CheckCircle2 size={16} className="text-[#C59B27] shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements List */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-[#14291D] uppercase tracking-wider">
                    Key Achievements & Research:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#5C6B61]">
                    {doc.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Award size={14} className="text-[#C59B27] shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Care Philosophy */}
                <div className="p-4 bg-[#F6F2EA] rounded-2xl border border-[#EAE4D9] space-y-1 text-xs">
                  <span className="font-bold text-[#1B3B2B]">Holistic Care Philosophy:</span>
                  <p className="text-[#5C6B61] italic leading-relaxed">"{doc.philosophy}"</p>
                </div>

              </div>

              {/* Consultation Timings & Action */}
              <div className="pt-8 mt-6 border-t border-[#EAE4D9] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-2 text-xs text-[#5C6B61] font-medium">
                  <Clock size={16} className="text-[#C59B27] shrink-0" />
                  <span>{doc.consultationHours}</span>
                </div>

                <Link
                  to="/book"
                  className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#C59B27] hover:from-[#C59B27] text-white font-bold rounded-2xl text-xs transition-all shadow-md flex items-center justify-center space-x-2 active:scale-95"
                >
                  <Calendar size={16} />
                  <span>Book Consultation</span>
                </Link>
              </div>

            </motion.div>
          ))}
        </div>

        {/* ACADEMIC & CLINICAL QUALIFICATIONS SECTION */}
        <div className="border-t border-[#EAE4D9] pt-16 mb-16 text-left">
          <div className="max-w-2xl mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14291D] font-display">
              Academic Qualifications & Credentials
            </h2>
            <p className="text-xs text-[#5C6B61] font-medium">
              Medical degrees, doctoral research fellowships, and government affiliations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {doctorsData.map((doc) => (
              <div key={doc.id} className="bg-white p-8 rounded-3xl border border-[#EAE4D9] shadow-card space-y-4">
                <h3 className="text-xl font-bold text-[#14291D] font-display border-b border-[#EAE4D9] pb-3">
                  {doc.name} Qualifications
                </h3>
                <div className="space-y-4">
                  {doc.education.map((edu, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-xs">
                      <div className="w-8 h-8 rounded-xl bg-[#FDF7E7] text-[#C59B27] flex items-center justify-center shrink-0 mt-0.5">
                        <GraduationCap size={16} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#14291D]">{edu.degree}</h4>
                        <p className="text-[#5C6B61]">{edu.institution} • {edu.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <CTABanner
          title="Consult Directly with Dr. Ombeer R. Pal & Dr. Jyoti O. Pal"
          subtitle="Experience precision Nadi Pariksha, Agnikarma, Viddhakarma, Panchakarma, and Holistic Homeopathic consultations."
          variant="gold"
        />

      </div>
    </div>
  );
}
