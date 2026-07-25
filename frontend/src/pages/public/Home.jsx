import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Calendar, 
  ShieldCheck, 
  Award, 
  Users, 
  ChevronRight, 
  Star, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  UserCheck, 
  MapPin, 
  PhoneCall, 
  Activity, 
  HelpCircle, 
  Search, 
  Check, 
  Compass, 
  Feather, 
  Stethoscope 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUI } from '../../context/UIContext';
import { treatmentsData } from '../../data/treatmentsData';
import { doctorsData } from '../../data/doctorsData';
import SEOHead from '../../components/common/SEOHead';
import CTABanner from '../../components/common/CTABanner';
import BranchesSection from '../../components/common/BranchesSection';

export default function Home() {
  const { settings } = useUI();
  const [activeFaq, setActiveFaq] = useState(null);

  // Priority Treatments (Agnikarma, Viddhakarma, Panchakarma)
  const priorityTreatments = treatmentsData.filter(t => t.isPriority);
  const secondaryTreatments = treatmentsData.filter(t => !t.isPriority).slice(0, 8);

  const whyChooseUsList = [
    { title: 'Personalized Treatment', desc: 'Customized herbal and para-surgical care tailored to your unique Nadi Pariksha and Prakriti profile.', icon: Sparkles },
    { title: 'Root Cause Healing', desc: 'We target underlying Vata, Pitta, and Kapha imbalances rather than masking superficial symptoms.', icon: Compass },
    { title: 'Experienced Ayurvedic Doctors', desc: 'Led by Dr. Ombeer R. Pal (18+ Yrs) and Dr. Chandrakumar Deshmukh (25+ Yrs, PhD in Neurology).', icon: Award },
    { title: 'Natural Medicines', desc: '100% pure, unadulterated herbal formulations and classical Rasayana preparations.', icon: Feather },
    { title: 'Modern Diagnostics', desc: 'Integrating traditional pulse diagnosis with modern blood tests, MRI, and digital health records.', icon: Activity },
    { title: 'Traditional Ayurveda', desc: 'Authentic classical procedures faithfully preserved from Sushruta and Charaka Samhita.', icon: ShieldCheck },
    { title: 'Evidence-Based Practice', desc: 'Clinical therapies validated through documented patient outcomes and scientific research.', icon: CheckCircle2 },
    { title: 'Safe Therapies', desc: 'Non-surgical, drug-free, and minimally invasive treatments with zero synthetic side effects.', icon: Heart },
    { title: 'Patient-Centered Care', desc: 'Compassionate, one-on-one medical consultations and continuous post-treatment follow-up.', icon: UserCheck },
    { title: 'Long-Term Wellness', desc: 'Focusing on preventative health, dietary Pathya-Apathya, and long-term immunity boost.', icon: Calendar },
  ];

  const patientJourneySteps = [
    { step: '01', title: 'Nadi Pariksha & Diagnosis', desc: 'In-depth pulse analysis and metabolic assessment by Dr. Ombeer R. Pal to pinpoint disease root cause.' },
    { step: '02', title: 'Customized Treatment Blueprint', desc: 'Personalized selection of classical herbs, dietary guidance, and target para-surgical procedures.' },
    { step: '03', title: 'Agnikarma / Viddhakarma / Panchakarma', desc: 'Precision administration of thermal cautery, therapeutic needling, or 5-stage detoxification.' },
    { step: '04', title: 'Pathya & Lifestyle Guidance', desc: 'Tailored dietary charts and daily routines (Dinacharya) to prevent toxin re-accumulation.' },
    { step: '05', title: 'Rejuvenation & Long-Term Health', desc: 'Sustained vitality, restored joint mobility, and enhanced immunity through Rasayana herbs.' }
  ];

  const testimonials = [
    { 
      name: 'Ramesh Verma', 
      role: 'Severe Sciatica & Disc Bulge Patient', 
      text: 'I was unable to walk without severe leg pain. After just 2 sessions of Agnikarma & Viddhakarma with Dr. Ombeer R. Pal, my sciatic pain vanished completely without surgery!',
      initials: 'RV',
      rating: 5,
      condition: 'Sciatica Relief'
    },
    { 
      name: 'Sunita Sharma', 
      role: 'Chronic Knee Osteoarthritis Patient', 
      text: 'Doctors advised knee replacement. Dr. Ombeer R. Pal recommended Janu Basti and Agnikarma. Today I walk 4 kilometers daily pain-free!',
      initials: 'SS',
      rating: 5,
      condition: 'Knee Joint Healing'
    },
    { 
      name: 'Vikramaditya Rao', 
      role: 'Post-Stroke Paralysis Patient', 
      text: 'Under Dr. Chandrakumar Deshmukh’s neuro-Panchakarma protocol, my father regained speech and leg movement within 3 weeks. Truly miraculous!',
      initials: 'VR',
      rating: 5,
      condition: 'Paralysis Recovery'
    }
  ];

  const faqs = [
    { 
      q: 'What makes Agnikarma so effective for chronic joint pain?', 
      a: 'Agnikarma uses precise thermal micro-cautery to deliver controlled heat to affected Marma points. This instantly pacifies Vata-Kapha blockages, releases muscle spasms, and stimulates local tissue endorphins for immediate non-surgical pain relief.' 
    },
    { 
      q: 'How does Viddhakarma differ from acupuncture?', 
      a: 'Viddhakarma is an authentic Sushruta para-surgical therapy using sterile micro-needles to decompress trapped nerve pathways, release fluid pressure, and unblock biological channels (Srotas) for rapid neural recovery.' 
    },
    { 
      q: 'Who will lead my consultation?', 
      a: 'Your consultation will be conducted directly by Lead Senior Physician Dr. Ombeer R. Pal or Chief Medical Officer Dr. Chandrakumar Deshmukh (Specialist in Neurological Disorders).' 
    },
    { 
      q: 'Is Panchakarma suitable for everyone?', 
      a: 'Panchakarma is customized after Nadi Pariksha diagnostic evaluation. Dr. Ombeer R. Pal designs 7-day to 21-day programs specifically tailored to your body constitution (Prakriti).' 
    },
    { 
      q: 'Can I continue my current allopathic medicines?', 
      a: 'Yes, our doctors safely integrate Ayurvedic therapies alongside your current medications without interference.' 
    }
  ];

  return (
    <div className="font-sans antialiased text-[#14291D] bg-[#FDFBF7] transition-colors duration-300">
      <SEOHead 
        title="Dr. Ombeer R. Pal | Premium Ayurvedic Clinic, Agnikarma & Panchakarma Centre"
        description="Girija Clinic under Dr. Ombeer R. Pal & Dr. Chandrakumar Deshmukh offers authentic Agnikarma, Viddhakarma, and Panchakarma for chronic pain, sciatica, slip disc, and neurological disorders."
      />

      {/* 1. HERO SECTION */}
      <section className="relative bg-[#14291D] text-white pt-28 pb-20 lg:pt-36 lg:pb-32 overflow-hidden">
        {/* Subtle Ayurvedic Watermark Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C59B27]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column Text */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              {/* Badge Pill */}
              <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#1B3B2B] border border-[#C59B27]/40 text-[#C59B27] text-xs font-bold tracking-wider uppercase shadow-gold-glow">
                <Sparkles size={14} className="text-[#C59B27]" />
                <span>Authentic Ayurvedic Healing & Research</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] font-display">
                Root Cause Healing <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#C59B27] to-[#EAE4D9]">
                  Through Authentic Ayurveda
                </span>
              </h1>

              {/* Doctor Attribution */}
              <div className="flex items-center space-x-3 text-sm text-emerald-200 font-semibold pt-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C59B27] animate-pulse" />
                <span>Lead Physician: <strong>Dr. Ombeer R. Pal</strong> (BAMS, MD Ayurveda)</span>
              </div>

              {/* Body Text */}
              <p className="text-base sm:text-lg text-emerald-100/90 font-normal leading-relaxed max-w-xl">
                Experience non-surgical pain relief and deep cellular rejuvenation through specialized <strong className="text-white">Agnikarma</strong>, <strong className="text-white">Viddhakarma</strong>, and <strong className="text-white">Panchakarma</strong> therapies guided by veteran doctors.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                <Link
                  to="/book"
                  className="px-8 py-4 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#D4AF37] to-[#C59B27] hover:from-[#C59B27] hover:to-[#B2881E] rounded-full transition-all duration-200 shadow-gold-glow text-center flex items-center justify-center space-x-2 active:scale-95"
                >
                  <Calendar size={16} />
                  <span>Book Doctor Consultation</span>
                </Link>
                
                <Link
                  to="/services"
                  className="px-8 py-4 text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 rounded-full border border-white/20 backdrop-blur-md transition-all duration-200 text-center flex items-center justify-center space-x-2"
                >
                  <span>Explore All Treatments</span>
                  <ArrowRight size={16} className="text-[#C59B27]" />
                </Link>
              </div>

              {/* Statistic Metrics Grid */}
              <div className="grid grid-cols-4 gap-2 sm:gap-6 pt-8 border-t border-emerald-900/80">
                <div className="space-y-1 text-left">
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-[#C59B27] font-display">25+</h4>
                  <p className="text-[11px] text-emerald-200/80 font-medium">Years Excellence</p>
                </div>
                <div className="space-y-1 text-left">
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-white font-display">15K+</h4>
                  <p className="text-[11px] text-emerald-200/80 font-medium">Happy Patients</p>
                </div>
                <div className="space-y-1 text-left">
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-[#C59B27] font-display">99%</h4>
                  <p className="text-[11px] text-emerald-200/80 font-medium">Satisfaction</p>
                </div>
                <div className="space-y-1 text-left">
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-white font-display">100%</h4>
                  <p className="text-[11px] text-emerald-200/80 font-medium">Safe & Natural</p>
                </div>
              </div>

            </motion.div>

            {/* Right Card: Doctor Spotlight & Signature Tags */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5 relative mt-6 lg:mt-0"
            >
              <div className="bg-gradient-to-b from-[#1B3B2B] to-[#14291D] p-8 rounded-3xl border border-[#C59B27]/40 shadow-2xl space-y-6 text-left relative overflow-hidden">
                
                <div className="flex items-center justify-between border-b border-emerald-900 pb-4">
                  <div className="flex items-center space-x-2 bg-[#C59B27]/20 border border-[#C59B27]/40 px-3.5 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-[#C59B27] animate-ping" />
                    <span className="text-[11px] font-bold text-[#C59B27] uppercase tracking-wider">
                      OPD Available Today
                    </span>
                  </div>
                  <span className="text-xs text-emerald-200 font-medium">Nadi Pariksha Consultation</span>
                </div>

                {/* Lead Doctor Showcase */}
                <div className="p-4 rounded-2xl bg-black/20 border border-emerald-800 flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#C59B27]/20 border border-[#C59B27]/40 flex items-center justify-center text-3xl shrink-0 shadow-md">
                    🌿
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-display">Dr. Ombeer R. Pal</h3>
                    <p className="text-xs text-[#C59B27] font-bold uppercase tracking-wider">Lead Senior Physician</p>
                    <p className="text-[11px] text-emerald-200/80 mt-0.5">BAMS, MD (Ayurveda) • 18+ Yrs Experience</p>
                  </div>
                </div>

                {/* Founder Doctor Showcase */}
                <div className="p-4 rounded-2xl bg-black/20 border border-emerald-800 flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#C59B27]/20 border border-[#C59B27]/40 flex items-center justify-center text-3xl shrink-0 shadow-md">
                    🧠
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-display">Dr. Chandrakumar Deshmukh</h3>
                    <p className="text-xs text-[#C59B27] font-bold uppercase tracking-wider">Chief Medical Officer & Founder</p>
                    <p className="text-[11px] text-emerald-200/80 mt-0.5">BAMS, MD, PhD in Neurology • 25+ Yrs</p>
                  </div>
                </div>

                {/* Priority Signature Badges */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-bold text-[#C59B27] uppercase tracking-widest">Signature Specialties</span>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2.5 bg-emerald-950/80 rounded-xl border border-emerald-800 text-center">
                      <p className="text-base">🔥</p>
                      <p className="text-[10px] font-bold text-white mt-1">Agnikarma</p>
                    </div>
                    <div className="p-2.5 bg-emerald-950/80 rounded-xl border border-emerald-800 text-center">
                      <p className="text-base">🪡</p>
                      <p className="text-[10px] font-bold text-white mt-1">Viddhakarma</p>
                    </div>
                    <div className="p-2.5 bg-emerald-950/80 rounded-xl border border-emerald-800 text-center">
                      <p className="text-base">🌿</p>
                      <p className="text-[10px] font-bold text-white mt-1">Panchakarma</p>
                    </div>
                  </div>
                </div>

                <Link
                  to="/book"
                  className="w-full py-3.5 bg-[#C59B27] hover:bg-[#B2881E] text-white text-xs font-bold rounded-2xl transition shadow-lg text-center flex items-center justify-center space-x-2"
                >
                  <Calendar size={15} />
                  <span>Reserve Appointment Slot</span>
                </Link>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. PRIORITY SIGNATURE TREATMENTS SECTION (AGNIKARMA, VIDDHAKARMA, PANCHAKARMA) */}
      <section className="py-24 bg-[#FDFBF7] border-b border-[#EAE4D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-[#FDF7E7] border border-[#C59B27]/40 text-[#C59B27] text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5">
              <Sparkles size={14} />
              <span>Signature Clinical Specialties</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#14291D] font-display tracking-tight">
              Our Signature Ayurvedic Treatments
            </h2>
            <p className="text-[#5C6B61] text-base leading-relaxed font-normal">
              Specialized non-surgical Para-surgical therapies and cellular detoxification regimens administered under the direct expertise of <strong className="text-[#14291D]">Dr. Ombeer R. Pal</strong>.
            </p>
          </div>

          {/* TOP 3 HIGHLIGHTED PRIORITY TREATMENT CARDS (VISUALLY LARGER) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {priorityTreatments.map((treatment, idx) => (
              <motion.div
                key={treatment.slug}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl border-2 border-[#C59B27] p-8 shadow-gold-glow relative overflow-hidden flex flex-col justify-between group transition-all"
              >
                {/* Gold Highlight Badge */}
                <div className="absolute top-0 right-0 bg-gradient-to-l from-[#D4AF37] to-[#C59B27] text-white text-[10px] font-extrabold px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider shadow-sm">
                  {treatment.badgeText || 'Signature Therapy'}
                </div>

                <div className="space-y-6 text-left pt-2">
                  {/* Icon & Title */}
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#FDF7E7] border border-[#C59B27]/40 flex items-center justify-center text-4xl shadow-md group-hover:scale-110 transition-transform">
                      {treatment.iconEmoji}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#C59B27] uppercase tracking-widest">
                        {treatment.category}
                      </span>
                      <h3 className="text-2xl font-extrabold text-[#14291D] font-display">
                        {treatment.name}
                      </h3>
                    </div>
                  </div>

                  {/* Explanation */}
                  <p className="text-xs sm:text-sm text-[#5C6B61] leading-relaxed font-normal">
                    {treatment.shortDesc}
                  </p>

                  {/* Benefits List */}
                  <div className="space-y-2 pt-2 border-t border-[#EAE4D9]">
                    <h4 className="text-xs font-bold text-[#14291D] uppercase tracking-wider">
                      Key Clinical Benefits:
                    </h4>
                    <ul className="space-y-2">
                      {treatment.benefits.slice(0, 4).map((b, i) => (
                        <li key={i} className="flex items-start space-x-2 text-xs text-[#14291D] font-medium">
                          <CheckCircle2 size={15} className="text-[#C59B27] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Learn More Button */}
                <div className="pt-8 text-left">
                  <Link
                    to={`/treatments/${treatment.slug}`}
                    className="w-full py-3.5 px-6 bg-[#1B3B2B] hover:bg-[#14291D] text-white font-bold rounded-2xl text-xs transition-all shadow-md flex items-center justify-center space-x-2 group-hover:bg-[#C59B27]"
                  >
                    <span>Learn More About {treatment.name}</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>

              </motion.div>
            ))}
          </div>

          {/* SECONDARY TREATMENTS GRID */}
          <div className="text-left space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#EAE4D9] pb-4">
              <div>
                <h3 className="text-2xl font-bold text-[#14291D] font-display">Comprehensive Condition Directory</h3>
                <p className="text-xs text-[#5C6B61]">Targeted Ayurvedic therapies for musculoskeletal, neurological, and metabolic health.</p>
              </div>
              <Link to="/services" className="mt-2 sm:mt-0 text-xs font-bold text-[#C59B27] hover:underline flex items-center gap-1">
                <span>View All 17+ Treatments</span>
                <ChevronRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {secondaryTreatments.map((item) => (
                <Link
                  key={item.slug}
                  to={`/treatments/${item.slug}`}
                  className="bg-white p-6 rounded-2xl border border-[#EAE4D9] hover:border-[#C59B27] hover:shadow-soft transition-all text-left flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F6F2EA] flex items-center justify-center text-2xl group-hover:bg-[#FDF7E7]">
                      {item.iconEmoji}
                    </div>
                    <h4 className="text-base font-bold text-[#14291D] font-display group-hover:text-[#C59B27] transition">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#5C6B61] line-clamp-2 leading-relaxed font-normal">
                      {item.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center text-xs font-bold text-[#1B3B2B] space-x-1 group-hover:text-[#C59B27]">
                    <span>View Protocol</span>
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3. WHY CHOOSE AYURVEDA / WHY CHOOSE US (10 ELEGANT PILLARS) */}
      <section className="py-24 bg-white border-b border-[#EAE4D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-[#F6F2EA] border border-[#EAE4D9] text-[#1B3B2B] text-xs font-bold uppercase tracking-wider">
              Pillars of Clinical Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14291D] font-display tracking-tight">
              Why Choose Girija Ayurvedic Clinic?
            </h2>
            <p className="text-[#5C6B61] text-base leading-relaxed font-normal">
              Combining 5,000-year-old Vedic medical wisdom with evidence-based diagnostics under veteran Ayurvedic specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {whyChooseUsList.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#EAE4D9] hover:border-[#C59B27] shadow-card transition-all text-left space-y-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#1B3B2B] text-[#C59B27] flex items-center justify-center shadow-md">
                    <IconComponent size={22} />
                  </div>
                  <h4 className="text-base font-bold text-[#14291D] font-display">{item.title}</h4>
                  <p className="text-xs text-[#5C6B61] leading-relaxed font-normal">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. MEET OUR DOCTORS SECTION */}
      <section className="py-24 bg-[#FDFBF7] border-b border-[#EAE4D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-[#FDF7E7] border border-[#C59B27]/40 text-[#C59B27] text-xs font-bold uppercase tracking-widest">
              Medical Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14291D] font-display tracking-tight">
              Meet Our Senior Ayurvedic Doctors
            </h2>
            <p className="text-[#5C6B61] text-base font-normal">
              Dedicated practitioners providing specialized diagnostics, Agnikarma, Viddhakarma, and neurological rehabilitation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {doctorsData.map((doc) => (
              <motion.div
                key={doc.id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl border border-[#EAE4D9] p-8 shadow-card hover:shadow-soft-hover transition-all text-left flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Doctor Header */}
                  <div className="flex items-start space-x-5">
                    <div className="w-20 h-20 rounded-2xl bg-[#1B3B2B] text-[#C59B27] border border-[#C59B27]/40 flex items-center justify-center text-4xl shrink-0 shadow-md">
                      {doc.avatarIcon}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-[#C59B27] uppercase tracking-wider">
                        {doc.title}
                      </span>
                      <h3 className="text-2xl font-extrabold text-[#14291D] font-display mt-0.5">
                        {doc.name}
                      </h3>
                      <p className="text-xs text-[#5C6B61] font-semibold mt-1">
                        {doc.degrees}
                      </p>
                      <p className="text-xs font-bold text-[#1B3B2B] mt-0.5">
                        {doc.experience}
                      </p>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-[#5C6B61] leading-relaxed font-normal">
                    {doc.summary}
                  </p>

                  {/* Specializations List */}
                  <div className="space-y-2 pt-2 border-t border-[#EAE4D9]">
                    <h4 className="text-xs font-bold text-[#14291D] uppercase tracking-wider">
                      Clinical Focus & Specialties:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {doc.specializations.slice(0, 4).map((spec, i) => (
                        <div key={i} className="flex items-center space-x-2 text-xs text-[#14291D] font-medium p-2 bg-[#F6F2EA] rounded-xl">
                          <CheckCircle2 size={14} className="text-[#C59B27] shrink-0" />
                          <span className="truncate">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Consultation Booking Button */}
                <div className="pt-8 flex flex-col sm:flex-row gap-3 items-center">
                  <Link
                    to={`/doctors`}
                    className="w-full sm:w-auto flex-1 py-3 bg-[#1B3B2B] hover:bg-[#14291D] text-white text-xs font-bold rounded-xl transition text-center"
                  >
                    View Doctor Biography
                  </Link>
                  <Link
                    to="/book"
                    className="w-full sm:w-auto flex-1 py-3 bg-gradient-to-r from-[#D4AF37] to-[#C59B27] hover:from-[#C59B27] text-white text-xs font-bold rounded-xl transition text-center shadow-sm"
                  >
                    Book Appointment
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 4.5. OUR BRANCHES SECTION (OM AYURVEDA MAIN BRANCH & GIRIJA CLINIC BRANCH 2) */}
      <BranchesSection />

      {/* 5. PATIENT JOURNEY SECTION */}
      <section className="py-24 bg-white border-b border-[#EAE4D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-[#F6F2EA] border border-[#EAE4D9] text-[#1B3B2B] text-xs font-bold uppercase tracking-wider">
              Step-By-Step Healing Flow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14291D] font-display tracking-tight">
              Your Healing Journey at Girija Clinic
            </h2>
            <p className="text-[#5C6B61] text-base font-normal">
              A structured 5-stage pathway from initial pulse diagnosis to long-term pain relief and cellular rejuvenation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {patientJourneySteps.map((step, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="bg-[#FDFBF7] p-6 rounded-3xl border border-[#EAE4D9] hover:border-[#C59B27] shadow-card text-left flex flex-col justify-between relative group"
              >
                <div className="space-y-4">
                  <span className="text-3xl font-extrabold font-display text-[#C59B27]">
                    {step.step}
                  </span>
                  <h4 className="text-base font-bold text-[#14291D] font-display">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#5C6B61] leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. TESTIMONIALS & SUCCESS STORIES */}
      <section className="py-24 bg-[#FDFBF7] border-b border-[#EAE4D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-white border border-[#EAE4D9] text-[#C59B27] text-xs font-bold uppercase tracking-wider">
              Verified Patient Recovery Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14291D] font-display tracking-tight">
              Real Patients, Real Healing
            </h2>
            <p className="text-[#5C6B61] text-base font-normal">
              Discover how Agnikarma, Viddhakarma, and Panchakarma transformed lives at Girija Clinic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className="bg-white p-8 rounded-3xl border border-[#EAE4D9] shadow-card flex flex-col justify-between text-left"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1 text-[#C59B27]">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={15} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-[#1B3B2B] bg-[#F6F2EA] px-3 py-1 rounded-full">
                      {t.condition}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#14291D] leading-relaxed font-normal italic">
                    "{t.text}"
                  </p>
                </div>

                <div className="mt-8 flex items-center space-x-3.5 pt-4 border-t border-[#EAE4D9]">
                  <div className="w-10 h-10 rounded-2xl bg-[#1B3B2B] text-[#C59B27] font-bold text-xs flex items-center justify-center">
                    {t.initials}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#14291D] font-display">{t.name}</h5>
                    <p className="text-[11px] text-[#5C6B61] font-medium">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-24 bg-white border-b border-[#EAE4D9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-[#F6F2EA] text-[#1B3B2B] text-xs font-bold uppercase tracking-wider">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14291D] font-display tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-[#5C6B61] text-sm font-normal">
              Clear answers about Agnikarma, Viddhakarma, Panchakarma, and consultation procedures.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#FDFBF7] rounded-2xl border border-[#EAE4D9] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex justify-between items-center space-x-4 font-bold text-[#14291D] text-base hover:text-[#C59B27] transition"
                  >
                    <span>{faq.q}</span>
                    <span className={`text-xl transition-transform ${isOpen ? 'rotate-45 text-[#C59B27]' : 'text-[#5C6B61]'}`}>
                      +
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-6 text-xs sm:text-sm text-[#5C6B61] leading-relaxed border-t border-[#EAE4D9] pt-4"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 8. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CTABanner
          title="Ready to live pain-free with authentic Ayurveda?"
          subtitle="Book a consultation with Dr. Ombeer R. Pal & Dr. Chandrakumar Deshmukh at Girija Clinic today."
          variant="gold"
        />
      </section>

      {/* 9. LOCATION & CONTACT STRIP */}
      <section className="py-20 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#EAE4D9] shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold text-[#C59B27] uppercase tracking-widest">
                Visit Our Clinic
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14291D] font-display">
                Girija Ayurvedic Healthcare & Panchakarma Centre
              </h3>
              <p className="text-xs sm:text-sm text-[#5C6B61] leading-relaxed">
                123 Healthcare Ave, Medical District, Suite 100 • Consultation by Prior Appointment
              </p>
              <div className="flex flex-wrap gap-6 pt-2 text-xs font-semibold text-[#14291D]">
                <div className="flex items-center space-x-2">
                  <PhoneCall size={16} className="text-[#C59B27]" />
                  <span>+1 (555) 019-2834</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} className="text-[#C59B27]" />
                  <span>Mon - Sat: 09:00 AM - 08:00 PM</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-end">
              <Link
                to="/contact"
                className="px-8 py-4 bg-[#1B3B2B] hover:bg-[#14291D] text-white font-bold rounded-2xl text-xs transition shadow-md w-full text-center"
              >
                Get Clinic Directions & Contact Info
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

