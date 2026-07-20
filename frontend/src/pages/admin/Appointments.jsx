import React, { useState, useEffect } from 'react';
import { useUI } from '../../context/UIContext';
import { db } from '../../firebase/firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { Plus, Search, Calendar, Clock, Edit, CheckCircle2, XCircle, Trash2, ArrowUpDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Appointments() {
  const { showToast, triggerConfirm } = useUI();

  // Core list states
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filters parameters
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Reschedule & Scheduling Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null); // Null if creating
  
  // Search patient dynamic states
  const [patientSearch, setPatientSearch] = useState('');
  const [patientsList, setPatientsList] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [formFields, setFormFields] = useState({
    patientId: '',
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

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      // Fetch all patients to map them
      const patientsSnap = await getDocs(collection(db, "patients"));
      const patientsMap = {};
      patientsSnap.docs.forEach(docSnap => {
        patientsMap[docSnap.id] = { id: docSnap.id, ...docSnap.data() };
      });

      // Fetch appointments
      const appSnap = await getDocs(collection(db, "appointments"));
      let list = appSnap.docs.map(docSnap => {
        const data = docSnap.data();
        return {
          _id: docSnap.id,
          ...data,
          patient: patientsMap[data.patientId] || null
        };
      });

      // Client-side search and status filters
      if (status) {
        list = list.filter(app => app.status === status);
      }

      if (search.trim()) {
        const term = search.toLowerCase();
        list = list.filter(app => {
          const patientName = `${app.patient?.firstName || ''} ${app.patient?.lastName || ''}`.toLowerCase();
          const patientId = (app.patient?.patientId || '').toLowerCase();
          return patientName.includes(term) || patientId.includes(term);
        });
      }

      if (dateFilter) {
        list = list.filter(app => {
          const appDateStr = new Date(app.appointmentDate).toISOString().split('T')[0];
          return appDateStr === dateFilter;
        });
      }

      // Sort: appointmentDate ascending, then time slot
      list.sort((a, b) => {
        const dateA = new Date(a.appointmentDate);
        const dateB = new Date(b.appointmentDate);
        if (dateA - dateB !== 0) return dateA - dateB;
        return (a.timeSlot || '').localeCompare(b.timeSlot || '');
      });

      setAppointments(list);
    } catch (err) {
      console.error(err);
      showToast('Failed to load appointments.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [search, status, dateFilter]);

  // Debounced Patient Search inside creation modal
  useEffect(() => {
    if (patientSearch.trim().length < 2) {
      setPatientsList([]);
      return;
    }
    const delayDebounce = setTimeout(async () => {
      try {
        const patientsSnap = await getDocs(collection(db, "patients"));
        let list = patientsSnap.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
        const term = patientSearch.toLowerCase();
        list = list.filter(pat => 
          (pat.firstName + ' ' + pat.lastName).toLowerCase().includes(term) ||
          (pat.patientId || '').toLowerCase().includes(term) ||
          (pat.phone || '').toLowerCase().includes(term)
        );
        setPatientsList(list.slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [patientSearch]);

  const openSchedulingModal = (app = null) => {
    setSelectedPatient(null);
    setPatientSearch('');
    setPatientsList([]);

    if (app) {
      setSelectedApp(app);
      setSelectedPatient(app.patient);
      setFormFields({
        patientId: app.patientId || '',
        appointmentDate: new Date(app.appointmentDate).toISOString().split('T')[0],
        timeSlot: app.timeSlot || '09:00 AM - 09:30 AM',
        reason: app.reason || '',
        notes: app.notes || ''
      });
    } else {
      setSelectedApp(null);
      setFormFields({
        patientId: '',
        appointmentDate: new Date().toISOString().split('T')[0],
        timeSlot: '09:00 AM - 09:30 AM',
        reason: 'Routine Checkup',
        notes: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    setFormFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const selectPatientResult = (pat) => {
    setSelectedPatient(pat);
    setFormFields(prev => ({ ...prev, patientId: pat.id }));
    setPatientsList([]);
    setPatientSearch('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formFields.patientId) {
      showToast('Please select a patient file', 'error');
      return;
    }

    try {
      if (selectedApp) {
        await updateDoc(doc(db, "appointments", selectedApp._id), formFields);
        showToast('Appointment modified successfully', 'success');
      } else {
        await addDoc(collection(db, "appointments"), {
          ...formFields,
          doctorName: 'Dr. Girija Prasad',
          status: 'Pending',
          createdAt: serverTimestamp()
        });
        showToast('Appointment scheduled successfully', 'success');
      }
      setIsModalOpen(false);
      fetchAppointments();
    } catch (err) {
      console.error(err);
      showToast('Failed to save appointment scheduling.', 'error');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, "appointments", id), { status: newStatus });
      showToast(`Appointment status updated to ${newStatus}`, 'success');
      fetchAppointments();
    } catch (err) {
      console.error(err);
      showToast('Failed to update status.', 'error');
    }
  };

  const handleDeleteAppointment = async (id) => {
    const confirm = await triggerConfirm({
      title: 'Cancel & Delete Appointment',
      message: 'Are you sure you want to remove this appointment slot? This deletes historical registers.',
      confirmText: 'Remove Slot',
      cancelText: 'Cancel'
    });

    if (confirm) {
      try {
        await deleteDoc(doc(db, "appointments", id));
        showToast('Appointment deleted successfully', 'success');
        fetchAppointments();
      } catch (err) {
        console.error(err);
        showToast('Failed to delete appointment slot.', 'error');
      }
    }
  };

  return (
    <div className="space-y-6 font-sans text-left select-none relative z-10">
      
      {/* Header title */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-display">Appointments Manager</h1>
          <p className="text-xs text-slate-400 mt-1">Schedule daily slots, edit timings, and track clinical status queues.</p>
        </div>
        <button
          onClick={() => openSchedulingModal()}
          className="flex items-center space-x-2 px-4 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition text-xs font-semibold shadow-md active:scale-95 animate-fade-in"
        >
          <Plus size={16} />
          <span>New Appointment</span>
        </button>
      </div>

      {/* Query selectors row */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search patient names..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-100 text-slate-700 placeholder-slate-400 rounded-lg focus:outline-none focus:border-primary-400 dark:bg-slate-800 dark:border-slate-800 dark:text-white dark:placeholder-slate-500 transition"
          />
        </div>

        {/* Date / Status filters */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Filter Date</span>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-1 bg-slate-50 border border-slate-105 rounded-lg dark:bg-slate-800 dark:border-slate-800 text-slate-650 dark:text-slate-300 focus:outline-none"
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Status</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-105 rounded-lg dark:bg-slate-800 dark:border-slate-800 text-slate-650 dark:text-slate-300 focus:outline-none"
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

        </div>

      </div>

      {/* Grid listing queued appointments */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-16 bg-white dark:bg-slate-900 border rounded-2xl animate-pulse"></div>)}
        </div>
      ) : appointments.length > 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase py-3 px-6 h-12 bg-slate-50/50 dark:bg-slate-900">
                  <th className="pl-6 py-3">Patient</th>
                  <th className="py-3">Date</th>
                  <th className="py-3">Time Slot</th>
                  <th className="py-3">Diagnosis Reason</th>
                  <th className="py-3">Status</th>
                  <th className="py-3 text-right pr-6">Quick Status Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-804">
                {appointments.map((app) => (
                  <tr key={app._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10 text-slate-700 dark:text-slate-300">
                    <td className="pl-6 py-4">
                      <div className="text-left">
                        <Link to={`/admin/patients/${app.patient?._id}`} className="text-sm font-semibold text-slate-900 dark:text-white hover:text-primary-500">
                          {app.patient?.firstName} {app.patient?.lastName}
                        </Link>
                        <p className="text-[10px] text-slate-400">ID: {app.patient?.patientId}</p>
                      </div>
                    </td>
                    <td className="py-4 font-semibold">
                      {new Date(app.appointmentDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-1 font-semibold text-slate-650 dark:text-slate-350">
                        <Clock size={12} className="text-slate-400" />
                        <span>{app.timeSlot}</span>
                      </div>
                    </td>
                    <td className="py-4 max-w-[200px] truncate">{app.reason || 'General checkups'}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                        app.status === 'Completed' 
                          ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400' 
                          : app.status === 'Cancelled'
                          ? 'bg-red-50 text-red-800 dark:bg-red-950/20 dark:text-red-400'
                          : 'bg-blue-50 text-blue-800 dark:bg-blue-950/20 dark:text-blue-400'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-4 text-right pr-6 space-x-2 shrink-0">
                      {app.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(app._id, 'Completed')}
                            className="inline-flex p-1.5 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-600 text-slate-400 dark:bg-slate-800 rounded-lg transition"
                            title="Complete Visit"
                          >
                            <CheckCircle2 size={13} />
                          </button>
                          <button
                            onClick={() => handleStatusChange(app._id, 'Cancelled')}
                            className="inline-flex p-1.5 bg-slate-50 hover:bg-red-50 hover:text-red-500 text-slate-400 dark:bg-slate-800 rounded-lg transition"
                            title="Cancel Visit"
                          >
                            <XCircle size={13} />
                          </button>
                        </>
                      )}
                      
                      <button
                        onClick={() => openSchedulingModal(app)}
                        className="inline-flex p-1.5 bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-500 dark:bg-slate-800 rounded-lg transition"
                        title="Reschedule Slot"
                      >
                        <Edit size={13} />
                      </button>
                      <button
                        onClick={() => handleDeleteAppointment(app._id)}
                        className="inline-flex p-1.5 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 dark:bg-slate-800 rounded-lg transition"
                        title="Delete slot"
                      >
                        <Trash2 size={13} />
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-12 text-center rounded-2xl">
          <Calendar size={48} className="text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-700 dark:text-white mt-4 font-display">No Scheduled visits found</h3>
          <p className="text-xs text-slate-450 mt-1 max-w-sm mx-auto font-medium">Verify selected dates or filters parameters.</p>
        </div>
      )}

      {/* APPOINTMENT SCHEDULING / RESCHEDULE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-hidden select-none">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-2xl flex flex-col">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display mb-4">
              {selectedApp ? 'Reschedule Clinical Visit' : 'Schedule Custom Visit'}
            </h3>
            
            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs text-left">
              
              {/* Patient Selection (Disabled during Reschedule) */}
              {!selectedApp ? (
                <div className="space-y-1 relative">
                  <label className="text-[10px] font-bold text-slate-400 block">SEARCH PATIENT NAME *</label>
                  <input
                    type="text"
                    required={!selectedPatient}
                    value={patientSearch}
                    onChange={(e) => setPatientSearch(e.target.value)}
                    placeholder="Type name (min 2 chars)..."
                    className="w-full px-3 py-2 border border-slate-150 dark:border-slate-800 bg-transparent rounded-lg focus:outline-none dark:text-white"
                  />
                  {selectedPatient && (
                    <div className="mt-2.5 p-2.5 bg-emerald-50 dark:bg-slate-850 border border-emerald-100 dark:border-slate-800 rounded-lg flex items-center justify-between text-emerald-800 dark:text-emerald-300">
                      <span>Selected: <strong>{selectedPatient.firstName} {selectedPatient.lastName}</strong></span>
                      <button type="button" onClick={() => setSelectedPatient(null)} className="text-xs font-bold font-sans">✕</button>
                    </div>
                  )}

                  {/* search popup */}
                  {patientsList.length > 0 && (
                    <ul className="absolute left-0 w-full bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 mt-1 rounded-lg z-50 shadow-2xl divide-y dark:divide-slate-800">
                      {patientsList.map(pat => (
                        <li key={pat.id}>
                          <button
                            type="button"
                            onClick={() => selectPatientResult(pat)}
                            className="w-full px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-left text-slate-800 dark:text-white"
                          >
                            {pat.firstName} {pat.lastName} ({pat.phone})
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <div className="p-2.5 bg-slate-50 dark:bg-slate-850 rounded-lg">
                  <span className="text-[10px] text-slate-400 font-bold block mb-1">PATIENT FILE</span>
                  <span className="font-semibold text-slate-805 dark:text-white">
                    {selectedPatient?.firstName} {selectedPatient?.lastName}
                  </span>
                </div>
              )}

              {/* Date */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 block">VISIT DATE *</label>
                <input
                  type="date"
                  required
                  name="appointmentDate"
                  min={new Date().toISOString().split('T')[0]} // Block past dates
                  value={formFields.appointmentDate}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-slate-150 dark:border-slate-800 bg-transparent rounded-lg focus:outline-none dark:text-white"
                />
              </div>

              {/* Time Slots */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 block">TIME SLOT *</label>
                <select
                  name="timeSlot"
                  required
                  value={formFields.timeSlot}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-slate-150 dark:border-slate-800 bg-transparent rounded-lg focus:outline-none dark:text-white"
                >
                  {slots.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Diagnosis reasons & notes */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 block">REASON FOR VISIT</label>
                <input
                  type="text"
                  name="reason"
                  value={formFields.reason}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-slate-150 dark:border-slate-800 bg-transparent rounded-lg focus:outline-none dark:text-white"
                  placeholder="e.g. Chronic checkup review"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-405 block">DOCTOR INTERNAL CLINICAL NOTES</label>
                <textarea
                  name="notes"
                  rows={2}
                  value={formFields.notes}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-slate-150 dark:border-slate-805 bg-transparent rounded-lg focus:outline-none dark:text-white"
                ></textarea>
              </div>

              {/* Actions submit */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-800 text-slate-650 bg-transparent rounded-lg hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800 transition animate-fade-in"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition font-semibold"
                >
                  {selectedApp ? 'Update Timings' : 'Schedule Visit'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
