import { Star, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { CLINIC_TESTIMONIALS } from '../data';

export default function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 16 }
    }
  };

  return (
    <section id="testimonials" className="relative py-20 md:py-28 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Heading with Google Badge */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="text-xs font-mono font-medium tracking-wider text-brand-500 uppercase">
              Patient Outcomes
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              A Direct Reflection of Our Care
            </h2>
            <p className="text-slate-500 font-light text-sm md:text-base max-w-xl">
              We operate with absolute transparency. Read authentic, verified summaries of patients who entrust their long-term health, cardiovascular screenings, and recovery to Girija Clinic.
            </p>
          </div>

          {/* Luxury Google reviews score summary */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex items-center gap-4 w-fit h-fit shrink-0">
            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center border border-slate-100 shadow-sm">
              <svg className="h-5 w-5" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-display font-extrabold text-slate-800 text-lg leading-none">4.9</span>
                <div className="flex text-yellow-500">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 tracking-wide mt-1 block">
                Verified Google Reviews (1,240+ Patients)
              </span>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          id="testimonials-grid"
        >
          {CLINIC_TESTIMONIALS.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              className="bg-slate-50/50 hover:bg-white rounded-3xl p-6 md:p-8 border border-slate-150 transition-all duration-300 hover:border-brand-200 luxury-shadow hover:luxury-shadow-hover flex flex-col justify-between"
              id={`testimonial-card-${testimonial.id}`}
            >
              <div className="space-y-6">
                {/* 5 Stars Rating & Google Review Indicator */}
                <div className="flex items-center justify-between">
                  <div className="flex text-yellow-500 gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  {/* Small verified badge */}
                  {testimonial.verified && (
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-100/50 text-[9px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 tracking-wider uppercase">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                      Verified Patient
                    </span>
                  )}
                </div>

                {/* Review Message Text */}
                <p className="text-slate-600 text-sm leading-relaxed font-light italic">
                  "{testimonial.text}"
                </p>
              </div>

              {/* Author Row */}
              <div className="border-t border-slate-100 pt-5 mt-6 flex items-center gap-3.5">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
                />
                <div className="min-w-0">
                  <span className="block font-semibold text-slate-800 text-sm leading-tight truncate">
                    {testimonial.name}
                  </span>
                  <span className="block text-[11px] text-slate-400 font-medium truncate mt-0.5">
                    {testimonial.role}
                  </span>
                  <span className="inline-block text-[10px] bg-brand-50 text-brand-600 font-bold px-2 py-0.5 rounded-md mt-1.5 uppercase font-mono tracking-wide">
                    {testimonial.treatment}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
