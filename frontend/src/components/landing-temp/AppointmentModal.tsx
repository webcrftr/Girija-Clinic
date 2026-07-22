import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Calendar, Clock, User, Mail, Phone, MessageSquare, 
  Check, ChevronRight, ChevronLeft, Shield, Sparkles, Heart, Activity
} from 'lucide-react';
import { CLINIC_DOCTORS, CLINIC_SERVICES } from '../data';
import { AppointmentFormData } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialDoctorId?: string;
}

export default function AppointmentModal({ 
  isOpen, 
  onClose, 
  initialServiceId = '', 
  initialDoctorId = '' 
}: AppointmentModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<AppointmentFormData>({
    specialty: initialServiceId ? (CLINIC_SERVICES.find(s => s.id === initialServiceId)?.title || '') : '',
    doctorId: initialDoctorId || '',
    date: '',
    timeSlot: '',
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    notes: ''
  });

  const [appointmentCode] = useState(() => 'GC-' + Math.floor(100000 + Math.random() * 900000));

  const specialties = [
    { name: 'Clinical & Preventive Cardiology', icon: Heart, desc: 'Dr. Girija V. Prasad' },
    { name: 'Metabolic Optimization & Longevity', icon: Sparkles, desc: 'Dr. Adrian Sterling' },
    { name: 'Advanced Radiography & Imaging', icon: Activity, desc: 'Dr. Evelyn Cho' },
    { name: 'Executive & Preventative Care', icon: Shield, desc: 'General Health Defense' }
  ];

  const timeSlots = [
    '08:30 AM', '09:15 AM', '10:00 AM', '10:45 AM', 
    '11:30 AM', '02:00 PM', '02:45 PM', '03:30 PM', '04:15 PM'
  ];

  // Helper to generate next 7 days (excluding Sundays)
  const getNextDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= 10; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      if (nextDay.getDay() !== 0) { // Skip Sunday
        days.push(nextDay);
      }
    }
    return days;
  };

  const availableDays = getNextDays();

  const handleSelectSpecialty = (name: string) => {
    setFormData(prev => {
      // Auto select doctor if applicable
      let docId = prev.doctorId;
      if (name.includes('Cardiology')) docId = 'doc-1';
      else if (name.includes('Longevity')) docId = 'doc-2';
      else if (name.includes('Radiography')) docId = 'doc-3';
      
      return { ...prev, specialty: name, doctorId: docId };
    });
    setStep(2);
  };

  const handleSelectDoctor = (id: string) => {
    setFormData(prev => ({ ...prev, doctorId: id }));
    setStep(3);
  };

  const handleSelectDateTime = (dateStr: string, slot: string) => {
    setFormData(prev => ({ ...prev, date: dateStr, timeSlot: slot }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (step === 3 && (!formData.date || !formData.timeSlot)) return;
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName || !formData.patientEmail || !formData.patientPhone) return;
    setStep(5);
  };

  const selectedDoctor = CLINIC_DOCTORS.find(d => d.id === formData.doctorId);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            id="modal-backdrop"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white p-0 luxury-shadow border border-slate-100 max-h-[90vh] flex flex-col"
            id="modal-content"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <div>
                <span className="text-xs font-mono font-medium tracking-wider text-brand-500 uppercase">
                  Appointment Blueprint
                </span>
                <h3 className="font-display text-xl font-semibold text-slate-900 mt-1">
                  {step === 5 ? 'Reservation Confirmed' : 'Book Your Private Consultation'}
                </h3>
              </div>
              <button 
                onClick={onClose}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
                id="close-modal-btn"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Stepper Indicator */}
            {step < 5 && (
              <div className="flex bg-slate-50 border-b border-slate-100 px-8 py-3 gap-1">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex-1 flex items-center gap-2">
                    <div className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
                      step >= s ? 'bg-brand-500' : 'bg-slate-200'
                    }`} />
                  </div>
                ))}
              </div>
            )}

            {/* Content Area - Scrollable */}
            <div className="flex-1 overflow-y-auto p-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-6"
                  >
                    <div>
                      <h4 className="font-display text-lg font-medium text-slate-800">
                        Select medical discipline
                      </h4>
                      <p className="text-sm text-slate-500 mt-1">
                        Choose the area of expertise you wish to consult.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {specialties.map((spec) => {
                        const Icon = spec.icon;
                        const isSelected = formData.specialty === spec.name;
                        return (
                          <button
                            key={spec.name}
                            onClick={() => handleSelectSpecialty(spec.name)}
                            className={`flex items-start text-left p-5 rounded-2xl border transition-all ${
                              isSelected 
                                ? 'border-brand-500 bg-brand-50/50 luxury-shadow' 
                                : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                            id={`specialty-opt-${spec.name.replace(/\s+/g, '-').toLowerCase()}`}
                          >
                            <div className={`rounded-xl p-3 mr-4 ${
                              isSelected ? 'bg-brand-500 text-white' : 'bg-brand-50 text-brand-500'
                            }`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="block font-semibold text-slate-800 text-sm md:text-base leading-tight">
                                {spec.name}
                              </span>
                              <span className="block text-xs text-slate-500 mt-1 font-medium">
                                Lead: {spec.desc}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-display text-lg font-medium text-slate-800">
                          Select specialist
                        </h4>
                        <p className="text-sm text-slate-500 mt-1">
                          Our board-certified experts available for your care.
                        </p>
                      </div>
                      <button 
                        onClick={() => handleSelectDoctor('doc-1')} 
                        className="text-xs font-semibold text-brand-500 hover:underline flex items-center"
                        id="skip-doc-select"
                      >
                        First Available <ChevronRight className="h-3 w-3 ml-0.5" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {CLINIC_DOCTORS.map((doc) => {
                        const isSelected = formData.doctorId === doc.id;
                        return (
                          <div
                            key={doc.id}
                            onClick={() => handleSelectDoctor(doc.id)}
                            className={`flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                              isSelected 
                                ? 'border-brand-500 bg-brand-50/30' 
                                : 'border-slate-100 hover:border-slate-200'
                            }`}
                            id={`doctor-opt-${doc.id}`}
                          >
                            <img 
                              src={doc.image} 
                              alt={doc.name} 
                              referrerPolicy="no-referrer"
                              className="w-16 h-16 rounded-xl object-cover object-center" 
                            />
                            <div className="flex-1 text-center md:text-left min-w-0">
                              <h5 className="font-semibold text-slate-800 text-base">{doc.name}</h5>
                              <p className="text-xs text-brand-500 font-medium">{doc.specialty}</p>
                              <p className="text-xs text-slate-500 mt-1 line-clamp-1">{doc.education}</p>
                            </div>
                            <div className="flex flex-col items-center md:items-end gap-1.5">
                              <span className="text-xs font-mono font-medium text-slate-500">
                                Availability: {doc.availability.join(', ')}
                              </span>
                              <div className="bg-slate-100 rounded-full px-2.5 py-0.5 flex items-center gap-1">
                                <span className="text-[10px] font-bold text-yellow-600">★</span>
                                <span className="text-[11px] font-semibold text-slate-700">{doc.rating}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-6"
                  >
                    <div>
                      <h4 className="font-display text-lg font-medium text-slate-800">
                        Choose date & hour slot
                      </h4>
                      <p className="text-sm text-slate-500 mt-1">
                        Select a date within the next week, followed by your preferred time.
                      </p>
                    </div>

                    <div className="space-y-6">
                      {/* Date selection row */}
                      <div>
                        <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                          Select Date
                        </span>
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                          {availableDays.map((day, idx) => {
                            const dateStr = day.toISOString().split('T')[0];
                            const isSelected = formData.date === dateStr;
                            const dayName = day.toLocaleDateString('en-US', { weekday: 'short' });
                            const dayNum = day.getDate();
                            const monthName = day.toLocaleDateString('en-US', { month: 'short' });

                            return (
                              <button
                                key={idx}
                                onClick={() => setFormData(prev => ({ ...prev, date: dateStr }))}
                                className={`flex flex-col items-center min-w-[70px] py-3.5 px-2 rounded-2xl border transition-all ${
                                  isSelected 
                                    ? 'bg-brand-500 border-brand-500 text-white luxury-shadow' 
                                    : 'bg-white border-slate-100 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                                }`}
                                id={`date-opt-${dateStr}`}
                              >
                                <span className={`text-[10px] font-semibold tracking-wider uppercase ${
                                  isSelected ? 'text-brand-100' : 'text-slate-400'
                                }`}>
                                  {dayName}
                                </span>
                                <span className="text-xl font-bold font-display mt-1">{dayNum}</span>
                                <span className={`text-[10px] font-medium ${
                                  isSelected ? 'text-brand-100' : 'text-slate-500'
                                }`}>
                                  {monthName}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time slot selection */}
                      {formData.date && (
                        <div>
                          <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                            Select Time Slot
                          </span>
                          <div className="grid grid-cols-3 gap-2.5">
                            {timeSlots.map((slot) => {
                              const isSelected = formData.timeSlot === slot;
                              return (
                                <button
                                  key={slot}
                                  onClick={() => setFormData(prev => ({ ...prev, timeSlot: slot }))}
                                  className={`py-3 px-2 rounded-xl text-center text-sm font-semibold transition-all border ${
                                    isSelected 
                                      ? 'bg-brand-100 text-brand-700 border-brand-500 shadow-sm' 
                                      : 'bg-white border-slate-100 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                                  }`}
                                  id={`time-opt-${slot.replace(/\s+/g, '-').toLowerCase()}`}
                                >
                                  {slot}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-6"
                  >
                    <div>
                      <h4 className="font-display text-lg font-medium text-slate-800">
                        Patient Credentials
                      </h4>
                      <p className="text-sm text-slate-500 mt-1">
                        Please provide valid credentials to link your consultation record.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4" id="appointment-form">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-500">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <input
                              type="text"
                              required
                              name="patientName"
                              value={formData.patientName}
                              onChange={handleInputChange}
                              placeholder="Jane Doe"
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 text-sm bg-slate-50/50"
                              id="input-patientName"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-500">Contact Number</label>
                          <div className="relative">
                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <input
                              type="tel"
                              required
                              name="patientPhone"
                              value={formData.patientPhone}
                              onChange={handleInputChange}
                              placeholder="+1 (555) 000-0000"
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 text-sm bg-slate-50/50"
                              id="input-patientPhone"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                          <input
                            type="email"
                            required
                            name="patientEmail"
                            value={formData.patientEmail}
                            onChange={handleInputChange}
                            placeholder="jane.doe@executive.com"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 text-sm bg-slate-50/50"
                            id="input-patientEmail"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500">Private Medical Notes (Optional)</label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3.5 top-4 text-slate-400 h-4 w-4" />
                          <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            rows={3}
                            placeholder="Detail any symptoms or historical medical contexts you wish the clinic to review..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 text-sm bg-slate-50/50 resize-none"
                            id="input-notes"
                          />
                        </div>
                      </div>
                    </form>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div
                    key="step-5"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-6"
                  >
                    <div className="h-16 w-16 bg-brand-50 rounded-full flex items-center justify-center text-brand-500 mb-6 border border-brand-100">
                      <Check className="h-8 w-8 stroke-[3]" />
                    </div>

                    <h4 className="font-display text-2xl font-semibold text-slate-900">
                      Consulation Secured
                    </h4>
                    <p className="text-sm text-slate-500 mt-2 max-w-md">
                      Your premium slot is reserved. A confirmation email with preparation protocols has been dispatched to <span className="font-semibold text-slate-800">{formData.patientEmail}</span>.
                    </p>

                    {/* Summary Card */}
                    <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 mt-8 text-left space-y-4 max-w-md mx-auto">
                      <div className="flex justify-between border-b border-slate-200/50 pb-3">
                        <span className="text-xs font-mono text-slate-400">APPOINTMENT CODE</span>
                        <span className="text-xs font-mono font-bold text-brand-500">{appointmentCode}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">SPECIALIST</span>
                          <span className="text-sm font-semibold text-slate-800 mt-1 block">
                            {selectedDoctor ? selectedDoctor.name : 'First Available Physician'}
                          </span>
                        </div>
                        <div>
                          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">DISCIPLINE</span>
                          <span className="text-sm font-medium text-slate-600 mt-1 block truncate">
                            {formData.specialty}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t border-slate-200/50 pt-3">
                        <div className="flex items-center gap-2.5">
                          <div className="bg-white p-2 rounded-lg text-brand-500 border border-slate-100 shadow-sm">
                            <Calendar className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="block text-[9px] font-semibold text-slate-400">DATE</span>
                            <span className="text-xs font-bold text-slate-800 mt-0.5 block">{formData.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <div className="bg-white p-2 rounded-lg text-brand-500 border border-slate-100 shadow-sm">
                            <Clock className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="block text-[9px] font-semibold text-slate-400">TIME SLOT</span>
                            <span className="text-xs font-bold text-slate-800 mt-0.5 block">{formData.timeSlot}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={onClose}
                      className="mt-8 bg-slate-900 text-white rounded-full px-8 py-3.5 font-semibold text-sm hover:bg-slate-800 transition-colors shadow-sm"
                      id="close-success-btn"
                    >
                      Close Gateway
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sticky Actions Footer */}
            {step < 5 && (
              <div className="flex justify-between items-center bg-slate-50 border-t border-slate-100 p-6">
                {step > 1 ? (
                  <button
                    onClick={handlePrevStep}
                    className="flex items-center text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors px-4 py-2"
                    id="prev-step-btn"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1.5" /> Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    onClick={handleNextStep}
                    disabled={step === 3 && (!formData.date || !formData.timeSlot)}
                    className={`flex items-center text-sm font-bold bg-slate-900 text-white rounded-full px-6 py-3 transition-all ${
                      (step === 3 && (!formData.date || !formData.timeSlot)) 
                        ? 'opacity-50 cursor-not-allowed bg-slate-300 text-slate-500' 
                        : 'hover:bg-slate-800'
                    }`}
                    id="next-step-btn"
                  >
                    Continue <ChevronRight className="h-4 w-4 ml-1.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!formData.patientName || !formData.patientEmail || !formData.patientPhone}
                    className={`flex items-center text-sm font-bold bg-brand-500 text-white rounded-full px-6 py-3 transition-all ${
                      (!formData.patientName || !formData.patientEmail || !formData.patientPhone)
                        ? 'opacity-50 cursor-not-allowed bg-slate-300 text-slate-500'
                        : 'hover:bg-brand-600'
                    }`}
                    id="submit-appointment-btn"
                  >
                    Secure Appointment <Check className="h-4 w-4 ml-1.5" />
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
