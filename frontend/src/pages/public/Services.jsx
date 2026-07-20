import React from 'react';
import { useUI } from '../../context/UIContext';
import { Stethoscope, Activity, Heart, Eye, Baby, Clipboard } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <div className="font-sans antialiased text-slate-800 bg-white dark:bg-slate-900 transition-colors duration-200 py-16 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Banner */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold text-primary-500 bg-primary-50 dark:bg-primary-950/20 px-3 py-1 rounded-full uppercase tracking-wider">
            Our Care Catalog
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 font-display">
            Medical Specializations
          </h1>
          <p className="text-base text-slate-500 dark:text-slate-400 mt-4 leading-relaxed font-medium">
            We provide specialized disciplines and support networks to manage patient care timelines efficiently.
          </p>
        </div>

        {/* Services mapping grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {serviceList.map((svc, index) => {
            const Icon = svc.icon;
            return (
              <div key={index} className="bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-805 p-8 rounded-2xl hover-card flex flex-col justify-between">
                <div>
                  <div className="p-3.5 bg-primary-100 dark:bg-primary-950/40 text-primary-650 dark:text-primary-400 rounded-xl w-fit mb-5">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-2">{svc.title}</h3>
                  <p className="text-xs text-slate-405 dark:text-slate-500 leading-relaxed font-semibold">{svc.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Block */}
        <div className="bg-primary-50 dark:bg-slate-850 border border-primary-100 dark:border-slate-800 p-8 rounded-[24px] flex flex-col md:flex-row md:items-center justify-between">
          <div className="max-w-xl text-left">
            <h4 className="text-xl font-bold text-slate-900 dark:text-white font-display">Need a Customized Treatment Chart?</h4>
            <p className="text-xs text-slate-500 mt-1 font-medium">Schedule a diagnostic appointment with Dr. Girija Prasad to map your health targets.</p>
          </div>
          <Link
            to="/book"
            className="mt-6 md:mt-0 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl text-sm transition shadow-lg text-center"
          >
            Schedule Consultation
          </Link>
        </div>

      </div>
    </div>
  );
}
