import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doctorsData } from '../../data/doctorsData';
import SEOHead from '../../components/common/SEOHead';
import CTABanner from '../../components/common/CTABanner';
import { 
  ArrowLeft, 
  Award, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  BookOpen, 
  GraduationCap, 
  Sparkles 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DoctorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const doctor = doctorsData.find(d => d.id === id) || doctorsData[0];

  return (
    <div className="font-sans antialiased text-[#14291D] bg-[#FDFBF7] transition-colors duration-300 py-28 text-left selection:bg-[#C59B27] selection:text-white">
      <SEOHead 
        title={`${doctor.name} - ${doctor.title} | Girija Clinic`}
        description={doctor.summary}
        keywords={`${doctor.name}, ${doctor.title}, Dr Ombeer R Pal, Dr Chandrakumar Deshmukh, Girija Clinic`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/doctors')}
            className="inline-flex items-center space-x-2 text-xs font-bold text-[#5C6B61] hover:text-[#1B3B2B] bg-white px-4 py-2 rounded-full border border-[#EAE4D9] shadow-subtle transition"
          >
            <ArrowLeft size={15} />
            <span>Back to All Doctors</span>
          </button>
        </div>

        {/* Hero Showcase Card */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#EAE4D9] shadow-card mb-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-40 h-40 rounded-3xl bg-[#1B3B2B] text-[#C59B27] border-2 border-[#C59B27]/40 flex items-center justify-center text-7xl shadow-2xl">
                {doctor.avatarIcon}
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-extrabold text-[#C59B27] uppercase tracking-widest bg-[#FDF7E7] px-3.5 py-1.5 rounded-full border border-[#C59B27]/40">
                {doctor.title}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#14291D] font-display">
                {doctor.name}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-[#5C6B61]">
                {doctor.degrees} • {doctor.experience}
              </p>
              <p className="text-xs sm:text-sm text-[#5C6B61] leading-relaxed font-normal">
                {doctor.tagline}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/book"
                  className="px-7 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#C59B27] hover:from-[#C59B27] text-white text-xs font-bold rounded-2xl transition shadow-md flex items-center justify-center space-x-2"
                >
                  <Calendar size={16} />
                  <span>Book Consultation with {doctor.name}</span>
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Detailed Biography & Credentials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          
          <div className="lg:col-span-8 space-y-8">
            
            {/* Biography */}
            <div className="bg-white p-8 rounded-3xl border border-[#EAE4D9] shadow-card space-y-4">
              <h2 className="text-2xl font-extrabold text-[#14291D] font-display">Professional Biography</h2>
              <p className="text-xs sm:text-sm text-[#5C6B61] leading-relaxed">
                {doctor.summary}
              </p>
            </div>

            {/* Specializations */}
            <div className="bg-white p-8 rounded-3xl border border-[#EAE4D9] shadow-card space-y-4">
              <h2 className="text-2xl font-extrabold text-[#14291D] font-display">Clinical Specializations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {doctor.specializations.map((spec, i) => (
                  <div key={i} className="p-3 bg-[#FDFBF7] rounded-xl border border-[#EAE4D9] flex items-center space-x-2.5 text-xs text-[#14291D] font-medium">
                    <CheckCircle2 size={16} className="text-[#C59B27] shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white p-8 rounded-3xl border border-[#EAE4D9] shadow-card space-y-4">
              <h2 className="text-2xl font-extrabold text-[#14291D] font-display">Research & Key Achievements</h2>
              <div className="space-y-3">
                {doctor.achievements.map((ach, i) => (
                  <div key={i} className="flex items-start space-x-3 text-xs text-[#5C6B61] p-3 bg-[#F6F2EA] rounded-xl">
                    <Award size={16} className="text-[#C59B27] shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="lg:col-span-4 space-y-6">
            {/* Education */}
            <div className="bg-white p-6 rounded-3xl border border-[#EAE4D9] shadow-card space-y-4">
              <h3 className="text-lg font-bold text-[#14291D] font-display border-b border-[#EAE4D9] pb-3">Education & Fellowships</h3>
              <div className="space-y-4">
                {doctor.education.map((edu, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <h4 className="font-bold text-[#14291D]">{edu.degree}</h4>
                    <p className="text-[#5C6B61]">{edu.institution} ({edu.year})</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timings Card */}
            <div className="bg-[#1B3B2B] text-white p-6 rounded-3xl border border-[#C59B27]/40 shadow-xl space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#C59B27]">
                <Clock size={16} />
                <span>Consultation Timings</span>
              </div>
              <p className="text-xs text-emerald-100 font-medium leading-relaxed">
                {doctor.consultationHours}
              </p>
              <Link
                to="/book"
                className="w-full py-3 bg-[#C59B27] hover:bg-[#B2881E] text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-2 transition shadow-md mt-2"
              >
                <span>Reserve Appointment</span>
              </Link>
            </div>
          </div>

        </div>

        {/* CTA Banner */}
        <CTABanner
          title={`Consult with ${doctor.name}`}
          subtitle="Experience authentic Ayurvedic pulse diagnosis and personalized non-surgical therapies."
          variant="gold"
        />

      </div>
    </div>
  );
}
