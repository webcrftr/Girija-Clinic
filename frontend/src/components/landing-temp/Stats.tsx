import { motion } from 'motion/react';
import { CLINIC_STATS } from '../data';

export default function Stats() {
  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        type: 'spring',
        stiffness: 80,
        damping: 15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <section className="relative py-12 md:py-16 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          id="stats-container"
        >
          {CLINIC_STATS.map((stat) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-slate-50/60 hover:bg-white rounded-3xl p-6 border border-slate-150 transition-all duration-300 hover:border-brand-100 luxury-shadow hover:luxury-shadow-hover group"
              id={`stat-card-${stat.id}`}
            >
              <div className="flex items-baseline gap-1">
                <span className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {stat.value}
                </span>
                <span className="font-display text-xl md:text-2xl font-bold text-brand-500">
                  {stat.suffix}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-800 uppercase tracking-wider font-mono mt-2.5">
                {stat.label}
              </p>
              <p className="text-xs text-slate-500 font-light mt-1.5 leading-relaxed">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
