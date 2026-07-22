import React from 'react';
import { useUI } from '../../context/UIContext';
import { HeartPulse, Target, Shield, Heart, Award, CheckCircle2, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const { settings } = useUI();

  const values = [
    { title: 'Clinical Quality', desc: 'Ensuring highest standard clinical paths and treatments for long-term health.', icon: HeartPulse },
    { title: 'Compassion First', desc: 'Understanding every patient unique constraints, treating them with utmost respect.', icon: Heart },
    { title: 'Advanced Innovation', desc: 'Leveraging digital records systems, secure file sharing, and automated logs.', icon: Target },
    { title: 'Database Security', desc: 'Confidentiality of medical data. Full encryption and local control backups.', icon: Shield },
  ];

  return (
    <div className="font-sans antialiased text-[#0F172A] bg-white transition-colors duration-200 py-28 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Header */}
        <div className="max-w-3xl mb-20 space-y-4">
          <span className="text-xs font-bold text-[#2563EB] bg-[#F5F8FD] border border-[#DBEAFE] px-4 py-1.5 rounded-full uppercase tracking-wider">
            Who We Are
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] font-display tracking-tight leading-tight">
            About <span className="text-[#2563EB]">{settings?.clinicName || 'Girija Clinic'}</span>
          </h1>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed font-normal">
            Since our founding, we have been dedicated to providing holistic diagnostics, wellness schemes, and state-of-the-art care plans for patients across all age segments.
          </p>
        </div>

        {/* Story Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-display">
              Our Mission & Philosophy
            </h2>
            <p className="text-[#64748B] text-sm sm:text-base leading-relaxed font-normal">
              We believe healthcare should be frictionless, secure, and personalized. At <strong className="text-[#0F172A] font-semibold">{settings?.clinicName || 'Girija Clinic'}</strong>, we unite seasoned clinical expertise with modern digital solutions to offer records tracking, diagnostic bookings, and rapid lab report delivery.
            </p>
            <p className="text-[#64748B] text-sm sm:text-base leading-relaxed font-normal">
              <strong className="text-[#0F172A] font-semibold">{settings?.doctorName || 'Dr. Girija Prasad'}</strong> established this healthcare sanctuary to focus on comprehensive therapies. We target root-cause diagnoses rather than quick symptom remedies.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center space-x-3.5 p-4 bg-white border border-[#E2E8F0] rounded-2xl shadow-subtle">
                <div className="p-2.5 bg-[#DBEAFE] text-[#2563EB] rounded-xl shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">15+ Years Experience</h4>
                  <p className="text-[11px] text-[#64748B]">Board Certified Specialist</p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5 p-4 bg-white border border-[#E2E8F0] rounded-2xl shadow-subtle">
                <div className="p-2.5 bg-[#DBEAFE] text-[#2563EB] rounded-xl shrink-0">
                  <UserCheck size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">Patient-Centric Care</h4>
                  <p className="text-[11px] text-[#64748B]">Individualized Regimens</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="h-96 rounded-3xl bg-[#F5F8FD] border border-[#E2E8F0] flex flex-col items-center justify-center p-8 text-center shadow-soft">
              <div className="w-24 h-24 rounded-2xl bg-white border border-[#DBEAFE] flex items-center justify-center text-6xl mb-6 shadow-subtle">
                🏥
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] font-display">{settings?.clinicName || 'Girija Clinic'}</h3>
              <p className="text-xs text-[#64748B] mt-2 max-w-xs font-medium">
                Modern Outpatient Care & Diagnostic Sanctuary
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="border-t border-[#E2E8F0] pt-24">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="px-4 py-1.5 bg-[#F5F8FD] border border-[#DBEAFE] text-[#2563EB] text-xs font-bold rounded-full uppercase tracking-wider">
              Core Principles
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F172A] font-display tracking-tight">
              Our Core Values
            </h2>
            <p className="text-xs text-[#64748B] font-medium">
              These principles define how we deliver medical consultations and patient management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -4 }}
                  className="bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-card text-left space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center">
                    <Icon size={22} />
                  </div>
                  <h4 className="text-base font-bold text-[#0F172A] font-display">{v.title}</h4>
                  <p className="text-xs text-[#64748B] leading-relaxed font-normal">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
