import React, { useState, useEffect } from 'react';
import { useUI } from '../../context/UIContext';
import { db } from '../../firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Save, Settings as SettingsIcon, HeartPulse, Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Settings() {
  const { settings, refreshSettings, showToast } = useUI();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    clinicName: '',
    doctorName: '',
    phone: '',
    email: '',
    address: '',
    openingHours: ''
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        clinicName: settings.clinicName || '',
        doctorName: settings.doctorName || '',
        phone: settings.phone || '',
        email: settings.email || '',
        address: settings.address || '',
        openingHours: settings.openingHours || ''
      });
    }
  }, [settings]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await setDoc(doc(db, 'settings', 'clinic_settings'), formData);
      showToast('Clinic settings updated successfully!', 'success');
      refreshSettings(); // refresh global context
    } catch (err) {
      console.error(err);
      showToast('Failed to update clinic settings.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 font-sans text-left select-none relative z-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-display flex items-center space-x-2">
          <SettingsIcon className="text-primary-500" size={24} />
          <span>Clinic Settings</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">Configure clinic profile details, contacts, and metadata shown to public guests dashboard portals.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Card - Metadata Display */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-6 relative overflow-hidden">
            <span className="absolute top-4 right-4 bg-primary-50 dark:bg-primary-950/20 text-primary-600 dark:text-primary-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              Metadata Live
            </span>

            <div className="text-center pt-6">
              <div className="h-16 w-16 bg-primary-50 dark:bg-primary-950/40 rounded-2xl flex items-center justify-center border-2 border-primary-100 dark:border-primary-900 mx-auto text-primary-500 shadow">
                <HeartPulse size={32} />
              </div>
              <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white mt-4">
                {formData.clinicName || 'Girija Clinic'}
              </h2>
              <p className="text-xs text-slate-400 font-semibold mt-1">
                {formData.doctorName || 'Dr. Girija Prasad'}
              </p>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-4 text-xs">
              <div className="flex items-start space-x-3 text-slate-600 dark:text-slate-405">
                <Phone size={14} className="text-slate-400 shrink-0 mt-0.5" />
                <span className="font-mono font-semibold">{formData.phone || 'No phone set'}</span>
              </div>
              <div className="flex items-start space-x-3 text-slate-600 dark:text-slate-405">
                <Mail size={14} className="text-slate-400 shrink-0 mt-0.5" />
                <span className="truncate">{formData.email || 'No email set'}</span>
              </div>
              <div className="flex items-start space-x-3 text-slate-600 dark:text-slate-405">
                <MapPin size={14} className="text-slate-400 shrink-0 mt-0.5" />
                <span>{formData.address || 'No address set'}</span>
              </div>
              <div className="flex items-start space-x-3 text-slate-600 dark:text-slate-405">
                <Clock size={14} className="text-slate-400 shrink-0 mt-0.5" />
                <span>{formData.openingHours || 'No timings set'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form - Config Setup */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider pb-3 border-b border-slate-100 dark:border-slate-800">
              Configure Profile Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-left">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-450 dark:text-slate-400 block pt-0.5">CLINIC PUBLIC NAME *</label>
                <input
                  type="text"
                  name="clinicName"
                  required
                  value={formData.clinicName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-150 dark:border-slate-850 bg-transparent rounded-lg focus:outline-none focus:border-primary-500 dark:text-white transition"
                  placeholder="e.g. Girija Clinic"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-450 dark:text-slate-400 block pt-0.5">PRIMARY DOCTOR NAME *</label>
                <input
                  type="text"
                  name="doctorName"
                  required
                  value={formData.doctorName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-150 dark:border-slate-850 bg-transparent rounded-lg focus:outline-none focus:border-primary-500 dark:text-white transition"
                  placeholder="e.g. Dr. Girija Prasad"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-left">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-455 dark:text-slate-400 block pt-0.5">CONTACT TELEPHONE *</label>
                <input
                  type="text"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-150 dark:border-slate-850 bg-transparent rounded-lg focus:outline-none focus:border-primary-500 dark:text-white transition"
                  placeholder="e.g. +91 9876543210"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-455 dark:text-slate-400 block pt-0.5">SUPPORT EMAIL *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-150 dark:border-slate-850 bg-transparent rounded-lg focus:outline-none focus:border-primary-500 dark:text-white transition"
                  placeholder="e.g. support@girijaclinic.com"
                />
              </div>
            </div>

            <div className="space-y-1 text-xs text-left">
              <label className="text-[10px] font-bold text-slate-455 dark:text-slate-400 block pt-0.5">CLINIC PHYSICAL ADDRESS *</label>
              <textarea
                name="address"
                required
                rows={3}
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-155 dark:border-slate-850 bg-transparent rounded-lg focus:outline-none focus:border-primary-500 dark:text-white transition"
                placeholder="e.g. 123 Health Ave, District Suite"
              ></textarea>
            </div>

            <div className="space-y-1 text-xs text-left">
              <label className="text-[10px] font-bold text-slate-455 dark:text-slate-400 block pt-0.5">CLINIC OPENING TIMINGS *</label>
              <input
                type="text"
                name="openingHours"
                required
                value={formData.openingHours}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-150 dark:border-slate-850 bg-transparent rounded-lg focus:outline-none focus:border-primary-500 dark:text-white transition"
                placeholder="e.g. Mon - Sat: 9:00 AM - 6:00 PM (Sunday Closed)"
              />
            </div>

            {/* Bottom Form Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 px-6 py-2.5 bg-primary-500 hover:bg-primary-600 disabled:bg-slate-450 text-white rounded-xl transition text-xs font-semibold shadow-md active:scale-95 duration-150"
              >
                <Save size={16} />
                <span>{loading ? 'Saving Changes...' : 'Save Settings'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
