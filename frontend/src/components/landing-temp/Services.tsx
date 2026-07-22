import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Sparkles, Shield, GitPullRequest, Layers, Activity, ChevronRight 
} from 'lucide-react';
import { CLINIC_SERVICES } from '../data';
import { Service } from '../types';

interface ServicesProps {
  onSelectService: (service: Service) => void;
  onBookService: (serviceTitle: string) => void;
}

export default function Services({ onSelectService, onBookService }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'clinical' | 'diagnostic' | 'preventive' | 'specialty'>('all');

  // Mapping string to lucide icon component
  const iconMap: { [key: string]: any } = {
    Heart,
    Sparkles,
    Shield,
    GitPullRequest,
    Layers,
    Activity
  };

  const categories = [
    { value: 'all', label: 'All Specialties' },
    { value: 'clinical', label: 'Clinical Medicine' },
    { value: 'preventive', label: 'Preventive & Longevity' },
    { value: 'diagnostic', label: 'Advanced Diagnostics' },
    { value: 'specialty', label: 'Expert Specialty' }
  ];

  const filteredServices = activeCategory === 'all' 
    ? CLINIC_SERVICES 
    : CLINIC_SERVICES.filter(s => s.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="services" className="relative py-20 md:py-28 overflow-hidden bg-white">
      {/* Background visual accents */}
      <div className="absolute top-[30%] left-0 w-80 h-80 rounded-full bg-brand-50/30 blur-3xl opacity-50 z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <span className="text-xs font-mono font-medium tracking-wider text-brand-500 uppercase">
              Elite Specialties
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              Clinical Solutions, <br />
              Tailored with Absolute Precision.
            </h2>
            <p className="text-slate-500 font-light text-sm md:text-base max-w-xl">
              Girija Clinic is structured as an integrated clinical practice. Every department utilizes next-generation diagnostic tools to design your defensive medical blueprints.
            </p>
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value as any)}
              className={`py-2 px-4 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all border cursor-pointer ${
                activeCategory === cat.value
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                  : 'bg-white border-slate-150 text-slate-500 hover:text-slate-800 hover:border-slate-300'
              }`}
              id={`service-tab-${cat.value}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          id="services-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => {
              const SelectedIcon = iconMap[service.iconName] || Activity;
              return (
                <motion.div
                  key={service.id}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-slate-50/50 hover:bg-white border border-slate-150 rounded-3xl p-6 transition-all duration-300 hover:border-brand-200/80 hover:luxury-shadow-hover flex flex-col justify-between group"
                  id={`service-card-${service.id}`}
                >
                  <div className="space-y-4">
                    {/* Icon & Category Indicator */}
                    <div className="flex items-center justify-between">
                      <div className="bg-brand-50 text-brand-500 p-3 rounded-2xl group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 shadow-sm">
                        <SelectedIcon className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-mono tracking-wider font-semibold text-slate-400 uppercase">
                        {service.category}
                      </span>
                    </div>

                    {/* Copywriting */}
                    <div className="space-y-1.5">
                      <h4 className="font-display font-semibold text-slate-800 text-base md:text-lg group-hover:text-brand-500 transition-colors">
                        {service.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-light leading-relaxed line-clamp-3">
                        {service.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="border-t border-slate-100 pt-4 mt-6 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectService(service)}
                      className="text-xs font-semibold text-slate-700 hover:text-brand-500 flex items-center gap-1 group/btn"
                      id={`explore-srv-btn-${service.id}`}
                    >
                      Explore Details 
                      <ChevronRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                    
                    <button
                      onClick={() => onBookService(service.title)}
                      className="bg-white border border-slate-200 text-slate-800 text-[11px] font-semibold px-4 py-2 rounded-full hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all cursor-pointer"
                      id={`book-srv-btn-${service.id}`}
                    >
                      Book Consultation
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
