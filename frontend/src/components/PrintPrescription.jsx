import React from 'react';
import { Printer, X, Download } from 'lucide-react';

export default function PrintPrescription({ prescription, onClose }) {
  if (!prescription) return null;

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm no-print">
      <div className="bg-white text-slate-800 w-full max-w-3xl h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-8 flex flex-col justify-between">
        
        {/* Print Modal top action bar (hidden during physical print) */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 no-print">
          <h3 className="text-lg font-bold text-slate-900 font-display">Prescription Preview</h3>
          <div className="flex space-x-3">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition text-sm font-semibold shadow-md shadow-primary-500/10"
            >
              <Printer size={16} />
              <span>Print Prescription</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-650 hover:bg-slate-50 rounded-xl transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Prescription Document Sheet */}
        <div id="prescription-document" className="flex-1 p-8 bg-white border border-slate-200 rounded-xl print-card print-only">
          
          {/* Clinic Header */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6 mb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-950 font-display tracking-tight uppercase">
                GIRIJA CLINIC
              </h1>
              <p className="text-sm font-semibold text-slate-600">Premium Diagnostics & Family Practice</p>
              <p className="text-xs text-slate-500 mt-1">123 Healthcare Ave, Medical District • +1 (555) 019-2834</p>
            </div>
            <div className="text-right">
              <h2 className="text-lg font-bold text-slate-900">Dr. Girija Prasad</h2>
              <p className="text-xs text-slate-500">M.D. in Internal Medicine & Gastrology</p>
              <p className="text-xs text-slate-500 mt-1">Reg No: GCN-MED-092834</p>
            </div>
          </div>

          {/* Patient Info Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-lg mb-6 border border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 font-semibold block">PATIENT NAME</span>
              <span className="font-bold text-slate-900 text-sm">
                {prescription.patient?.firstName} {prescription.patient?.lastName}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">PATIENT ID</span>
              <span className="font-bold text-slate-900">{prescription.patient?.patientId}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">AGE / GENDER</span>
              <span className="font-bold text-slate-900">
                {prescription.patient?.age} Yrs / {prescription.patient?.gender}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">PRESCRIPTION DATE</span>
              <span className="font-bold text-slate-900">{formatDate(prescription.createdAt)}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-xs">
            <div className="md:col-span-2">
              <span className="text-xs font-bold text-slate-400 block mb-1">DIAGNOSIS / NOTES</span>
              <p className="text-sm text-slate-800 font-medium leading-relaxed">
                {prescription.diagnosis || 'General wellness check and checkup.'}
              </p>
            </div>
            <div>
              <div className="border border-slate-100 rounded-lg p-3 bg-slate-50/50">
                <span className="text-[10px] font-bold text-slate-400 block mb-0.5">VITALS</span>
                <p className="text-xs text-slate-700">
                  Height: <strong>{prescription.patient?.height || '-'} cm</strong><br/>
                  Weight: <strong>{prescription.patient?.weight || '-'} kg</strong><br/>
                  Blood Group: <strong>{prescription.patient?.bloodGroup || '-'} </strong>
                </p>
              </div>
            </div>
          </div>

          {/* Rx Symbol section */}
          <div className="mb-6 font-display text-3xl font-extrabold italic text-primary-500">Rx</div>

          {/* Medicines Table */}
          <table className="w-full text-left border-collapse text-xs mb-8">
            <thead>
              <tr className="border-b-2 border-slate-300 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-2.5">Medicine Name</th>
                <th className="py-2.5">Dosage</th>
                <th className="py-2.5 text-center">M - A - N</th>
                <th className="py-2.5">Duration</th>
                <th className="py-2.5 pb-2.5">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150">
              {prescription.medicines?.map((med, index) => (
                <tr key={index} className="text-slate-850 font-medium">
                  <td className="py-3 font-semibold text-slate-900">{med.name}</td>
                  <td className="py-3">{med.dosage || '1 Pill'}</td>
                  <td className="py-3 text-center text-sm tracking-widest font-bold">
                    {med.morning ? '1' : '0'}-{med.afternoon ? '1' : '0'}-{med.night ? '1' : '0'}
                  </td>
                  <td className="py-3">{med.duration || '5 Days'}</td>
                  <td className="py-3 text-slate-500 italic">{med.remarks || 'After food'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Doctor Advice / Follow-up */}
          <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block font-semibold mb-1">GENERAL ADVICE / RECOMMENDATIONS</span>
              <p className="text-slate-700 italic leading-relaxed">{prescription.advice || 'Drink plenty of water and rest well.'}</p>
            </div>
            {prescription.nextFollowUp && (
              <div className="text-right">
                <span className="text-slate-400 block font-semibold mb-1">NEXT FOLLOW-UP DATE</span>
                <span className="text-sm font-bold text-primary-600 bg-primary-50 dark:bg-slate-900 px-3 py-1 rounded-lg">
                  {formatDate(prescription.nextFollowUp)}
                </span>
              </div>
            )}
          </div>

          {/* Signature Sign */}
          <div className="mt-16 flex justify-between items-center text-xs">
            <span className="text-slate-405 italic">Generated digitally by Girija CMS Portal</span>
            <div className="text-center w-48 border-t border-slate-900 pt-2 font-semibold">
              Authorized Signature
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
