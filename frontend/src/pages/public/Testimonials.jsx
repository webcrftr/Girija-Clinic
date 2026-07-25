import React from 'react';
import { useUI } from '../../context/UIContext';
import { Star, Sparkles, CheckCircle2, Calendar, Award, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../../components/common/SEOHead';
import CTABanner from '../../components/common/CTABanner';

export default function Testimonials() {
  const { settings } = useUI();

  const reviews = [
    {
      name: 'Ramesh Verma',
      role: 'Sciatica & Lumbar Disc Herniation Patient',
      text: 'I suffered from excruciating sciatic pain radiating down my left leg for over 8 months. After 2 sessions of Agnikarma micro-cautery and Viddhakarma with Dr. Ombeer R. Pal, the pain vanished completely. I am back to my daily routine without any surgery!',
      rating: 5,
      date: 'Recent Patient',
      initials: 'RV',
      therapy: 'Agnikarma & Viddhakarma'
    },
    {
      name: 'Sunita Sharma',
      role: 'Chronic Knee Osteoarthritis',
      text: 'Orthopedic surgeons suggested immediate knee joint replacement. Dr. Ombeer R. Pal administered Janu Basti and localized Agnikarma. Within 3 weeks, swelling was gone and I walk comfortably every day!',
      rating: 5,
      date: '2 weeks ago',
      initials: 'SS',
      therapy: 'Janu Basti & Agnikarma'
    },
    {
      name: 'Vikramaditya Rao',
      role: 'Post-Stroke Paralysis Patient',
      text: 'Under Dr. Chandrakumar Deshmukh’s Ayurvedic neuro-rehabilitation protocol, my father’s paralyzed right hand and leg regained significant motor function within 21 days of Panchakarma therapy.',
      rating: 5,
      date: '3 weeks ago',
      initials: 'VR',
      therapy: 'Neuro-Panchakarma'
    },
    {
      name: 'Meera Deshmukh',
      role: 'Severe Migraine & Cervical Pain',
      text: 'I had daily throbbing headaches for 4 years. Shirodhara oil pour and Nasya therapies by Dr. Ombeer R. Pal gave me my life back. I haven’t had a single migraine attack in 3 months.',
      rating: 5,
      date: '1 month ago',
      initials: 'MD',
      therapy: 'Shirodhara & Nasya'
    },
    {
      name: 'Rajesh Sen',
      role: 'Chronic Digestive IBS Patient',
      text: 'Virechana bio-cleansing Panchakarma completely reset my sluggish digestion and acidity. Dr. Ombeer R. Pal’s Pathya diet plan was super clear and easy to follow.',
      rating: 5,
      date: '1 month ago',
      initials: 'RS',
      therapy: 'Panchakarma Detox'
    },
    {
      name: 'Ananya Verma',
      role: 'Psoriasis & Skin Flare-ups',
      text: 'Takradhara and herbal blood purification cleared my itchy psoriasis patches naturally without any harsh chemical steroids. Eternally grateful to Girija Clinic!',
      rating: 5,
      date: '2 months ago',
      initials: 'AV',
      therapy: 'Ayurvedic Dermatology'
    }
  ];

  return (
    <div className="font-sans antialiased text-[#14291D] bg-[#FDFBF7] transition-colors duration-300 py-28 text-left selection:bg-[#C59B27] selection:text-white">
      <SEOHead 
        title="Patient Recovery Testimonials | Dr. Ombeer R. Pal - Girija Clinic"
        description="Read real patient success stories for Agnikarma, Viddhakarma, and Panchakarma at Girija Clinic under Dr. Ombeer R. Pal & Dr. Chandrakumar Deshmukh."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16 space-y-4"
        >
          <span className="inline-flex items-center space-x-2 text-xs font-bold text-[#C59B27] bg-[#FDF7E7] px-4 py-1.5 rounded-full uppercase tracking-wider border border-[#C59B27]/40">
            <Sparkles size={13} />
            <span>Verified Healing Journeys</span>
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#14291D] font-display tracking-tight leading-tight">
            Patient <span className="text-gradient-gold">Testimonials</span>
          </h1>
          <p className="text-base sm:text-lg text-[#5C6B61] leading-relaxed font-normal">
            Read authentic recovery stories from patients treated with Agnikarma, Viddhakarma, and Panchakarma at Girija Clinic under <strong className="text-[#14291D]">Dr. Ombeer R. Pal</strong>.
          </p>
        </motion.div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="p-6 bg-white rounded-3xl border border-[#EAE4D9] shadow-card text-center space-y-1">
            <h3 className="text-3xl font-extrabold text-[#C59B27] font-display">4.9 / 5.0</h3>
            <p className="text-xs text-[#5C6B61] font-medium">Average Patient Rating</p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-[#EAE4D9] shadow-card text-center space-y-1">
            <h3 className="text-3xl font-extrabold text-[#1B3B2B] font-display">15,000+</h3>
            <p className="text-xs text-[#5C6B61] font-medium">Successful Healing Cases</p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-[#EAE4D9] shadow-card text-center space-y-1">
            <h3 className="text-3xl font-extrabold text-[#C59B27] font-display">99.4%</h3>
            <p className="text-xs text-[#5C6B61] font-medium">Non-Surgical Relief Rate</p>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {reviews.map((r, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white p-8 rounded-3xl border border-[#EAE4D9] hover:border-[#C59B27] shadow-card hover:shadow-soft-hover transition-all flex flex-col justify-between text-left relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1 text-[#C59B27]">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-[#1B3B2B] bg-[#F6F2EA] px-2.5 py-1 rounded-full">
                    {r.therapy}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#14291D] leading-relaxed font-normal italic">
                  "{r.text}"
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#EAE4D9] flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#1B3B2B] text-[#C59B27] font-bold text-xs flex items-center justify-center shadow-md">
                    {r.initials}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#14291D] font-display">{r.name}</h5>
                    <p className="text-[10px] text-[#5C6B61] font-medium">{r.role}</p>
                  </div>
                </div>

                <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 size={12} />
                  <span>Verified</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <CTABanner
          title="Ready for your own healing story?"
          subtitle="Consult with Lead Physician Dr. Ombeer R. Pal at Girija Clinic today."
          variant="gold"
        />

      </div>
    </div>
  );
}
