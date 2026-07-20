import React from 'react';
import { useUI } from '../../context/UIContext';
import { HeartPulse, Target, Shield, Heart } from 'lucide-react';

export default function About() {
  const { settings } = useUI();

  const values = [
    { title: 'Clinical Quality', desc: 'Ensuring highest standard clinical paths and treatments for long-term health.', icon: HeartPulse },
    { title: 'Compassion First', desc: 'Understanding every patient unique constraints, treating they with utmost respect.', icon: Heart },
    { title: 'Advanced Innovation', desc: 'Leveraging digital records systems, secure file sharing, and automated logs.', icon: Target },
    { title: 'Database Security', desc: 'Confidentiality of medical data. Full encryption and local control backups.', icon: Shield },
  ];

  return (
    <div className="font-sans antialiased text-slate-800 bg-white dark:bg-slate-900 transition-colors duration-200 py-16 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold text-primary-500 bg-primary-50 dark:bg-primary-950/20 px-3 py-1 rounded-full uppercase tracking-wider">
            Who We Are
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 font-display">
            About {settings?.clinicName}
          </h1>
          <p className="text-base text-slate-500 dark:text-slate-400 mt-4 leading-relaxed font-medium">
            Since our founding, we have been dedicated to providing holistic diagnostics, wellness schemes, and state-of-the-art care plans for patients across all age segments.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">Our Mission & Philosophy</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              We believe healthcare should be frictionless, secure, and personalized. At {settings?.clinicName}, we unite seasoned clinical expertise with modern digital solutions to offer records tracking, diagnostic bookings, and rapid lab report delivery.
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Dr. Girija Prasad established this healthcare sanctuary to focus on comprehensive therapies. We target root-cause diagnoses rather than quick symptom remedies.
            </p>
          </div>
          <div className="h-72 bg-gradient-to-tr from-primary-500 to-sky-400 rounded-3xl flex items-center justify-center text-7xl text-white shadow-xl shadow-primary-500/10">
            🏥🕊️
          </div>
        </div>

        {/* Values grid */}
        <div className="border-t border-slate-150 dark:border-slate-800 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">Our Core Values</h2>
            <p className="text-xs text-slate-400 mt-2 font-medium">These principles define how we deliver medical consultations and patient management.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="bg-slate-50 dark:bg-slate-850 p-6 rounded-2xl border border-slate-100 dark:border-slate-805">
                  <div className="p-3 bg-primary-100 dark:bg-primary-950 text-primary-600 dark:text-primary-400 rounded-xl w-fit mb-4">
                    <Icon size={18} />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white font-display mb-1">{v.title}</h4>
                  <p className="text-xs text-slate-405 dark:text-slate-500 leading-relaxed font-semibold">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
