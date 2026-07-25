import React, { useState } from 'react';
import { useUI } from '../../context/UIContext';
import { Phone, Mail, MapPin, Clock, Send, Sparkles, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import SEOHead from '../../components/common/SEOHead';
import CTABanner from '../../components/common/CTABanner';
import BranchesSection from '../../components/common/BranchesSection';
import { branchesData } from '../../data/branchesData';

export default function Contact() {
  const { settings, showToast } = useUI();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    branch: 'main-branch',
    doctor: 'Dr. Ombeer R. Pal',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Your message has been sent successfully! Our clinical desk will contact you shortly.', 'success');
    setFormData({ name: '', email: '', phone: '', branch: 'main-branch', doctor: 'Dr. Ombeer R. Pal', message: '' });
  };

  return (
    <div className="font-sans antialiased text-[#14291D] bg-[#FDFBF7] transition-colors duration-300 py-28 text-left">
      <SEOHead 
        title="Contact Om Ayurveda & Girija Clinic | Two Locations in Mira Road (East)"
        description="Visit Om Ayurveda (Main Branch at Shanti Garden) or Girija Clinic (Branch 2 at Datta Mandir Road, Penkarpada), Mira Road (East), Thane."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16 space-y-4"
        >
          <span className="inline-flex items-center space-x-2 text-xs font-bold text-[#C59B27] bg-[#FDF7E7] px-4 py-1.5 rounded-full uppercase tracking-wider border border-[#C59B27]/40">
            <Sparkles size={14} />
            <span>Connect With Our Practice</span>
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#14291D] font-display tracking-tight leading-tight">
            Contact <span className="text-gradient-gold">Om Ayurveda</span>
          </h1>
          <p className="text-base sm:text-lg text-[#5C6B61] leading-relaxed font-normal">
            Visit our <strong className="text-[#14291D]">Main Branch (Om Ayurveda)</strong> or <strong className="text-[#14291D]">Branch 2 (Girija Clinic)</strong> in Mira Road (East) to consult with Senior Physician Dr. Ombeer R. Pal.
          </p>
        </motion.div>

        {/* Both Branches Display Section */}
        <BranchesSection showTitle={false} className="py-0 mb-16" />

        {/* Direct Online Inquiry Form Section */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#EAE4D9] shadow-soft mb-24">
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-[#14291D] font-display">Send Online Inquiry to Care Desk</h3>
              <p className="text-xs text-[#5C6B61] mt-1 font-medium">Select your preferred branch location and doctor for consultation.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#5C6B61] block uppercase tracking-wider">YOUR FULL NAME *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#FDFBF7] border border-[#EAE4D9] rounded-xl text-xs text-[#14291D] focus:outline-none focus:border-[#C59B27] focus:bg-white transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#5C6B61] block uppercase tracking-wider">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#FDFBF7] border border-[#EAE4D9] rounded-xl text-xs text-[#14291D] focus:outline-none focus:border-[#C59B27] focus:bg-white transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#5C6B61] block uppercase tracking-wider">PHONE NUMBER *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#FDFBF7] border border-[#EAE4D9] rounded-xl text-xs text-[#14291D] focus:outline-none focus:border-[#C59B27] focus:bg-white transition-colors"
                    placeholder="+91 99695 05111"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#5C6B61] block uppercase tracking-wider">PREFERRED BRANCH *</label>
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#FDFBF7] border border-[#EAE4D9] rounded-xl text-xs text-[#14291D] focus:outline-none focus:border-[#C59B27] focus:bg-white transition-colors cursor-pointer"
                  >
                    <option value="main-branch">🌿 Om Ayurveda (Main Branch - Shanti Garden)</option>
                    <option value="branch-2">🌿 Girija Clinic (Branch 2 - Penkarpada)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#5C6B61] block uppercase tracking-wider">PREFERRED DOCTOR</label>
                  <select
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#FDFBF7] border border-[#EAE4D9] rounded-xl text-xs text-[#14291D] focus:outline-none focus:border-[#C59B27] focus:bg-white transition-colors cursor-pointer"
                  >
                    <option value="Dr. Ombeer R. Pal">Dr. Ombeer R. Pal (Senior Panchakarma Specialist)</option>
                    <option value="Dr. Jyoti O. Pal">Dr. Jyoti O. Pal (Senior Homeopathic Physician)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#5C6B61] block uppercase tracking-wider">HEALTH INQUIRY OR SYMPTOMS *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#FDFBF7] border border-[#EAE4D9] rounded-xl text-xs text-[#14291D] focus:outline-none focus:border-[#C59B27] focus:bg-white transition-colors"
                  placeholder="Describe your health condition or preferred treatment (Agnikarma, Viddhakarma, Panchakarma)..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#C59B27] hover:from-[#C59B27] hover:to-[#B2881E] text-white font-bold rounded-2xl text-xs sm:text-sm transition shadow-md active:scale-95 flex items-center justify-center space-x-2"
              >
                <Send size={16} />
                <span>Submit Inquiry to Care Desk</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

