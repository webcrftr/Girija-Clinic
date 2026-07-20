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
  FileSpreadsheet
} from 'lucide-react';
import { useUI } from '../../context/UIContext';

export default function Home() {
  const { settings } = useUI();

  const services = [
    { title: 'General Medicine', desc: 'Holistic assessment, diagnostics and treatments for common illnesses.', icon: Stethoscope },
    { title: 'Cardiology Services', desc: 'Heart checks, ECGs, blood pressure diagnostics, and specialized therapies.', icon: Activity },
    { title: 'Chronic Care', desc: 'Continuing diagnostic regimens for Diabetes, Hypertension and Thyroid care.', icon: ShieldCheck },
    { title: 'Lab Reports', desc: 'Pathology, blood indices, chemistry profiles, and molecular panels.', icon: FileSpreadsheet },
  ];

  const benefits = [
    { title: 'Experienced Care', desc: 'Led by licensed practitioners with over 15 years in medical sciences.', icon: Award },
    { title: 'Patient-First Policy', desc: 'Individualized treatment charts mapped out for long-term health.', icon: Heart },
    { title: 'Prompt Scheduling', desc: 'Zero queue waits. Easily pick calendar slots and reserve visits online.', icon: Calendar },
    { title: 'Advanced Facilities', desc: 'Modern lab setups and state of the art diagnostic tools.', icon: Users },
  ];

  const testimonials = [
    { name: 'Aarav Sharma', role: 'Diabetes Patient', text: 'Dr. Girija is extremely patient. The new portal lets me book easily, and my prescription logs are always available online.' },
    { name: 'Priya Patel', role: 'Regular Checkups', text: 'Clean clinic, super supportive staff. The WhatsApp integration is amazing for quick inquiries and follow ups!' },
    { name: 'Karan Malhotra', role: 'Hypertension Patient', text: 'Professional, state-of-the-art diagnostics environment. Under Dr. Girijas advice I have managed to reverse my vital values.' }
  ];

  return (
    <div className="font-sans antialiased text-slate-800 bg-white dark:bg-slate-900 transition-colors duration-200">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center bg-gradient-to-br from-blue-50/50 via-white to-blue-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary-50 text-primary-600 dark:bg-primary-950/40 dark:text-primary-300">
                ✨ Health and Welness Sanctuary
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight font-display">
                Modern Healthcare, <br />
                <span className="text-gradient">Personalized for You</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl">
                Welcome to {settings?.clinicName}. We provide state of the art care records, diagnostic scheduling, and direct medical follow-ups powered by professional practitioners.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                <Link
                  to="/book"
                  className="px-8 py-4 text-base font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-xl transition shadow-lg shadow-primary-500/20 hover:shadow-primary-500/35 text-center active:scale-[0.98]"
                >
                  Book Appointment Now
                </Link>
                <Link
                  to="/services"
                  className="px-8 py-4 text-base font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 text-center active:scale-[0.98]"
                >
                  Explore Services
                </Link>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-150 dark:border-slate-800">
                <div>
                  <h4 className="text-2xl font-bold text-slate-800 dark:text-white">15+</h4>
                  <p className="text-xs text-slate-400 font-semibold">Years Experience</p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-800 dark:text-white">10K+</h4>
                  <p className="text-xs text-slate-400 font-semibold">Healthy Patients</p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-800 dark:text-white">100%</h4>
                  <p className="text-xs text-slate-400 font-semibold">Dedicated Service</p>
                </div>
              </div>

            </div>

            {/* Right Graphic Mockup */}
            <div className="lg:col-span-5 hidden lg:block relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-500 to-sky-400 rounded-full blur-[100px] opacity-10 dark:opacity-20 animate-pulse"></div>
              <div className="relative bg-white dark:bg-slate-850 p-8 rounded-[32px] shadow-2xl border border-slate-100 dark:border-slate-800 space-y-6">
                
                {/* Doctor profile card */}
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 bg-gradient-to-tr from-primary-500 to-sky-400 rounded-2xl flex items-center justify-center text-white text-2xl font-bold font-display shadow-lg shadow-primary-500/20">
                    👨‍⚕️
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white">{settings?.doctorName}</h3>
                    <p className="text-xs text-primary-500 font-semibold">Head Medical Officer</p>
                  </div>
                </div>

                {/* Simulated appointment details */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-750 space-y-3">
                  <h4 className="text-xs font-bold text-slate-400">NEXT AVAILABLE SLOTS</h4>
                  <div className="flex space-x-2">
                    <span className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-105 dark:border-slate-700 text-xs font-semibold rounded-lg text-slate-700 dark:text-slate-300">
                      10:00 AM - Today
                    </span>
                    <span className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-105 dark:border-slate-700 text-xs font-semibold rounded-lg text-slate-700 dark:text-slate-300">
                      11:30 AM - Today
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 rounded-2xl">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">🏥 Welcoming New Registrations</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
              Our Medical Services
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm font-medium">
              We offer comprehensive diagnostics, treatments and medical programs configured to fit your lifestyle needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((svc, index) => {
              const Icon = svc.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl hover-card text-left flex flex-col justify-between"
                >
                  <div>
                    <div className="p-3.5 bg-primary-50 text-primary-500 dark:bg-primary-950/50 dark:text-primary-400 rounded-2xl w-fit mb-6">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white font-display mb-2">{svc.title}</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed font-medium">{svc.desc}</p>
                  </div>
                  <Link to="/services" className="mt-6 flex items-center text-xs font-bold text-primary-500 hover:text-primary-600 space-x-1">
                    <span>Learn More</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Doctor Introduction */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
            <div>
              <div className="aspect-[4/3] rounded-[32px] bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-8xl shadow-lg shadow-slate-100/10">
                🩺👨‍⚕️
              </div>
            </div>
            <div className="space-y-6">
              <span className="px-3.5 py-1.5 bg-accent-50 text-accent-600 dark:bg-accent-950/40 dark:text-accent-400 text-xs font-semibold rounded-full">
                Meet The Medical Director
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-snug">
                Trusted Medical Guidance From <span className="text-gradient font-black">{settings?.doctorName}</span>
              </h2>
              <p className="text-slate-550 dark:text-slate-450 text-sm leading-relaxed font-medium">
                With a deep focus on personalized therapies and diagnostics, our team provides evidence-based treatments combined with advanced clinical monitoring systems.
              </p>
              <ul className="space-y-3 font-semibold text-xs text-slate-700 dark:text-slate-350">
                <li className="flex items-center space-x-2.5">
                  <span className="h-5 w-5 bg-emerald-50 text-emerald-500 dark:bg-emerald-950/30 flex items-center justify-center rounded-full text-xs font-bold">✓</span>
                  <span>Board Certified in Internal Medicine</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <span className="h-5 w-5 bg-emerald-50 text-emerald-500 dark:bg-emerald-950/30 flex items-center justify-center rounded-full text-xs font-bold">✓</span>
                  <span>15+ Years Clinical Experience</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <span className="h-5 w-5 bg-emerald-50 text-emerald-500 dark:bg-emerald-950/30 flex items-center justify-center rounded-full text-xs font-bold">✓</span>
                  <span>Pioneering Healthcare Record Management Systems</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight animate-fade-in">
              Why Patients Choose {settings?.clinicName}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm font-medium">
              We configure diagnostic assessments, records management, and timings to fit your lifestyle needs comfortably.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, index) => {
              const Icon = b.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl hover-card text-left"
                >
                  <div className="p-3 BG-LIGHT text-primary-500 dark:text-primary-400 rounded-xl w-fit mb-5">
                    <Icon size={20} />
                  </div>
                  <h4 className="text-base font-bold text-slate-800 dark:text-white font-display mb-1">{b.title}</h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
              Patient Testimonials
            </h2>
            <p className="text-slate-550 dark:text-slate-450 mt-3 text-sm">
              Hear directly from patients who have completed treatment plans with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="bg-slate-50 dark:bg-slate-850 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 text-left flex flex-col justify-between"
              >
                <p className="text-slate-600 dark:text-slate-300 italic text-xs leading-relaxed font-medium">"{t.text}"</p>
                <div className="mt-6 flex items-center space-x-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex space-x-0.5 text-xs text-yellow-400">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                  <div className="text-left font-sans">
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">{t.name}</h5>
                    <p className="text-[10px] text-slate-400 font-semibold">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic Gallery */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
              Glimpse of our Clinic
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm">
              A tour inside our modern diagnostic centers, testing environments, and waiting areas.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden hover:opacity-90 transition cursor-zoom-in relative group flex items-center justify-center text-4xl shadow-md">
                🏥
                <div className="absolute inset-0 bg-primary-600/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                  <span className="text-white text-xs font-bold font-sans uppercase tracking-wider">Girija Clinic</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA banner */}
      <section className="py-16 bg-primary-600 text-white select-none">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display">Ready to Prioritize your Health?</h2>
          <p className="text-primary-100 text-sm max-w-xl mx-auto font-medium">
            Book an appointment online, register your details, and gain instant log access to your health documents.
          </p>
          <div className="pt-2">
            <Link
              to="/book"
              className="inline-block px-8 py-3.5 bg-white text-primary-600 font-bold rounded-xl hover:bg-primary-50 transition shadow-xl"
            >
              Book Doctor Visit
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
