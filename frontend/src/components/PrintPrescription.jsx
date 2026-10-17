import React from 'react';
import { Printer, X } from 'lucide-react';
import { useUI } from '../context/UIContext';

export default function PrintPrescription({ prescription, onClose }) {
  const { settings } = useUI();

  if (!prescription) return null;

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return '—';
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return '—';
    }
  };

  const calculateAge = (dob) => {
    if (!dob) return null;
    try {
      const birthDate = new Date(dob);
      if (isNaN(birthDate.getTime())) return null;
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age > 0 ? age : null;
    } catch {
      return null;
    }
  };

  const formatAgeGender = (patient) => {
    if (!patient) return '—';
    let ageStr = null;
    if (patient.age !== undefined && patient.age !== null && patient.age !== '' && !isNaN(patient.age)) {
      ageStr = `${patient.age} Yrs`;
    } else if (patient.dob) {
      const calculated = calculateAge(patient.dob);
      if (calculated !== null) {
        ageStr = `${calculated} Yrs`;
      }
    }

    const genderStr = patient.gender && patient.gender.trim() ? patient.gender : null;

    if (ageStr && genderStr) return `${ageStr} / ${genderStr}`;
    if (ageStr) return ageStr;
    if (genderStr) return genderStr;
    return '—';
  };

  const clinicAddress = settings?.address || 'Shop No. 5, Building No. 10, Sector 4, Shanti Garden, Opposite MBMC Garden, Mira Road (East), Thane – 401107';
  const doctorRegNo = settings?.doctorRegNo || 'I-68086-A';
  const doctorName = settings?.doctorName || 'Dr. Ombeer R. Pal';
  const clinicPhone = settings?.phone || '+91 99695 05111';
  const clinicName = settings?.clinicName || 'Girija Clinic';

  const patient = prescription.patient || {};
  const patientFullName = `${patient.firstName || prescription.patientName || 'Patient'} ${patient.lastName || ''}`.trim();
  const patientId = patient.patientId || prescription.patientId || '—';

  return (
    <div className="prescription-modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6">
      <div className="prescription-modal-container bg-white text-slate-800 w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col justify-between">
        
        {/* Print Modal top action bar (hidden during print) */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 no-print">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display">Prescription Preview</h3>
            <p className="text-xs text-slate-400">Review prescription details below before generating print document.</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center space-x-2 px-5 py-2.5 bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white rounded-xl transition text-sm font-semibold shadow-md shadow-primary-500/20 cursor-pointer"
            >
              <Printer size={16} />
              <span>Print Prescription</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer"
              title="Close Preview"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Prescription Document Sheet (This alone prints) */}
        <div id="prescription-document" className="flex-1 p-6 sm:p-8 bg-white border border-slate-200 rounded-xl">
          
          {/* Clinic Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-slate-900 pb-6 mb-6 gap-4">
            <div className="max-w-md">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-display tracking-tight uppercase">
                {clinicName}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-emerald-800 mt-0.5">
                Ayurvedic Clinic & Panchakarma Centre • Healthcare Practice
              </p>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {clinicAddress} • Tel: {clinicPhone}
              </p>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">{doctorName}</h2>
              <p className="text-xs text-slate-600 font-medium">MD (Ayurveda) • Senior Panchakarma & Musculoskeletal Specialist</p>
              <p className="text-xs font-semibold text-slate-800 mt-1">Reg No: {doctorRegNo}</p>
            </div>
          </div>

          {/* Patient Info Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-lg mb-6 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 font-semibold block text-[11px] uppercase tracking-wider">Patient Name</span>
              <span className="font-bold text-slate-900 text-sm block mt-0.5">
                {patientFullName}
              </span>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block text-[11px] uppercase tracking-wider">Patient ID</span>
              <span className="font-bold text-slate-900 font-mono text-sm block mt-0.5">{patientId}</span>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block text-[11px] uppercase tracking-wider">Age / Gender</span>
              <span className="font-bold text-slate-900 block mt-0.5">
                {formatAgeGender(patient)}
              </span>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block text-[11px] uppercase tracking-wider">Prescription Date</span>
              <span className="font-bold text-slate-900 block mt-0.5">{formatDate(prescription.createdAt)}</span>
            </div>
          </div>

          {/* Clinical Notes & Vitals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-xs">
            <div className="md:col-span-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Diagnosis & Clinical Notes</span>
              <div className="p-3 bg-slate-50/70 rounded-lg border border-slate-100 min-h-[60px]">
                <p className="text-xs sm:text-sm text-slate-850 font-medium leading-relaxed">
                  {prescription.diagnosis || 'General wellness & routine clinical examination.'}
                </p>
              </div>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Vitals & Physical Stats</span>
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/70 space-y-1">
                <p className="text-xs text-slate-700 flex justify-between">
                  <span>Height:</span> <strong>{patient.height ? `${patient.height} cm` : '—'}</strong>
                </p>
                <p className="text-xs text-slate-700 flex justify-between">
                  <span>Weight:</span> <strong>{patient.weight ? `${patient.weight} kg` : '—'}</strong>
                </p>
                <p className="text-xs text-slate-700 flex justify-between">
                  <span>Blood Group:</span> <strong>{patient.bloodGroup || '—'}</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Rx Symbol */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="font-display text-2xl sm:text-3xl font-extrabold italic text-emerald-800">℞</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Prescribed Medications</span>
          </div>

          {/* Medicines Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b-2 border-slate-900 bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-2.5 px-3 w-8">#</th>
                  <th className="py-2.5 px-3">Medicine Name</th>
                  <th className="py-2.5 px-3">Dosage</th>
                  <th className="py-2.5 px-3 text-center">Schedule (M - A - N)</th>
                  <th className="py-2.5 px-3">Duration</th>
                  <th className="py-2.5 px-3">Instructions / Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {prescription.medicines && prescription.medicines.length > 0 ? (
                  prescription.medicines.map((med, index) => (
                    <tr key={index} className="text-slate-850 font-medium">
                      <td className="py-3 px-3 text-slate-400 font-mono">{index + 1}</td>
                      <td className="py-3 px-3 font-bold text-slate-950 text-xs sm:text-sm">{med.name}</td>
                      <td className="py-3 px-3">{med.dosage || '1 Pill'}</td>
                      <td className="py-3 px-3 text-center font-mono font-bold tracking-widest text-slate-900">
                        {med.morning ? '1' : '0'} – {med.afternoon ? '1' : '0'} – {med.night ? '1' : '0'}
                      </td>
                      <td className="py-3 px-3 font-semibold">{med.duration || '—'}</td>
                      <td className="py-3 px-3 text-slate-600 italic">{med.remarks || 'As directed'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-slate-400 italic">
                      No specific medicines recorded on this prescription.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Doctor Advice / Follow-up */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-200 text-xs print-avoid-break">
            <div>
              <span className="text-slate-500 block font-bold uppercase tracking-wider text-[11px] mb-1">
                Dietary & General Recommendations
              </span>
              <p className="text-slate-800 italic leading-relaxed bg-slate-50/50 p-2.5 rounded border border-slate-100">
                {prescription.advice || 'Follow light, wholesome Ayurvedic diet, drink warm water, and take adequate rest.'}
              </p>
            </div>
            <div className="md:text-right">
              <span className="text-slate-500 block font-bold uppercase tracking-wider text-[11px] mb-1">
                Next Follow-Up Date
              </span>
              <span className="inline-block text-xs sm:text-sm font-bold text-emerald-900 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 mt-0.5">
                {prescription.nextFollowUp ? formatDate(prescription.nextFollowUp) : 'On SOS / As required'}
              </span>
            </div>
          </div>

          {/* Signature Block */}
          <div className="mt-14 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-end text-xs print-avoid-break gap-6">
            <div className="text-slate-400 text-[11px]">
              <p>Electronically generated clinical document</p>
              <p className="font-mono mt-0.5">Generated via {clinicName} Management System</p>
            </div>
            <div className="text-center w-56">
              <div className="border-b border-slate-900 pb-1 mb-1.5 h-10 flex items-end justify-center">
                <span className="text-xs text-slate-400 font-serif italic">[Doctor's Stamp / Signature]</span>
              </div>
              <p className="font-bold text-slate-900 text-xs">{doctorName}</p>
              <p className="text-[10px] text-slate-500">Reg No: {doctorRegNo}</p>
              <p className="text-[10px] text-slate-400 font-medium">Authorized Practitioner</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
