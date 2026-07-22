import { Calendar, ArrowRight, ShieldCheck, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenAppointment: () => void;
  onExploreServices: () => void;
}

export default function Hero({ onOpenAppointment, onExploreServices }: HeroProps) {
  // Anim container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <section 
      id="home" 
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-brand-50/20 via-white to-slate-50/30"
    >
      {/* Elegant minimalist background shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] right-[5%] w-96 h-96 rounded-full bg-brand-100/30 blur-3xl opacity-60" />
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-slate-100/60 blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left copywriting column */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col space-y-6 md:space-y-8"
          >
            {/* Tagline */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-brand-500 text-xs font-bold uppercase tracking-wider w-fit"
            >
              <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse"></span>
              World-Class Healthcare
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.95] tracking-tight text-slate-900">
                Modern <br /> Healthcare,<br />
                <span className="text-brand-500">
                  Personalized
                </span><br /> for You.
              </h1>
              
              <p className="text-slate-500 text-lg leading-relaxed max-w-md font-light">
                At Girija Clinic, we combine cutting-edge technology with compassionate care to ensure your well-being comes first, every single day.
              </p>
            </motion.div>

            {/* Two CTA buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={onOpenAppointment}
                className="px-8 py-4 bg-brand-500 text-white rounded-2xl font-bold shadow-xl shadow-blue-200/50 hover:scale-105 transition-transform duration-300 cursor-pointer"
                id="hero-cta-book"
              >
                Book Appointment
              </button>

              <button
                onClick={onExploreServices}
                className="px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-colors duration-300 cursor-pointer"
                id="hero-cta-services"
              >
                Explore Services
              </button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-3 gap-8 pt-4 border-t border-slate-200"
            >
              <div>
                <div className="text-3xl font-bold text-slate-900">15k+</div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Happy Patients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">25+</div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Expert Doctors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">10+</div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Award Winning</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Imagery and Floating Card Column */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[580px] lg:min-h-0">
            
            {/* Visual Frame wrapper */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.2 }}
              className="relative w-full max-w-[450px] aspect-[450/550] bg-blue-100 rounded-[4rem] overflow-hidden shadow-2xl border border-white"
            >
              <img 
                src="/src/assets/images/hero_doctor_1784608778507.jpg" 
                alt="Dr. Girija V. Prasad" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center scale-102 hover:scale-105 duration-700 transition-transform" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-500/40 via-transparent to-transparent" />
              
              {/* Doctor Name overlay directly on visual */}
              <div className="absolute bottom-8 left-8 right-8 z-10">
                <div className="text-white">
                  <div className="text-sm font-medium opacity-80">Founding Medical Director</div>
                  <div className="text-2xl font-bold">Dr. Girija V. Prasad</div>
                  <div className="text-xs opacity-75 mt-0.5">Harvard Medical School MD</div>
                </div>
              </div>
              
              {/* Decorative shapes */}
              <div className="absolute top-10 right-10 w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>
            </motion.div>

            {/* Floating Glass Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30, y: -30 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 90, damping: 18, delay: 0.45 }}
              className="absolute top-[15%] -left-8 w-64 p-5 bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-2xl flex items-center gap-4 z-20"
              id="hero-floating-card"
            >
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Success</div>
                <div className="text-sm font-bold text-slate-900">Appointment Booked</div>
              </div>
            </motion.div>

            {/* Doctor Profile Snippet */}
            <motion.div 
              initial={{ opacity: 0, x: 30, y: 30 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 90, damping: 18, delay: 0.6 }}
              className="absolute bottom-[10%] -right-4 w-72 p-6 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl z-20"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="text-sm font-medium">Specialized in Cardiology</div>
                <div className="flex gap-0.5">
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-slate-300">"Our commitment to clinical excellence and compassionate service ensures every patient feels like family."</p>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
