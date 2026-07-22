import React, { useState } from 'react';
import { useUI } from '../../context/UIContext';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const { settings, showToast } = useUI();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Your message has been received! Our support desk will contact you shortly.', 'success');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="font-sans antialiased text-[#0F172A] bg-white transition-colors duration-200 py-28 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Banner */}
        <div className="max-w-3xl mb-20 space-y-4">
          <span className="text-xs font-bold text-[#2563EB] bg-[#F5F8FD] border border-[#DBEAFE] px-4 py-1.5 rounded-full uppercase tracking-wider">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] font-display tracking-tight leading-tight">
            Contact <span className="text-[#2563EB]">{settings?.clinicName || 'Girija Clinic'}</span>
          </h1>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed font-normal">
            Contact us for scheduling parameters, records retrievals, and support queries.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* Info Cards Column */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div 
              whileHover={{ y: -3 }}
              className="bg-white p-7 rounded-3xl border border-[#E2E8F0] shadow-card flex items-start space-x-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center shrink-0">
                <MapPin size={22} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#0F172A] font-display">Clinic Address</h4>
                <p className="text-xs text-[#64748B] leading-relaxed font-normal">{settings?.address || 'Girija Clinic, Main Road, India'}</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -3 }}
              className="bg-white p-7 rounded-3xl border border-[#E2E8F0] shadow-card flex items-start space-x-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center shrink-0">
                <Phone size={22} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#0F172A] font-display">Tel Contacts</h4>
                <p className="text-xs text-[#64748B] leading-relaxed font-normal">{settings?.phone || '+91 98765 43210'}</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -3 }}
              className="bg-white p-7 rounded-3xl border border-[#E2E8F0] shadow-card flex items-start space-x-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center shrink-0">
                <Mail size={22} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#0F172A] font-display">Email Inbox</h4>
                <p className="text-xs text-[#64748B] leading-relaxed font-normal">{settings?.email || 'care@girijaclinic.com'}</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -3 }}
              className="bg-white p-7 rounded-3xl border border-[#E2E8F0] shadow-card flex items-start space-x-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center shrink-0">
                <Clock size={22} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#0F172A] font-display">Hours of Operation</h4>
                <p className="text-xs text-[#64748B] leading-relaxed font-normal">{settings?.openingHours || 'Mon - Sat: 09:00 AM - 08:00 PM'}</p>
              </div>
            </motion.div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E2E8F0] shadow-soft">
              <h3 className="text-xl font-bold text-[#0F172A] font-display mb-6">Send an Online Inquiry</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#64748B] block uppercase tracking-wider">YOUR NAME *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#64748B] block uppercase tracking-wider">EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#64748B] block uppercase tracking-wider">TELEPHONE NUMBER *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#64748B] block uppercase tracking-wider">YOUR MESSAGE *</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                    placeholder="How can our clinical team support you?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-full text-xs sm:text-sm transition shadow-sm active:scale-95 flex items-center justify-center space-x-2"
                >
                  <Send size={16} />
                  <span>Send Inquiry Message</span>
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Embedded Map Section */}
        <div className="border-t border-[#E2E8F0] pt-20">
          <h2 className="text-2xl font-bold font-display text-[#0F172A] mb-6">Our Location Map</h2>
          <div className="aspect-[21/9] w-full bg-[#F5F8FD] rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-subtle">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.8783424169724!2d88.35122!3d22.57264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM0JzIxLjUiTiA4OMKwMjEnMDQuNCJF!5e0!3m2!1sen!2sin!4v1625489034903!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Girija Clinic Location"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
}
