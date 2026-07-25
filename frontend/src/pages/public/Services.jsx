import React, { useState } from 'react';
import { useUI } from '../../context/UIContext';
import { Search, Sparkles, ChevronRight, Calendar, CheckCircle2, ArrowRight, Flame, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { treatmentsData } from '../../data/treatmentsData';
import SEOHead from '../../components/common/SEOHead';
import CTABanner from '../../components/common/CTABanner';

export default function Services() {
  const { settings } = useUI();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Signature Therapies',
    'Spine & Joint Care',
    'Neurological & Head',
    'Digestive & Metabolic',
    'Skin & Wellness',
    'Mental & Wellness',
    'Women’s Health'
  ];

  // Filter treatments
  const filteredTreatments = treatmentsData.filter((treatment) => {
    const matchesSearch = treatment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          treatment.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          treatment.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || treatment.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const priorityItems = filteredTreatments.filter(t => t.isPriority);
  const otherItems = filteredTreatments.filter(t => !t.isPriority);

  return (
    <div className="font-sans antialiased text-[#14291D] bg-[#FDFBF7] transition-colors duration-300 py-28 text-left">
      <SEOHead 
        title="Complete Ayurvedic Treatments Directory | Agnikarma, Viddhakarma & Panchakarma"
        description="Explore 17+ specialized Ayurvedic therapies at Girija Clinic under Dr. Ombeer R. Pal. Treatments for Arthritis, Sciatica, Slip Disc, Migraine, Paralysis & Detox."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-12 space-y-4"
        >
          <span className="inline-flex items-center space-x-2 text-xs font-bold text-[#C59B27] bg-[#FDF7E7] px-4 py-1.5 rounded-full uppercase tracking-wider border border-[#C59B27]/40">
            <Sparkles size={14} />
            <span>Classical Ayurvedic Therapies & Procedures</span>
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#14291D] font-display tracking-tight leading-tight">
            Ayurvedic <span className="text-gradient-gold">Treatments & Care</span>
          </h1>
          <p className="text-base sm:text-lg text-[#5C6B61] leading-relaxed font-normal">
            Root cause, non-surgical medical therapies administered under the expert guidance of <strong className="text-[#14291D]">Dr. Ombeer R. Pal</strong> and <strong className="text-[#14291D]">Dr. Jyoti O. Pal</strong>.
          </p>
        </motion.div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white p-6 rounded-3xl border border-[#EAE4D9] shadow-soft mb-12 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search size={18} className="absolute left-4 top-3.5 text-[#5C6B61]" />
              <input
                type="text"
                placeholder="Search treatment (e.g. Agnikarma, Sciatica, Migraine)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#FDFBF7] border border-[#EAE4D9] rounded-2xl text-xs font-medium focus:outline-none focus:border-[#C59B27] text-[#14291D]"
              />
            </div>

            <div className="text-xs text-[#5C6B61] font-semibold">
              Showing <strong className="text-[#14291D]">{filteredTreatments.length}</strong> Treatments
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#EAE4D9]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1B3B2B] text-white shadow-sm'
                    : 'bg-[#F6F2EA] text-[#4A3B32] hover:bg-[#EAE4D9]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PRIORITY SIGNATURE TREATMENTS SECTION (PANCHAKARMA, AGNIKARMA, VIDDHAKARMA) */}
        {priorityItems.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center space-x-3 mb-8">
              <span className="p-2 bg-[#FDF7E7] text-[#C59B27] rounded-xl border border-[#C59B27]/40">
                <Flame size={20} />
              </span>
              <div>
                <h2 className="text-2xl font-extrabold text-[#14291D] font-display">Priority Signature Therapies</h2>
                <p className="text-xs text-[#5C6B61]">Fast-acting, non-surgical Para-surgical procedures and cellular detox regimens.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {priorityItems.map((treatment) => (
                <motion.div
                  key={treatment.slug}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl border-2 border-[#C59B27] p-8 shadow-gold-glow relative overflow-hidden flex flex-col justify-between group transition-all text-left"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-[#FDF7E7] border border-[#C59B27]/40 flex items-center justify-center text-3xl shadow-sm">
                        {treatment.iconEmoji}
                      </div>
                      <span className="text-[10px] font-extrabold text-white bg-gradient-to-r from-[#D4AF37] to-[#C59B27] px-3 py-1 rounded-full uppercase tracking-wider">
                        Priority Treatment
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-extrabold text-[#14291D] font-display">
                        {treatment.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#C59B27] mt-0.5">
                        {treatment.title}
                      </p>
                    </div>

                    <p className="text-xs text-[#5C6B61] leading-relaxed">
                      {treatment.shortDesc}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-[#EAE4D9]">
                      <h4 className="text-xs font-bold text-[#14291D]">Clinical Benefits:</h4>
                      <ul className="space-y-1.5">
                        {treatment.benefits.slice(0, 3).map((b, i) => (
                          <li key={i} className="flex items-center space-x-2 text-xs text-[#14291D]">
                            <CheckCircle2 size={14} className="text-[#C59B27] shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link
                      to={`/treatments/${treatment.slug}`}
                      className="w-full py-3.5 bg-[#1B3B2B] hover:bg-[#C59B27] text-white font-bold rounded-2xl text-xs transition-all shadow-md flex items-center justify-center space-x-2"
                    >
                      <span>Explore Treatment & Procedure</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ALL OTHER TREATMENTS GRID */}
        {otherItems.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl font-extrabold text-[#14291D] font-display mb-8">
              Targeted Condition Therapies
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherItems.map((treatment) => (
                <motion.div 
                  key={treatment.slug}
                  whileHover={{ y: -4 }}
                  className="bg-white border border-[#EAE4D9] hover:border-[#C59B27] p-8 rounded-3xl shadow-card hover:shadow-soft-hover transition-all duration-300 flex flex-col justify-between group text-left"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-[#F6F2EA] group-hover:bg-[#FDF7E7] rounded-2xl flex items-center justify-center text-2xl transition-colors">
                        {treatment.iconEmoji}
                      </div>
                      <span className="text-[10px] font-bold text-[#C59B27] bg-[#FDF7E7] px-3 py-1 rounded-full border border-[#C59B27]/30">
                        {treatment.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-[#14291D] font-display group-hover:text-[#C59B27] transition">
                      {treatment.name}
                    </h3>

                    <p className="text-xs text-[#5C6B61] leading-relaxed font-normal">
                      {treatment.shortDesc}
                    </p>

                    <div className="pt-2">
                      <h4 className="text-[11px] font-bold text-[#14291D] uppercase tracking-wider mb-1.5">Top Benefit:</h4>
                      <div className="flex items-start space-x-2 text-xs text-[#5C6B61]">
                        <CheckCircle2 size={14} className="text-[#C59B27] shrink-0 mt-0.5" />
                        <span>{treatment.benefits[0]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#EAE4D9] flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#5C6B61]">View Protocol Details</span>
                    <Link 
                      to={`/treatments/${treatment.slug}`}
                      className="p-2.5 bg-[#F6F2EA] text-[#1B3B2B] rounded-xl group-hover:bg-[#1B3B2B] group-hover:text-white transition-colors"
                      title="View treatment details"
                    >
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Banner */}
        <CTABanner
          title="Not sure which treatment is right for your condition?"
          subtitle="Book a Nadi Pariksha consultation with Dr. Ombeer R. Pal for an accurate diagnostic evaluation."
          variant="default"
        />

      </div>
    </div>
  );
}

