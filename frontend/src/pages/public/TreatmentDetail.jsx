import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { treatmentsData } from '../../data/treatmentsData';
import SEOHead from '../../components/common/SEOHead';
import CTABanner from '../../components/common/CTABanner';
import { 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles, 
  Flame, 
  Clock, 
  ShieldCheck, 
  Calendar, 
  ChevronRight,
  HelpCircle,
  Stethoscope
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TreatmentDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);

  const treatment = treatmentsData.find(t => t.slug === slug) || treatmentsData[0];

  return (
    <div className="font-sans antialiased text-[#14291D] bg-[#FDFBF7] transition-colors duration-300 py-28 text-left">
      <SEOHead 
        title={`${treatment.title} | Dr. Ombeer R. Pal - Girija Clinic`}
        description={treatment.shortDesc}
        keywords={`${treatment.name}, ${treatment.category}, Dr Ombeer R Pal, Ayurvedic treatment, Girija Clinic`}
        schema={{
          "@context": "https://schema.org",
          "@type": "MedicalProcedure",
          "name": treatment.name,
          "description": treatment.overview,
          "procedureType": "NoninvasiveProcedure",
          "howPerformed": treatment.ayurvedicApproach
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/services')}
            className="inline-flex items-center space-x-2 text-xs font-bold text-[#5C6B61] hover:text-[#1B3B2B] bg-white px-4 py-2 rounded-full border border-[#EAE4D9] shadow-subtle transition"
          >
            <ArrowLeft size={15} />
            <span>Back to All Treatments</span>
          </button>
        </div>

        {/* Treatment Header Hero */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#EAE4D9] shadow-card mb-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-4xl">{treatment.iconEmoji}</span>
                <span className="text-xs font-bold text-[#C59B27] bg-[#FDF7E7] px-3.5 py-1.5 rounded-full border border-[#C59B27]/40 uppercase tracking-widest">
                  {treatment.category}
                </span>
                {treatment.isPriority && (
                  <span className="text-[11px] font-extrabold text-white bg-gradient-to-r from-[#D4AF37] to-[#C59B27] px-3 py-1 rounded-full uppercase tracking-wider">
                    Signature Therapy
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#14291D] font-display">
                {treatment.title}
              </h1>

              <p className="text-base text-[#5C6B61] leading-relaxed font-normal">
                {treatment.overview}
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[#14291D]">
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck size={16} className="text-[#C59B27]" />
                  <span>Supervised by Dr. Ombeer R. Pal</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock size={16} className="text-[#C59B27]" />
                  <span>Outpatient & Safe Procedure</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#FDFBF7] p-6 rounded-2xl border border-[#EAE4D9] space-y-4">
              <h3 className="text-base font-bold text-[#14291D] font-display">Book Treatment Session</h3>
              <p className="text-xs text-[#5C6B61]">Consult directly with Dr. Ombeer R. Pal for customized therapy planning.</p>
              
              <Link
                to="/book"
                className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#C59B27] hover:from-[#C59B27] text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-2 shadow-md transition"
              >
                <Calendar size={16} />
                <span>Book Appointment</span>
              </Link>
            </div>

          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-12 text-left">
            
            {/* Causes & Symptoms Grid */}
            <div className="bg-white p-8 rounded-3xl border border-[#EAE4D9] shadow-card space-y-6">
              <h2 className="text-2xl font-extrabold text-[#14291D] font-display">
                Underlying Causes & Clinical Symptoms
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Causes */}
                <div className="space-y-3 p-5 bg-[#FDFBF7] rounded-2xl border border-[#EAE4D9]">
                  <h3 className="text-sm font-bold text-[#14291D] uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C59B27]" />
                    Root Causes
                  </h3>
                  <ul className="space-y-2">
                    {treatment.causes.map((c, i) => (
                      <li key={i} className="flex items-start space-x-2 text-xs text-[#5C6B61]">
                        <span className="text-[#C59B27] font-bold">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Symptoms */}
                <div className="space-y-3 p-5 bg-[#FDFBF7] rounded-2xl border border-[#EAE4D9]">
                  <h3 className="text-sm font-bold text-[#14291D] uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1B3B2B]" />
                    Key Symptoms
                  </h3>
                  <ul className="space-y-2">
                    {treatment.symptoms.map((s, i) => (
                      <li key={i} className="flex items-start space-x-2 text-xs text-[#5C6B61]">
                        <span className="text-[#1B3B2B] font-bold">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Ayurvedic Approach & Benefits */}
            <div className="bg-white p-8 rounded-3xl border border-[#EAE4D9] shadow-card space-y-6">
              <h2 className="text-2xl font-extrabold text-[#14291D] font-display">
                The Ayurvedic Therapeutic Approach
              </h2>
              <p className="text-sm text-[#5C6B61] leading-relaxed">
                {treatment.ayurvedicApproach}
              </p>

              <div className="space-y-3 pt-2">
                <h3 className="text-base font-bold text-[#14291D] font-display">Documented Benefits:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {treatment.benefits.map((b, i) => (
                    <div key={i} className="p-3 bg-[#F6F2EA] rounded-xl flex items-center space-x-2.5 text-xs text-[#14291D] font-medium">
                      <CheckCircle2 size={16} className="text-[#C59B27] shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step-by-Step Procedure */}
            {treatment.procedureSteps && (
              <div className="bg-white p-8 rounded-3xl border border-[#EAE4D9] shadow-card space-y-6">
                <h2 className="text-2xl font-extrabold text-[#14291D] font-display">
                  Step-by-Step Clinical Procedure
                </h2>

                <div className="space-y-4">
                  {treatment.procedureSteps.map((stepItem, i) => (
                    <div key={i} className="p-5 bg-[#FDFBF7] rounded-2xl border border-[#EAE4D9] space-y-1">
                      <h4 className="text-sm font-bold text-[#1B3B2B] font-display">{stepItem.step}</h4>
                      <p className="text-xs text-[#5C6B61] leading-relaxed">{stepItem.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recovery & Aftercare */}
            {treatment.recovery && (
              <div className="bg-white p-8 rounded-3xl border border-[#EAE4D9] shadow-card space-y-3">
                <h2 className="text-2xl font-extrabold text-[#14291D] font-display">
                  Recovery & Post-Treatment Care
                </h2>
                <p className="text-sm text-[#5C6B61] leading-relaxed">
                  {treatment.recovery}
                </p>
              </div>
            )}

            {/* FAQs */}
            {treatment.faqs && treatment.faqs.length > 0 && (
              <div className="bg-white p-8 rounded-3xl border border-[#EAE4D9] shadow-card space-y-6">
                <h2 className="text-2xl font-extrabold text-[#14291D] font-display">
                  Frequently Asked Questions
                </h2>

                <div className="space-y-3">
                  {treatment.faqs.map((faq, idx) => {
                    const isOpen = activeFaq === idx;
                    return (
                      <div key={idx} className="bg-[#FDFBF7] rounded-xl border border-[#EAE4D9]">
                        <button
                          onClick={() => setActiveFaq(isOpen ? null : idx)}
                          className="w-full p-4 text-left font-bold text-xs sm:text-sm text-[#14291D] flex justify-between items-center"
                        >
                          <span>{faq.q}</span>
                          <span className="text-[#C59B27] text-lg font-bold">{isOpen ? '−' : '+'}</span>
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 text-xs text-[#5C6B61] border-t border-[#EAE4D9] pt-3">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <div className="bg-white p-6 rounded-3xl border border-[#EAE4D9] shadow-card space-y-4 sticky top-28">
              <h3 className="text-lg font-bold text-[#14291D] font-display">Other Signature Treatments</h3>
              <div className="space-y-2">
                {treatmentsData.filter(t => t.slug !== treatment.slug).slice(0, 6).map((other) => (
                  <Link
                    key={other.slug}
                    to={`/treatments/${other.slug}`}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F6F2EA] transition text-xs font-semibold text-[#14291D]"
                  >
                    <span className="flex items-center space-x-2">
                      <span>{other.iconEmoji}</span>
                      <span>{other.name}</span>
                    </span>
                    <ChevronRight size={14} className="text-[#C59B27]" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* CTA Banner */}
        <CTABanner
          title={`Ready to begin your ${treatment.name} recovery?`}
          subtitle="Schedule a consultation with Dr. Ombeer R. Pal at Girija Clinic today."
          variant="gold"
        />

      </div>
    </div>
  );
}
