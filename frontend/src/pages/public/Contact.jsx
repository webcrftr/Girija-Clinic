import React, { useState } from 'react';
import { useUI } from '../../context/UIContext';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

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
    <div className="font-sans antialiased text-slate-800 bg-white dark:bg-slate-900 transition-colors duration-200 py-16 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Banner */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold text-primary-500 bg-primary-50 dark:bg-primary-950/20 px-3 py-1 rounded-full uppercase tracking-wider">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 font-display">
            Contact Girija Clinic
          </h1>
          <p className="text-base text-slate-500 dark:text-slate-400 mt-4 leading-relaxed font-medium">
            Contact us for scheduling parameters, records retrievals, and support queries.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Info cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 dark:bg-slate-850 p-6 rounded-2xl border border-slate-100 dark:border-slate-805 flex items-start space-x-4">
              <div className="p-3 bg-primary-100 dark:bg-primary-950 text-primary-600 dark:text-primary-400 rounded-xl">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Clinic Address</h4>
                <p className="text-xs text-slate-505 dark:text-slate-400 mt-1 leading-relaxed">{settings?.address}</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-850 p-6 rounded-2xl border border-slate-100 dark:border-slate-805 flex items-start space-x-4">
              <div className="p-3 bg-primary-100 dark:bg-primary-950 text-primary-600 dark:text-primary-400 rounded-xl">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Tel Contacts</h4>
                <p className="text-xs text-slate-505 dark:text-slate-400 mt-1 leading-relaxed">{settings?.phone}</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-850 p-6 rounded-2xl border border-slate-100 dark:border-slate-805 flex items-start space-x-4">
              <div className="p-3 bg-primary-100 dark:bg-primary-950 text-primary-600 dark:text-primary-400 rounded-xl">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Email Inbox</h4>
                <p className="text-xs text-slate-505 dark:text-slate-400 mt-1 leading-relaxed">{settings?.email}</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-850 p-6 rounded-2xl border border-slate-100 dark:border-slate-805 flex items-start space-x-4">
              <div className="p-3 bg-primary-100 dark:bg-primary-950 text-primary-600 dark:text-primary-400 rounded-xl">
                <Clock size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Hours of Operation</h4>
                <p className="text-xs text-slate-505 dark:text-slate-400 mt-1 leading-relaxed">{settings?.openingHours}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-905 p-8 rounded-[24px] border border-slate-150 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-6">Send an Online Inquiry</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-405 dark:text-slate-400 block">YOUR NAME</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-150 dark:border-slate-850 bg-transparent rounded-lg text-xs focus:outline-none focus:border-primary-500 text-slate-807 dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-405 dark:text-slate-400 block">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-150 dark:border-slate-850 bg-transparent rounded-lg text-xs focus:outline-none focus:border-primary-500 text-slate-850 dark:text-white"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-405 dark:text-slate-400 block">TELEPHONE NUMBER</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-150 dark:border-slate-850 bg-transparent rounded-lg text-xs focus:outline-none focus:border-primary-500 text-slate-850 dark:text-white"
                    placeholder="+1 (555) 012-3456"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-405 dark:text-slate-400 block">YOUR MESSAGE</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-150 dark:border-slate-850 bg-transparent rounded-lg text-xs focus:outline-none focus:border-primary-500 text-slate-850 dark:text-white"
                    placeholder="How can our clinical team support you?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg text-xs transition shadow-lg shadow-primary-500/10"
                >
                  Send Inquiry Message
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Embedded Map Section */}
        <div className="border-t border-slate-150 dark:border-slate-800 pt-16 select-none">
          <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-6">Our Location Map</h2>
          <div className="aspect-[21/9] w-full bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
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
