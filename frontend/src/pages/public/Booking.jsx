import React, { useState } from 'react';
import { useUI } from '../../context/UIContext';
import { db } from '../../firebase/firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { Calendar, HeartPulse, CheckCircle2, ShieldCheck, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Booking() {
  const { showToast, settings } = useUI();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    gender: 'Male',
    age: '',
    dob: '',
    bloodGroup: 'O+',
    appointmentDate: '',
    timeSlot: '09:00 AM - 09:30 AM',
    reason: 'Routine Checkup',
    notes: ''
  });

  const slots = [
    '09:00 AM - 09:30 AM',
    '10:00 AM - 10:30 AM',
    '11:00 AM - 11:30 AM',
    '02:00 PM - 02:30 PM',
    '03:00 PM - 03:30 PM',
    '04:00 PM - 04:30 PM'
  ];

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Find patient by phone
      let patientId = null;
      const patientQuery = query(collection(db, 'patients'), where('phone', '==', formData.phone));
      const patientSnap = await getDocs(patientQuery);
      
      if (!patientSnap.empty) {
        patientId = patientSnap.docs[0].id;
      } else {
        // Create new patient
        const allPatientsSnap = await getDocs(collection(db, 'patients'));
        const count = allPatientsSnap.size;
        const formattedNum = String(count + 1).padStart(4, '0');
        const autoPatientId = `GCN-${formattedNum}`;
        
        const newPatientRef = await addDoc(collection(db, 'patients'), {
          patientId: autoPatientId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          email: formData.email || '',
          gender: formData.gender || 'Other',
          age: parseInt(formData.age) || 30,
          dob: formData.dob || new Date().toISOString().split('T')[0],
          bloodGroup: formData.bloodGroup || 'O+',
          createdAt: serverTimestamp()
        });
        patientId = newPatientRef.id;
      }
      
      // Create appointment
      await addDoc(collection(db, 'appointments'), {
        patientId,
        doctorName: 'Dr. Girija Prasad',
        appointmentDate: formData.appointmentDate,
        timeSlot: formData.timeSlot,
        reason: formData.reason,
        notes: formData.notes || '',
        status: 'Pending',
        createdAt: serverTimestamp()
      });
      
      setSuccess(true);
      showToast('Appointment booked successfully! We will coordinate via call.', 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to complete booking. Please double check values.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-[#F5F8FD] transition-colors py-28">
        <div className="max-w-lg w-full bg-white border border-[#E2E8F0] rounded-3xl p-10 text-center space-y-6 shadow-soft">
          <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mx-auto">
            <CheckCircle2 size={36} />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold font-display text-[#0F172A]">
              Booking Confirmed!
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-normal">
              Your appointment request has been submitted. Our reception desk will call you shortly at <strong className="text-[#0F172A] font-semibold">{formData.phone}</strong> to confirm your slot parameters.
            </p>
          </div>

          <div className="p-4 bg-[#F5F8FD] rounded-2xl border border-[#DBEAFE] text-left space-y-1.5 text-xs">
            <div className="flex justify-between text-[#64748B]">
              <span>Patient:</span>
              <strong className="text-[#0F172A]">{formData.firstName} {formData.lastName}</strong>
            </div>
            <div className="flex justify-between text-[#64748B]">
              <span>Visit Date:</span>
              <strong className="text-[#0F172A]">{formData.appointmentDate}</strong>
            </div>
            <div className="flex justify-between text-[#64748B]">
              <span>Time Slot:</span>
              <strong className="text-[#2563EB]">{formData.timeSlot}</strong>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/"
              className="inline-block w-full py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-full text-xs font-bold transition shadow-sm text-center"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans antialiased text-[#0F172A] bg-white transition-colors duration-200 py-28 text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
          <div className="w-12 h-12 bg-[#DBEAFE] text-[#2563EB] rounded-2xl flex items-center justify-center mx-auto shadow-subtle">
            <HeartPulse size={24} />
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] font-display tracking-tight">
            Schedule Doctor Visit
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-normal">
            Register your basic health details and pick a calendar schedule. We will coordinate details.
          </p>
        </div>

        {/* Booking Form Sheet */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E2E8F0] shadow-soft">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Step 1: Patient Profile Fields */}
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <h3 className="text-xs font-bold text-[#0F172A] flex items-center space-x-2 uppercase tracking-wider">
                  <User size={15} className="text-[#2563EB]" />
                  <span>1. Patient Personal Details</span>
                </h3>
                <span className="text-[11px] text-[#2563EB] font-semibold flex items-center gap-1">
                  <ShieldCheck size={14} /> Confidential
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#64748B] block uppercase tracking-wider">FIRST NAME *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                    placeholder="Enter first name"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#64748B] block uppercase tracking-wider">LAST NAME *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#64748B] block uppercase tracking-wider">TELEPHONE NUMBER *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                    placeholder="Enter mobile phone number"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#64748B] block uppercase tracking-wider">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#64748B] block uppercase tracking-wider">DATE OF BIRTH *</label>
                  <input
                    type="date"
                    name="dob"
                    required
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#64748B] block uppercase tracking-wider">GENDER *</label>
                  <select
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors cursor-pointer"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#64748B] block uppercase tracking-wider">AGE *</label>
                  <input
                    type="number"
                    name="age"
                    required
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                    placeholder="e.g. 35"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#64748B] block uppercase tracking-wider">BLOOD GROUP *</label>
                  <select
                    name="bloodGroup"
                    required
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors cursor-pointer"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Appointment Fields */}
            <div className="space-y-5 pt-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <h3 className="text-xs font-bold text-[#0F172A] flex items-center space-x-2 uppercase tracking-wider">
                  <Calendar size={15} className="text-[#2563EB]" />
                  <span>2. Schedule Preferences</span>
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#64748B] block uppercase tracking-wider">VISIT DATE *</label>
                  <input
                    type="date"
                    name="appointmentDate"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#64748B] block uppercase tracking-wider">TIME SLOT *</label>
                  <select
                    name="timeSlot"
                    required
                    value={formData.timeSlot}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors cursor-pointer"
                  >
                    {slots.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Slot Quick Selector */}
              <div className="space-y-2 pt-1">
                <label className="text-[10px] font-bold text-[#64748B] block tracking-wider uppercase">
                  QUICK SLOT PICKER
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {slots.map(s => {
                    const selected = formData.timeSlot === s;
                    return (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setFormData(prev => ({ ...prev, timeSlot: s }))}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                          selected
                            ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-sm'
                            : 'bg-[#F8FAFC] text-[#0F172A] border-[#E2E8F0] hover:border-[#2563EB]'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-[11px] font-bold text-[#64748B] block uppercase tracking-wider">REASON FOR VISIT</label>
                <input
                  type="text"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                  placeholder="e.g. Regular health assessment, checkups"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#64748B] block uppercase tracking-wider">DOCTOR NOTES (OPTIONAL)</label>
                <textarea
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                  placeholder="Provide allergy histories, symptoms, or diagnostic summaries..."
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-white font-bold rounded-full text-xs sm:text-sm transition shadow-sm active:scale-95 flex items-center justify-center space-x-2"
            >
              <Calendar size={16} />
              <span>{loading ? 'Transmitting Schedule logs...' : 'Book Doctor Visit'}</span>
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}
