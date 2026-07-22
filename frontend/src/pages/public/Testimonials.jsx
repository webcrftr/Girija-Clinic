import React from 'react';
import { useUI } from '../../context/UIContext';
import { Star, Sparkles, Quote, CheckCircle2, Calendar, ThumbsUp, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const { settings } = useUI();

  const reviews = [
    {
      name: 'Aarav Sharma',
      role: 'Diabetes Management Patient',
      text: 'Dr. Girija Prasad is extraordinarily patient and methodical. He took the time to review my blood indices and design a personalized diet and medication plan. The online appointment booking system makes scheduling follow-ups completely seamless!',
      rating: 5,
      date: 'Recent Visit',
      initials: 'AS'
    },
    {
      name: 'Priya Patel',
      role: 'Regular Health Assessment',
      text: 'The clinic ambiance feels like a premier private hospital in London or Singapore. Clean, peaceful, and zero queue waiting time. Highly recommend Girija Clinic for anyone looking for holistic primary care.',
      rating: 5,
      date: '1 week ago',
      initials: 'PP'
    },
    {
      name: 'Karan Malhotra',
      role: 'Hypertension Patient',
      text: 'Under Dr. Girija’s continuous advice, my blood pressure levels have stabilized completely. The staff is polite, professional, and always available via WhatsApp for minor queries.',
      rating: 5,
      date: '2 weeks ago',
      initials: 'KM'
    },
    {
      name: 'Meera Deshmukh',
      role: 'Geriatric Care for Parent',
      text: 'Brought my senior mother for comprehensive health evaluation. Dr. Girija was extremely gentle and thorough. Having our prescriptions and diagnostic reports available online is a massive help for our family.',
      rating: 5,
      date: '3 weeks ago',
      initials: 'MD'
    },
    {
      name: 'Rajesh Sen',
      role: 'Cardiology Checkup',
      text: 'State-of-the-art diagnostic facilities and quick ECG reporting. Dr. Girija explained my cardiovascular risk parameters clearly without rushing. Truly 5-star medical service.',
      rating: 5,
      date: '1 month ago',
      initials: 'RS'
    },
    {
      name: 'Ananya Verma',
      role: 'Preventive Wellness Regimen',
      text: 'I booked my diagnostic checkup online within 2 minutes. The consultation was precise, empowering, and focused on preventive health. Extremely impressed with Girija Clinic!',
      rating: 5,
      date: '1 month ago',
      initials: 'AV'
    }
  ];

  return (
    <div className="font-sans antialiased text-[#0F172A] bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-300 py-24 text-left selection:bg-blue-600 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16 space-y-4"
        >
          <span className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-4 py-1.5 rounded-full uppercase tracking-wider border border-blue-200/50 dark:border-blue-800/40">
            <Sparkles size={13} />
            <span>Verified Patient Experiences</span>
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] dark:text-white font-display tracking-tight leading-tight">
            Patient <span className="text-gradient-primary">Testimonials</span>
          </h1>
          <p className="text-base sm:text-lg text-[#64748B] dark:text-slate-400 leading-relaxed font-normal">
            Read direct feedback from patients who have completed consultations, diagnostics, and long-term care programs at Girija Clinic.
          </p>
        </motion.div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-card text-center space-y-1">
            <h3 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-display">4.9 / 5.0</h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 font-medium">Average Patient Rating</p>
          </div>
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-card text-center space-y-1">
            <h3 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-display">10,000+</h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 font-medium">Patients Treated</p>
          </div>
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-card text-center space-y-1">
            <h3 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-display">99.8%</h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 font-medium">Satisfaction Rate</p>
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
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-luxury-hover transition-all flex flex-col justify-between text-left relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1 text-amber-400">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">{r.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#0F172A] dark:text-slate-300 leading-relaxed font-normal italic">
                  "{r.text}"
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-md">
                    {r.initials}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#0F172A] dark:text-white font-display">{r.name}</h5>
                    <p className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">{r.role}</p>
                  </div>
                </div>

                <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200/50">
                  <CheckCircle2 size={12} />
                  <span>Verified</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-8 sm:p-12 rounded-4xl shadow-luxury text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display">
            Join Thousands of Satisfied Patients
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto font-normal">
            Book your consultation online with Dr. Girija Prasad and experience high-end private healthcare.
          </p>
          <div className="pt-2">
            <Link
              to="/book"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl text-xs sm:text-sm hover:bg-blue-50 transition-all shadow-xl hover:scale-105"
            >
              <Calendar size={18} />
              <span>Book Appointment Now</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
