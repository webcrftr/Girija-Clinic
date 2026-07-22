import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Calendar, 
  ShieldCheck, 
  Award, 
  Users, 
  ChevronRight, 
  Star, 
  Stethoscope, 
  Activity,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  ArrowRight,
  UserCheck,
  Building2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useUI } from '../../context/UIContext';

export default function Home() {
  const { settings } = useUI();

  const services = [
    { title: 'General Medicine', desc: 'Holistic assessment, clinical diagnostics and tailored treatment regimens for acute illnesses.', icon: Stethoscope },
    { title: 'Cardiology Services', desc: 'Heart checks, ECG diagnostics, arterial blood pressure tracking, and preventive therapies.', icon: Activity },
    { title: 'Chronic Care', desc: 'Continuing diagnostic regimens for Diabetes, Hypertension, Thyroid, and vascular conditions.', icon: ShieldCheck },
    { title: 'Lab & Diagnostics', desc: 'Pathology testing, blood chemistry indices, metabolic profiles, and rapid report delivery.', icon: FileSpreadsheet },
  ];

  const benefits = [
    { title: 'Experienced Care', desc: 'Led by licensed practitioners with over 15 years in medical sciences and clinical research.', icon: Award },
    { title: 'Patient-First Policy', desc: 'Individualized treatment charts mapped out for long-term health and vitality.', icon: Heart },
    { title: 'Prompt Scheduling', desc: 'Zero queue friction. Select real-time calendar slots and reserve visits online.', icon: Calendar },
    { title: 'Advanced Facilities', desc: 'Modern lab setups, state-of-the-art diagnostic tools, and digital health records.', icon: Users },
  ];

  const testimonials = [
    { 
      name: 'Aarav Sharma', 
      role: 'Diabetes Management Patient', 
      text: 'Dr. Girija Prasad is exceptionally thorough and patient. The online portal allowed me to pick a slot easily, and my prescription logs are always available online.',
      initials: 'AS',
      rating: 5
    },
    { 
      name: 'Priya Patel', 
      role: 'Regular Wellness Checkups', 
      text: 'Clean clinic, super supportive staff. The WhatsApp integration and online scheduling make managing doctor visits effortless!',
      initials: 'PP',
      rating: 5
    },
    { 
      name: 'Karan Malhotra', 
      role: 'Hypertension Patient', 
      text: 'Professional, state-of-the-art diagnostics environment. Under Dr. Girija’s advice I have managed to stabilize my vitals completely.',
      initials: 'KM',
      rating: 5
    }
  ];

  return (
    <div className="font-sans antialiased text-[#0F172A] bg-white transition-colors duration-200">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#F5F8FD] py-28 lg:py-36 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-7 text-left"
            >
              {/* Badge Pill */}
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white border border-[#DBEAFE] text-[#2563EB] text-xs font-bold tracking-wide shadow-subtle">
                <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                <span>Health & Wellness Sanctuary</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-[1.15] font-display">
                Modern Healthcare, <br />
                <span className="text-[#2563EB]">Personalized for You</span>
              </h1>

              {/* Body Text */}
              <p className="text-base sm:text-lg text-[#64748B] font-normal leading-relaxed max-w-xl">
                Welcome to <strong className="text-[#0F172A] font-semibold">{settings?.clinicName || 'Girija Clinic'}</strong>. We provide state-of-the-art medical records, diagnostic scheduling, and direct clinical follow-ups powered by experienced practitioners.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                <Link
                  to="/book"
                  className="px-8 py-4 text-xs sm:text-sm font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-full transition-all duration-200 shadow-sm hover:shadow-md text-center flex items-center justify-center space-x-2 active:scale-95"
                >
                  <Calendar size={16} />
                  <span>Book Appointment Now</span>
                </Link>
                
                <Link
                  to="/services"
                  className="px-8 py-4 text-xs sm:text-sm font-bold text-[#0F172A] bg-white hover:bg-[#F8FAFC] rounded-full border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all duration-200 shadow-subtle text-center flex items-center justify-center space-x-2"
                >
                  <span>Explore Medical Services</span>
                  <ArrowRight size={16} className="text-[#2563EB]" />
                </Link>
              </div>

              {/* Statistic Metrics Grid */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-[#E2E8F0]">
                <div className="space-y-1">
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-display">15+</h4>
                  <p className="text-xs text-[#64748B] font-medium">Years Experience</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-display">10K+</h4>
                  <p className="text-xs text-[#64748B] font-medium">Healthy Patients</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-display">100%</h4>
                  <p className="text-xs text-[#64748B] font-medium">Dedicated Care</p>
                </div>
              </div>

            </motion.div>

            {/* Right Graphic Doctor White Floating Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-5 relative mt-6 lg:mt-0"
            >
              <div className="bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-soft space-y-6 text-left">
                
                {/* Status Badge */}
                <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4">
                  <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                      Accepting Patients
                    </span>
                  </div>
                  <span className="text-xs text-[#64748B] font-medium">Private Healthcare</span>
                </div>

                {/* Doctor Avatar Header */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center text-3xl font-bold font-display shadow-subtle shrink-0">
                    👨‍⚕️
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-bold text-[#0F172A] font-display">
                      {settings?.doctorName || 'Dr. Girija Prasad'}
                    </h3>
                    <p className="text-xs text-[#2563EB] font-bold uppercase tracking-wider">
                      Head Medical Officer
                    </p>
                    <p className="text-[11px] text-[#64748B] font-medium">
                      MBBS, MD • Internal Medicine
                    </p>
                  </div>
                </div>

                {/* Simulated Appointment Slot Tracker */}
                <div className="p-4 bg-[#F5F8FD] rounded-2xl border border-[#DBEAFE] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#64748B] uppercase tracking-wider text-[10px]">
                      NEXT AVAILABLE SLOTS
                    </span>
                    <span className="text-emerald-600 font-bold text-[11px] flex items-center gap-1">
                      <Clock size={12} /> Today
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl text-center shadow-subtle">
                      <p className="text-xs font-bold text-[#0F172A]">10:00 AM</p>
                      <p className="text-[10px] text-[#2563EB] font-medium">Open Slot</p>
                    </div>
                    <div className="px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl text-center shadow-subtle">
                      <p className="text-xs font-bold text-[#0F172A]">11:30 AM</p>
                      <p className="text-[10px] text-[#2563EB] font-medium">Open Slot</p>
                    </div>
                  </div>
                </div>

                {/* Information Highlight Card */}
                <div className="flex items-center justify-between p-4 bg-white border border-[#E2E8F0] rounded-2xl shadow-subtle">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[#DBEAFE] text-[#2563EB] rounded-xl">
                      <UserCheck size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0F172A]">Confidential Records</p>
                      <p className="text-[11px] text-[#64748B]">Digital Record Management</p>
                    </div>
                  </div>
                  <Link to="/book" className="px-3 py-1.5 bg-[#2563EB] text-white text-xs font-bold rounded-xl hover:bg-[#1D4ED8] transition">
                    Book
                  </Link>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section className="py-28 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
            <span className="px-4 py-1 rounded-full bg-[#F5F8FD] border border-[#DBEAFE] text-[#2563EB] text-xs font-bold uppercase tracking-wider">
              Our Disciplines
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-display tracking-tight">
              Our Medical Services
            </h2>
            <p className="text-[#64748B] text-sm sm:text-base font-normal leading-relaxed">
              We offer comprehensive diagnostics, treatments, and medical programs configured to fit your lifestyle needs comfortably.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((svc, index) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  className="bg-white border border-[#E2E8F0] p-8 rounded-3xl shadow-card hover:shadow-soft-hover transition-all duration-300 text-left flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 bg-[#DBEAFE] text-[#2563EB] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-200">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-[#0F172A] font-display mb-3 group-hover:text-[#2563EB] transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed font-normal">
                      {svc.desc}
                    </p>
                  </div>
                  
                  <Link 
                    to="/services" 
                    className="mt-8 flex items-center text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] space-x-1.5 pt-4 border-t border-[#F1F5F9]"
                  >
                    <span>Learn More</span>
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. DOCTOR INTRODUCTION */}
      <section className="py-28 bg-[#F5F8FD] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Doctor Illustration Card */}
            <div className="lg:col-span-5">
              <div className="aspect-[4/3] rounded-3xl bg-white border border-[#E2E8F0] flex flex-col items-center justify-center p-8 text-center shadow-soft">
                <div className="w-20 h-20 rounded-2xl bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center text-4xl mb-4 shadow-subtle">
                  🩺
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A] font-display">
                  {settings?.doctorName || 'Dr. Girija Prasad'}
                </h3>
                <p className="text-xs text-[#2563EB] font-bold uppercase tracking-wider mt-1">
                  Senior Consultant Physician
                </p>
                <div className="mt-6 flex items-center gap-2 bg-[#F8FAFC] px-4 py-2 rounded-full border border-[#E2E8F0] text-xs font-semibold text-[#0F172A]">
                  <Award size={14} className="text-[#2563EB]" />
                  <span>15+ Years Clinical Experience</span>
                </div>
              </div>
            </div>

            {/* Right Doctor Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="px-4 py-1.5 bg-white border border-[#DBEAFE] text-[#2563EB] text-xs font-bold rounded-full uppercase tracking-wider">
                Meet The Medical Director
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-display tracking-tight leading-snug">
                Trusted Medical Guidance From <span className="text-[#2563EB]">{settings?.doctorName || 'Dr. Girija Prasad'}</span>
              </h2>
              <p className="text-[#64748B] text-sm leading-relaxed font-normal">
                With a deep focus on personalized therapies and diagnostics, our team provides evidence-based treatments combined with modern clinical monitoring systems.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white border border-[#E2E8F0] rounded-2xl flex items-start space-x-3 shadow-subtle">
                  <div className="p-2 bg-[#DBEAFE] text-[#2563EB] rounded-xl shrink-0">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0F172A]">Board Certified</h4>
                    <p className="text-[11px] text-[#64748B] mt-0.5">Internal Medicine & Diagnostics</p>
                  </div>
                </div>

                <div className="p-4 bg-white border border-[#E2E8F0] rounded-2xl flex items-start space-x-3 shadow-subtle">
                  <div className="p-2 bg-[#DBEAFE] text-[#2563EB] rounded-xl shrink-0">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0F172A]">Holistic Care</h4>
                    <p className="text-[11px] text-[#64748B] mt-0.5">Preventive protocols & therapies</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/book"
                  className="inline-flex items-center space-x-2 px-7 py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-full transition-all shadow-sm active:scale-95"
                >
                  <span>Book Consultation with Dr. Girija</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. WHY PATIENTS CHOOSE US */}
      <section className="py-28 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
            <span className="px-4 py-1 rounded-full bg-[#F5F8FD] border border-[#DBEAFE] text-[#2563EB] text-xs font-bold uppercase tracking-wider">
              Clinical Advantage
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F172A] font-display tracking-tight">
              Why Patients Choose {settings?.clinicName || 'Girija Clinic'}
            </h2>
            <p className="text-[#64748B] text-sm font-normal">
              We configure diagnostic assessments, records management, and timings to fit your lifestyle needs comfortably.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, index) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  className="bg-white border border-[#E2E8F0] p-8 rounded-3xl shadow-card hover:shadow-soft-hover transition-all text-left space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center">
                    <Icon size={22} />
                  </div>
                  <h4 className="text-base font-bold text-[#0F172A] font-display">{b.title}</h4>
                  <p className="text-xs text-[#64748B] leading-relaxed font-normal">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="py-28 bg-[#F5F8FD] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
            <span className="px-4 py-1 rounded-full bg-white border border-[#DBEAFE] text-[#2563EB] text-xs font-bold uppercase tracking-wider">
              Patient Testimonials
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F172A] font-display tracking-tight">
              What Our Patients Say
            </h2>
            <p className="text-[#64748B] text-sm font-normal">
              Hear directly from patients who have completed treatment plans with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className="bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-card flex flex-col justify-between text-left"
              >
                <div className="space-y-4">
                  <div className="flex space-x-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#0F172A] leading-relaxed font-normal italic">
                    "{t.text}"
                  </p>
                </div>

                <div className="mt-8 flex items-center space-x-3.5 pt-4 border-t border-[#F1F5F9]">
                  <div className="w-10 h-10 rounded-2xl bg-[#DBEAFE] text-[#2563EB] font-bold text-xs flex items-center justify-center">
                    {t.initials}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#0F172A] font-display">{t.name}</h5>
                    <p className="text-[10px] text-[#2563EB] font-semibold">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. CLINIC GALLERY GLIMPSE */}
      <section className="py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <h2 className="text-2xl font-extrabold text-[#0F172A] font-display">
              Glimpse of our Clinic
            </h2>
            <p className="text-xs text-[#64748B] font-medium">
              A tour inside our modern diagnostic centers, testing environments, and reception areas.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: 'Consultation Suite', emoji: '🩺' },
              { label: 'Diagnostic Center', emoji: '🔬' },
              { label: 'Reception Area', emoji: '🏥' },
              { label: 'Testing Lab', emoji: '🩸' }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="aspect-square bg-[#F5F8FD] rounded-3xl border border-[#E2E8F0] shadow-subtle flex flex-col items-center justify-center p-4 cursor-pointer hover:border-[#CBD5E1] transition-colors"
              >
                <span className="text-5xl mb-2">{item.emoji}</span>
                <span className="text-xs font-bold text-[#0F172A]">{item.label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. BOOKING CTA BANNER */}
      <section className="py-24 bg-[#F5F8FD] text-[#0F172A] select-none">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <span className="px-4 py-1.5 bg-white border border-[#DBEAFE] rounded-full text-xs font-bold text-[#2563EB] uppercase tracking-wider inline-block">
            Priority Patient Care
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight tracking-tight">
            Ready to Prioritize your Health?
          </h2>
          <p className="text-[#64748B] text-sm sm:text-base max-w-xl mx-auto font-normal leading-relaxed">
            Book an appointment online, register your details, and gain instant access to your health documents.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/book"
              className="px-8 py-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-full transition-all shadow-sm hover:shadow-md text-sm flex items-center space-x-2"
            >
              <Calendar size={18} />
              <span>Book Doctor Visit</span>
            </Link>
            
            <Link
              to="/contact"
              className="px-8 py-4 bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] font-bold rounded-full transition-all text-sm"
            >
              Contact Support Desk
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
