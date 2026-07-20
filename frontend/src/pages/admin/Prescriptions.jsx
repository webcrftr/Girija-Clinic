import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUI } from '../../context/UIContext';
import { db } from '../../firebase/firebase';
import { collection, getDocs, getDoc, doc, deleteDoc } from 'firebase/firestore';
import PrintPrescription from '../../components/PrintPrescription';
import { FileText, Search, Eye, Trash2, Calendar, User, HeartPulse } from 'lucide-react';

export default function Prescriptions() {
  const { showToast, triggerConfirm } = useUI();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchVal, setSearchVal] = useState('');
  
  // Print prescription modal preview
  const [printablePrescription, setPrintablePrescription] = useState(null);

  const fetchAllPrescriptions = async () => {
    setLoading(true);
    try {
      // Fetch patients first to build a mapper mapping id -> details
      const patientsSnap = await getDocs(collection(db, "patients"));
      const patientsMap = {};
      patientsSnap.docs.forEach(docSnap => {
        patientsMap[docSnap.id] = { id: docSnap.id, ...docSnap.data() };
      });

      // Fetch prescriptions
      const prescSnap = await getDocs(collection(db, "prescriptions"));
      const list = prescSnap.docs.map(docSnap => {
        const data = docSnap.data();
        return {
          _id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : (data.createdAt || new Date().toISOString()),
          patient: patientsMap[data.patientId] || null
        };
      });
      
      // Sort by createdAt desc
      list.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPrescriptions(list);
    } catch (err) {
      console.error(err);
      showToast('Failed to load prescriptions list from clinical records.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPrescriptions();
  }, []);

  const handleDeletePrescription = async (prescId) => {
    const confirm = await triggerConfirm({
      title: 'Delete Prescription Record',
      message: 'Are you sure you want to delete this prescription? This action will permanently remove it from database logs.',
      confirmText: 'Delete Record',
      cancelText: 'Cancel'
    });

    if (confirm) {
      try {
        await deleteDoc(doc(db, "prescriptions", prescId));
        showToast('Prescription record deleted successfully', 'success');
        fetchAllPrescriptions();
      } catch (err) {
        console.error(err);
        showToast('Failed to delete prescription.', 'error');
      }
    }
  };

  // Preview rx details
  const handlePreviewRx = async (prescId) => {
    try {
      const snap = await getDoc(doc(db, "prescriptions", prescId));
      if (snap.exists()) {
        const data = snap.data();
        // Load patient details for this prescription
        let patientData = null;
        if (data.patientId) {
          const patSnap = await getDoc(doc(db, "patients", data.patientId));
          if (patSnap.exists()) {
            patientData = { id: patSnap.id, ...patSnap.data() };
          }
        }
        setPrintablePrescription({
          _id: snap.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : (data.createdAt || new Date().toISOString()),
          patient: patientData
        });
      } else {
        showToast('Prescription not found.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to open prescription preview.', 'error');
    }
  };

  // Client side search filter logic (filtering on Patient Name or Patient ID or Diagnosis)
  const filteredPrescriptions = prescriptions.filter(presc => {
    const term = searchVal.toLowerCase();
    const patientName = `${presc.patient?.firstName || ''} ${presc.patient?.lastName || ''}`.toLowerCase();
    const patientId = (presc.patient?.patientId || '').toLowerCase();
    const diagnosis = (presc.diagnosis || '').toLowerCase();
    return patientName.includes(term) || patientId.includes(term) || diagnosis.includes(term);
  });

  return (
    <div className="space-y-6 font-sans text-left select-none relative z-10">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-display flex items-center space-x-2">
            <FileText className="text-primary-500" size={24} />
            <span>Prescriptions Portal</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Manage and audit clinical prescriptions and medications chart records clinic-wide.</p>
        </div>
      </div>

      {/* Query Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-xl shadow-sm">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search patient name, ID or diagnosis..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-100 text-slate-700 placeholder-slate-400 rounded-lg focus:outline-none focus:border-primary-400 dark:bg-slate-800 dark:border-slate-800 dark:text-white dark:placeholder-slate-500 transition"
          />
        </div>
      </div>

      {/* Prescriptions List Table */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-20 bg-white dark:bg-slate-900 rounded-2xl animate-pulse border border-slate-100 dark:border-slate-850"></div>)}
        </div>
      ) : filteredPrescriptions.length > 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs select-none">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase py-3 px-6 h-12 bg-slate-50/50 dark:bg-slate-900">
                  <th className="pl-6 py-3">Prescription Date</th>
                  <th className="py-3">Patient ID</th>
                  <th className="py-3">Patient Name</th>
                  <th className="py-3">Diagnosis</th>
                  <th className="py-3">Medicines Count</th>
                  <th className="py-3 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {filteredPrescriptions.map((pr) => (
                  <tr key={pr._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                    <td className="pl-6 py-4 font-semibold text-slate-900 dark:text-white">
                      {new Date(pr.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="py-4 font-bold text-primary-500 font-mono">
                      {pr.patient?.patientId ? (
                        <Link to={`/admin/patients/${pr.patient.id}`}>{pr.patient.patientId}</Link>
                      ) : (
                        <span className="text-red-500 font-normal">Removed</span>
                      )}
                    </td>
                    <td className="py-4">
                      {pr.patient ? (
                        <div className="flex items-center space-x-2">
                          <User size={14} className="text-slate-400" />
                          <span className="font-semibold text-slate-800 dark:text-white">
                            {pr.patient.firstName} {pr.patient.lastName}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">Unknown Patient</span>
                      )}
                    </td>
                    <td className="py-4 font-medium text-slate-600 dark:text-slate-450 max-w-[200px] truncate">
                      {pr.diagnosis}
                    </td>
                    <td className="py-4 font-bold text-center">
                      <span className="px-2 py-0.5 rounded bg-primary-50 text-primary-700 dark:bg-primary-950/20 dark:text-primary-400">
                        {pr.medicines?.length || 0}
                      </span>
                    </td>
                    <td className="py-4 text-right pr-6 space-x-2">
                      <button
                        onClick={() => handlePreviewRx(pr._id)}
                        className="inline-flex p-1.5 bg-slate-50 hover:bg-primary-50 hover:text-primary-500 rounded-lg text-slate-500 dark:bg-slate-800 dark:hover:bg-primary-950 dark:text-slate-450 transition"
                        title="Preview Rx"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => handleDeletePrescription(pr._id)}
                        className="inline-flex p-1.5 bg-slate-50 hover:bg-red-50 hover:text-red-500 rounded-lg text-slate-500 dark:bg-slate-800 dark:hover:bg-red-950 dark:text-slate-455 transition"
                        title="Delete Record"
                      >
                        <Trash2 size={14} />
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
          <HeartPulse size={48} className="text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-700 dark:text-white mt-4">No prescription logs found.</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">Create a prescription under patient files details view, or adjust search query values.</p>
        </div>
      )}

      {/* Global Preview Modal */}
      {printablePrescription && (
        <PrintPrescription
          prescription={printablePrescription}
          onClose={() => setPrintablePrescription(null)}
        />
      )}

    </div>
  );
}
