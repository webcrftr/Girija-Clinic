import React from 'react';
import { useUI } from '../../context/UIContext';
import { Sparkles, Award, ShieldCheck, Heart, Target, CheckCircle2, UserCheck, Feather, Compass, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/common/SEOHead';
import CTABanner from '../../components/common/CTABanner';

export default function About() {
  const { settings } = useUI();

  const values = [
    { title: 'Authentic Classical Lineage', desc: 'Preserving ancient Ayurvedic principles from Sushruta and Charaka Samhita with utmost clinical purity.', icon: Feather },
    { title: 'Root Cause Diagnostics', desc: 'Evaluating Vata, Pitta, and Kapha imbalances through precision Nadi Pariksha (Pulse Diagnosis).', icon: Compass },
    { title: 'Non-Surgical Expertise', desc: 'Pioneering Para-Surgical Agnikarma and Viddhakarma therapies for immediate joint and spine relief.', icon: Flame },
    { title: 'Integrated Patient Care', desc: 'Combining 5,000-year-old Vedic wisdom with modern diagnostic blood tests, MRI, and digital records.', icon: ShieldCheck },
  ];

  return (
    <div className="font-sans antialiased text-[#14291D] bg-[#FDFBF7] transition-colors duration-300 py-28 text-left">
      <SEOHead 
        title="About Girija Clinic | Authentic Ayurveda & Dr. Ombeer R. Pal"
        description="Learn about Girija Clinic, led by Dr. Ombeer R. Pal (MD Ayurveda) and Dr. Jyoti O. Pal (Senior Homeopathic Physician). Our mission is root-cause healing and holistic care."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16 space-y-4"
        >
          <span className="inline-flex items-center space-x-2 text-xs font-bold text-[#C59B27] bg-[#FDF7E7] px-4 py-1.5 rounded-full uppercase tracking-wider border border-[#C59B27]/40">
            <Sparkles size={14} />
            <span>Ayurvedic Institution of Excellence</span>
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#14291D] font-display tracking-tight leading-tight">
            About <span className="text-gradient-gold">Girija Clinic</span>
          </h1>
          <p className="text-base sm:text-lg text-[#5C6B61] leading-relaxed font-normal">
            A trusted center for root-cause healing, specialized Agnikarma thermal cautery, Viddhakarma needling, and classical Panchakarma therapy under <strong className="text-[#14291D]">Dr. Ombeer R. Pal</strong>.
          </p>
        </motion.div>

        {/* Story Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14291D] font-display">
              Our Vision & Medical Philosophy
            </h2>
            <p className="text-[#5C6B61] text-sm sm:text-base leading-relaxed font-normal">
              At <strong className="text-[#14291D] font-semibold">{settings?.clinicName || 'Girija Clinic'}</strong>, we believe true healing occurs when disease is eradicated at its cellular root cause. Rather than offering short-term symptomatic relief, our treatments focus on restoring harmony to Vata, Pitta, and Kapha doshas.
            </p>
            <p className="text-[#5C6B61] text-sm sm:text-base leading-relaxed font-normal">
              Under the leadership of Senior Physician <strong className="text-[#14291D] font-semibold">Dr. Ombeer R. Pal</strong> and Senior Homeopathic Physician <strong className="text-[#14291D] font-semibold">Dr. Jyoti O. Pal</strong>, our clinic has successfully restored health to over 15,000 patients suffering from chronic joint pain, sciatica, slip disc, migraines, women's health conditions, and metabolic disorders.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center space-x-3.5 p-4 bg-white border border-[#EAE4D9] rounded-2xl shadow-subtle">
                <div className="p-2.5 bg-[#FDF7E7] text-[#C59B27] border border-[#C59B27]/40 rounded-xl shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#14291D]">25+ Years Experience</h4>
                  <p className="text-[11px] text-[#5C6B61]">Senior Doctor Leadership</p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5 p-4 bg-white border border-[#EAE4D9] rounded-2xl shadow-subtle">
                <div className="p-2.5 bg-[#FDF7E7] text-[#C59B27] border border-[#C59B27]/40 rounded-xl shrink-0">
                  <UserCheck size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#14291D]">100% Natural Therapies</h4>
                  <p className="text-[11px] text-[#5C6B61]">Zero Synthetic Side Effects</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-gradient-to-b from-[#1B3B2B] to-[#14291D] border border-[#C59B27]/40 flex flex-col items-center justify-center p-10 text-center shadow-2xl text-white relative overflow-hidden">
              <div className="w-24 h-24 rounded-2xl bg-[#C59B27]/20 border border-[#C59B27]/40 flex items-center justify-center text-6xl mb-6 shadow-md">
                🌿
              </div>
              <h3 className="text-2xl font-bold font-display text-white">{settings?.clinicName || 'Girija Clinic'}</h3>
              <p className="text-xs text-[#C59B27] font-bold uppercase tracking-widest mt-1">
                Ayurvedic Healthcare & Research
              </p>
              <p className="text-xs text-emerald-200/80 mt-4 leading-relaxed max-w-xs font-normal">
                Dr. Ombeer R. Pal & Dr. Jyoti O. Pal
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="border-t border-[#EAE4D9] pt-20 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="px-4 py-1.5 bg-[#F6F2EA] border border-[#EAE4D9] text-[#1B3B2B] text-xs font-bold rounded-full uppercase tracking-wider">
              Clinical Pillars
            </span>
            <h2 className="text-3xl font-extrabold text-[#14291D] font-display tracking-tight">
              Our Core Medical Principles
            </h2>
            <p className="text-xs text-[#5C6B61] font-medium">
              These principles guide every consultation, Panchakarma therapy, and Para-surgical treatment we provide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => {
              const IconComponent = v.icon;
              return (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -4 }}
                  className="bg-white p-8 rounded-3xl border border-[#EAE4D9] shadow-card hover:border-[#C59B27] transition-all text-left space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#1B3B2B] text-[#C59B27] flex items-center justify-center">
                    <IconComponent size={22} />
                  </div>
                  <h4 className="text-base font-bold text-[#14291D] font-display">{v.title}</h4>
                  <p className="text-xs text-[#5C6B61] leading-relaxed font-normal">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner */}
        <CTABanner
          title="Schedule Your Nadi Pariksha Consultation"
          subtitle="Consult with Dr. Ombeer R. Pal for an authentic Ayurvedic assessment."
          variant="gold"
        />

      </div>
    </div>
  );
}

