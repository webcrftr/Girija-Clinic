import { Star, ShieldCheck, ArrowUpRight, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { CLINIC_DOCTORS } from '../data';
import { Doctor } from '../types';

interface DoctorsProps {
  onSelectDoctor: (doctor: Doctor) => void;
  onBookDoctor: (doctorId: string, specialty: string) => void;
}

export default function Doctors({ onSelectDoctor, onBookDoctor }: DoctorsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 90, damping: 16 }
    }
  };

  return (
    <section id="doctors" className="relative py-20 md:py-28 overflow-hidden bg-slate-50/50 border-t border-slate-100">
      <div className="absolute top-[20%] right-0 w-96 h-96 rounded-full bg-brand-100/10 blur-3xl opacity-60 z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono font-medium tracking-wider text-brand-500 uppercase">
            Medical Leadership
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
            Meet Our Board-Certified Specialists
          </h2>
          <p className="text-slate-500 font-light text-sm md:text-base">
            Consult with top-tier practitioners holding active credentials from premier medical research institutes, dedicated to clinical precision and modern disease defense.
          </p>
        </div>

        {/* Doctors Profiles Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          id="doctors-container"
        >
          {CLINIC_DOCTORS.map((doctor) => (
            <motion.div
              key={doctor.id}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="bg-white border border-slate-150 rounded-3xl overflow-hidden transition-all duration-300 hover:border-brand-200 luxury-shadow hover:luxury-shadow-hover group flex flex-col justify-between"
              id={`doctor-card-${doctor.id}`}
            >
              {/* Image Frame with hover scale */}
              <div className="relative aspect-square overflow-hidden bg-slate-50">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-103 duration-700 transition-transform"
                />
                
                {/* Visual Pill Overlay - Specialties */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-slate-800 uppercase tracking-wide border border-slate-100/60 shadow-sm flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-brand-500" />
                    {doctor.specialty.split(' & ')[0]}
                  </span>
                </div>

                {/* Stars/Rating Badge Overlay */}
                <div className="absolute bottom-4 right-4 z-10">
                  <div className="bg-slate-900/90 backdrop-blur px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm text-white">
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-[10px] font-bold font-mono leading-none">{doctor.rating}</span>
                  </div>
                </div>
              </div>

              {/* Bio & Copywriting Container */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-mono font-semibold text-brand-500 uppercase tracking-wider block">
                      {doctor.role}
                    </span>
                    <h3 className="font-display font-bold text-slate-900 text-lg md:text-xl tracking-tight mt-0.5">
                      {doctor.name}
                    </h3>
                  </div>
                  <p className="text-slate-500 font-light text-xs md:text-sm leading-relaxed line-clamp-3">
                    {doctor.bio}
                  </p>
                  <p className="text-[11px] font-semibold text-slate-700 leading-tight truncate">
                    {doctor.education}
                  </p>
                </div>

                {/* Call to Actions */}
                <div className="border-t border-slate-100 pt-4 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onSelectDoctor(doctor)}
                    className="text-xs font-semibold text-slate-700 hover:text-brand-500 flex items-center gap-1 group/btn"
                    id={`view-doc-credentials-${doctor.id}`}
                  >
                    View Credentials
                    <ArrowUpRight className="h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform text-slate-400" />
                  </button>

                  <button
                    onClick={() => onBookDoctor(doctor.id, doctor.specialty)}
                    className="bg-slate-900 text-white text-[11px] font-semibold px-4 py-2 rounded-full hover:bg-brand-500 hover:shadow-md transition-all flex items-center gap-1 cursor-pointer"
                    id={`schedule-doc-btn-${doctor.id}`}
                  >
                    <Calendar className="h-3 w-3" />
                    Schedule
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
