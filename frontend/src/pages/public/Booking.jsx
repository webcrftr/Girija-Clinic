import React, { useState } from 'react';
import { useUI } from '../../context/UIContext';
import { db } from '../../firebase/firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { Calendar, Clock, HeartPulse, User } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      <div className="min-h-[70vh] flex items-center justify-center p-6 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-md w-full bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 text-center space-y-6">
          <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center text-4xl mx-auto shadow-lg shadow-emerald-500/10">
            ✓
          </div>
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">Booking Confirmed!</h2>
          <p className="text-xs text-slate-500 leading-relaxed font-semibold">
            Your appointment has been registered. Our reception desk will call you shortly on <strong>{formData.phone}</strong> to confirm clinical parameters or schedule changes.
          </p>
          <div className="pt-4 flex flex-col space-y-2">
            <Link
              to="/"
              className="py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-xs font-bold transition text-center"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans antialiased text-slate-800 bg-white dark:bg-slate-900 transition-colors duration-200 py-16 text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
          <HeartPulse size={36} className="text-primary-500 mx-auto" />
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            Schedule Doctor Visit
          </h1>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Register your basic health vitals and pick a calendar schedule. We will coordinate details.
          </p>
        </div>

        {/* Booking Form Sheet */}
        <div className="bg-slate-50 dark:bg-slate-850 p-8 sm:p-10 rounded-[32px] border border-slate-150 dark:border-slate-800 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Step 1: Patient Profile Fields */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2 pb-2 border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-primary-500">
                <User size={16} />
                <span>1. Patient Personal Details</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 block">FIRST NAME *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:outline-none focus:border-primary-500 dark:text-white"
                    placeholder="Enter first name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 block">LAST NAME *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:outline-none focus:border-primary-500 dark:text-white"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 block">TELEPHONE NUMBER *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:outline-none focus:border-primary-500 dark:text-white"
                    placeholder="Enter mobile phone number"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 block">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:outline-none focus:border-primary-500 dark:text-white"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 block">DATE OF BIRTH *</label>
                  <input
                    type="date"
                    name="dob"
                    required
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:outline-none focus:border-primary-500 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 block">GENDER *</label>
                  <select
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:outline-none focus:border-primary-500 dark:text-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 block">AGE *</label>
                  <input
                    type="number"
                    name="age"
                    required
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:outline-none focus:border-primary-500 dark:text-white"
                    placeholder="e.g. 35"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 block">BLOOD GROUP *</label>
                  <select
                    name="bloodGroup"
                    required
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:outline-none focus:border-primary-500 dark:text-white"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Appointment Fields */}
            <div className="space-y-4 pt-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2 pb-2 border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-primary-500">
                <Calendar size={16} />
                <span>2. Schedule Preferences</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 block">VISIT DATE *</label>
                  <input
                    type="date"
                    name="appointmentDate"
                    required
                    min={new Date().toISOString().split('T')[0]} // Block past dates
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:outline-none focus:border-primary-500 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 block">TIME SLOT *</label>
                  <select
                    name="timeSlot"
                    required
                    value={formData.timeSlot}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:outline-none focus:border-primary-500 dark:text-white"
                  >
                    {slots.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 block">REASON FOR VISIT</label>
                <input
                  type="text"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:outline-none focus:border-primary-500 dark:text-white"
                  placeholder="e.g. Regular health assessment, checkups"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 block">DOCTOR NOTES (OPTIONAL)</label>
                <textarea
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:outline-none focus:border-primary-500 dark:text-white"
                  placeholder="Provide allergy histories, pain levels, or diagnostic summaries if any..."
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary-500 hover:bg-primary-600 disabled:bg-slate-450 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-primary-500/20 active:scale-[0.99] flex items-center justify-center space-x-2"
            >
              {loading ? 'Transmitting Schedule logs...' : 'Book Doctor Visit'}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}
