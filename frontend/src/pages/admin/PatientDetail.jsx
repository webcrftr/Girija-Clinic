import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useUI } from '../../context/UIContext';
import { db } from "../../firebase/firebase";
import api from '../../services/api';
import { 
  doc, 
  getDoc, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where,
  deleteDoc,
  serverTimestamp
} from "firebase/firestore";

import PrintPrescription from '../../components/PrintPrescription';
import { 
  Building, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Clock, 
  FileText, 
  FileCheck, 
  Plus, 
  ArrowLeft, 
  Trash2, 
  Download, 
  CheckCircle2, 
  Upload, 
  Activity, 
  Eye,
  UserCheck
} from 'lucide-react';

export default function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast, triggerConfirm } = useUI();

  // Core stats
  const [patient, setPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [reports, setReports] = useState([]);
  const [appointments, setAppointments] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('prescriptions');

  // Preview prescription print state
  const [printablePrescription, setPrintablePrescription] = useState(null);

  // New Prescription Form state
  const [isPrescModalOpen, setIsPrescModalOpen] = useState(false);
  const [newPresc, setNewPresc] = useState({
    diagnosis: '',
    advice: '',
    nextFollowUp: '',
    medicines: [{ name: '', dosage: '1 Pill', morning: true, afternoon: false, night: true, duration: '5 Days', remarks: 'After food' }]
  });

  // Report upload state
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportForm, setReportForm] = useState({ title: '', description: '' });
  const [reportFile, setReportFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchPatientDetails = async () => {
    setLoading(true);
    try {
      const patientRef = doc(db, "patients", id);
      const snap = await getDoc(patientRef);

      if (snap.exists()) {
        setPatient({
          id: snap.id,
          ...snap.data(),
        });
      } else {
        setPatient(null);
      }

      // Load prescriptions
      const prescriptionsRef = collection(db, "prescriptions");
      const prescQuery = query(prescriptionsRef, where("patientId", "==", id));
      const prescSnap = await getDocs(prescQuery);
      const prescList = prescSnap.docs.map(docSnap => {
        const data = docSnap.data();
        return {
          _id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : (data.createdAt || new Date().toISOString())
        };
      });
      prescList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPrescriptions(prescList);

      // Load reports
      const reportsRef = collection(db, "reports");
      const reportsQuery = query(reportsRef, where("patientId", "==", id));
      const reportsSnap = await getDocs(reportsQuery);
      const reportsList = reportsSnap.docs.map(docSnap => {
        const data = docSnap.data();
        return {
          _id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : (data.createdAt || new Date().toISOString())
        };
      });
      reportsList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setReports(reportsList);

      // Load appointments
      const appRef = collection(db, "appointments");
      const appQuery = query(appRef, where("patientId", "==", id));
      const appSnap = await getDocs(appQuery);
      const appList = appSnap.docs.map(docSnap => {
        const data = docSnap.data();
        return {
          _id: docSnap.id,
          ...data
        };
      });
      appList.sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));
      setAppointments(appList);

    } catch (error) {
      console.error(error);
      showToast("Failed to load patient profile details", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientDetails();
  }, [id]);

  // Handles adding medications in prescription form
  const addMedicineRow = () => {
    setNewPresc(prev => ({
      ...prev,
      medicines: [...prev.medicines, { name: '', dosage: '1 Pill', morning: true, afternoon: false, night: true, duration: '5 Days', remarks: 'After food' }]
    }));
  };

  const removeMedicineRow = (index) => {
    if (newPresc.medicines.length === 1) return;
    setNewPresc(prev => ({
      ...prev,
      medicines: prev.medicines.filter((_, idx) => idx !== index)
    }));
  };

  const handleMedChange = (index, field, value) => {
    setNewPresc(prev => {
      const updated = [...prev.medicines];
      updated[index][field] = value;
      return { ...prev, medicines: updated };
    });
  };

  const handleCreatePrescriptionSubmit = async (e) => {
    e.preventDefault();
    if (!newPresc.diagnosis) {
      showToast('Diagnosis summary is required', 'error');
      return;
    }
    const emptyMed = newPresc.medicines.some(m => !m.name.trim());
    if (emptyMed) {
      showToast('Please add names for all medicines', 'error');
      return;
    }

    try {
      await addDoc(collection(db, "prescriptions"), {
        patientId: id,
        diagnosis: newPresc.diagnosis,
        advice: newPresc.advice,
        nextFollowUp: newPresc.nextFollowUp,
        medicines: newPresc.medicines,
        createdAt: serverTimestamp()
      });

      showToast("Prescription generated successfully", "success");
      setIsPrescModalOpen(false);
      setNewPresc({
        diagnosis: "",
        advice: "",
        nextFollowUp: "",
        medicines: [
          {
            name: "",
            dosage: "1 Pill",
            morning: true,
            afternoon: false,
            night: true,
            duration: "5 Days",
            remarks: "After food"
          }
        ]
      });
      fetchPatientDetails();
    } catch (error) {
      console.error("Prescription saving error:", error);
      showToast("Failed to generate prescription", "error");
    }
  };

  const handleReportUploadSubmit = async (e) => {
    e.preventDefault();
    if (!reportFile) {
      showToast('Please attach a diagnostic file', 'error');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', reportFile);
      const res = await api.post('/api/reports/upload-cloudinary', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const { secure_url, public_id } = res.data;

      await addDoc(collection(db, "reports"), {
        patientId: id,
        title: reportForm.title,
        description: reportForm.description,
        fileURL: secure_url,
        fileUrl: secure_url, // For compatibility
        publicId: public_id,
        createdAt: serverTimestamp()
      });

      showToast('Diagnostic report uploaded successfully', 'success');
      setIsReportModalOpen(false);
      setReportForm({ title: '', description: '' });
      setReportFile(null);
      fetchPatientDetails();
    } catch (err) {
      console.log("UPLOAD ERROR:", err);
      console.error("FULL ERROR:", err);
      showToast(err.message || 'Failed to upload report file.', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteReport = async (reportId) => {
    const confirm = await triggerConfirm({
      title: 'Delete Lab Report',
      message: 'Are you sure you want to delete this lab report? This will remove it from clinic databases.',
      confirmText: 'Delete Report',
      cancelText: 'Cancel'
    });

    if (confirm) {
      try {
        const reportRef = doc(db, "reports", reportId);
        const snap = await getDoc(reportRef);
        if (snap.exists()) {
          const reportData = snap.data();
          if (reportData.publicId) {
            await api.post('/api/reports/delete-cloudinary', { publicId: reportData.publicId }).catch(err => {
              console.warn("Cloudinary file delete error/already deleted:", err);
            });
          }
        }
        await deleteDoc(reportRef);
        showToast('Report deleted successfully', 'success');
        fetchPatientDetails();
      } catch (err) {
        console.error(err);
        showToast('Failed to delete report.', 'error');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center animate-pulse">
        <span className="text-sm font-semibold text-slate-400">Loading patient profile indices...</span>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="text-center p-8 bg-white border rounded-2xl">
        <p className="text-sm font-bold text-red-500">Patient not found</p>
        <Link to="/admin/patients" className="mt-4 inline-block text-xs font-semibold text-primary-500">
          Back to directory
        </Link>
      </div>
    );
  }

  const calculateAge = (dob) => {
  if (!dob) return "-";

  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

  return (
    <div className="space-y-6 font-sans text-left relative z-10 select-none">
      
      {/* Top Breadcrumb link */}
      <div>
        <Link to="/admin/patients" className="flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition">
          <ArrowLeft size={14} />
          <span>Back to Patients Directory</span>
        </Link>
      </div>

      {/* Main Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Demographics Info (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm text-center relative overflow-hidden">
            <span className="absolute top-4 right-4 bg-primary-50 dark:bg-primary-950/20 text-primary-650 dark:text-primary-400 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">
              {patient.patientId}
            </span>

            {/* Photo Avatar */}
            <div className="h-24 w-24 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex items-center justify-center border-2 border-primary-100 mx-auto mt-4 text-3xl font-display font-semibold select-none shadow">
              {patient.photo ? (
                <img src={patient.photo} alt="Avatar profile" className="h-full w-full object-cover" />
              ) : (
                <span>{patient.firstName[0]}{patient.lastName[0]}</span>
              )}
            </div>

            <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white mt-4">
              {patient.firstName} {patient.lastName}
            </h2>
            <p className="text-xs text-slate-400 font-semibold mt-0.5">DOB: {new Date(patient.dob).toLocaleDateString()}</p>

            {/* Quick stats grid */}
            <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-[10px]">
              <div>
                <span className="text-slate-400 block font-semibold">BLOOD GROUP</span>
                <span className="font-bold text-slate-900 dark:text-white text-xs">{patient.bloodGroup}</span>
              </div>
              <div className="border-x border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block font-semibold">AGE</span>
                <span className="font-bold text-slate-900 dark:text-white text-xs">{calculateAge(patient.dob)} Yrs</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">GENDER</span>
                <span className="font-bold text-slate-900 dark:text-white text-xs">{patient.gender}</span>
              </div>
            </div>

            {/* Demographics tables */}
            <ul className="mt-8 space-y-4 text-xs text-left">
              <li className="flex items-center space-x-3 text-slate-650 dark:text-slate-350">
                <Phone size={14} className="text-slate-400 shrink-0" />
                <span className="font-mono font-semibold">{patient.phone}</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-650 dark:text-slate-355">
                <Mail size={14} className="text-slate-400 shrink-0" />
                <span className="truncate">{patient.email || 'No email records'}</span>
              </li>
              <li className="flex items-start space-x-3 text-slate-650 dark:text-slate-355">
                <MapPin size={14} className="text-slate-400 mt-0.5 shrink-0" />
                <span>{patient.address || 'No residential address'}</span>
              </li>
            </ul>
          </div>

          {/* Emergency Contacts Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm text-left">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Emergency Contact</h3>
            {patient.emergencyContact?.name ? (
              <div className="space-y-2 text-xs">
                <p className="font-semibold text-slate-850 dark:text-white">
                  {patient.emergencyContact.name}{' '}
                  <span className="text-[10px] text-slate-400 font-semibold font-sans">
                    ({patient.emergencyContact.relation || 'Relation'})
                  </span>
                </p>
                <p className="font-mono text-slate-650 dark:text-slate-350 font-bold">{patient.emergencyContact.phone}</p>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No emergency contacts logged.</p>
            )}
          </div>
        </div>

        {/* Right Dashboard Details (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Vitals overview bar */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block font-semibold">HEIGHT (CM)</span>
              <strong className="text-slate-800 dark:text-white text-sm">{patient.height || '-'} cm</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">WEIGHT (KG)</span>
              <strong className="text-slate-800 dark:text-white text-sm">{patient.weight || '-'} kg</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">ALLERGIES</span>
              <span className="text-slate-800 dark:text-white text-xs truncate max-w-[120px] block font-semibold">
                {Array.isArray(patient.allergies)
                ? patient.allergies.join(", ")
                : patient.allergies || 'None'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">PAST CONDITIONS</span>
              <span className="text-slate-805 dark:text-white text-xs truncate max-w-[120px] block font-semibold">
                {Array.isArray(patient.allergies)
                ? patient.allergies.join(", ")
                : patient.allergies || "None"}
              </span>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="border-b border-slate-150 dark:border-slate-800 flex space-x-6 text-sm font-medium">
            {[
              { id: 'prescriptions', name: 'Prescriptions', icon: FileText },
              { id: 'reports', name: 'Diagnostic Reports', icon: FileCheck },
              { id: 'appointments', name: 'Visits Timeline', icon: Calendar }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 pb-3 border-b-2 font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-500 font-bold'
                      : 'border-transparent text-slate-400 hover:text-slate-805'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* Tab content panel */}
          <div className="pt-2">
            
            {/* Tab 1: Prescriptions */}
            {activeTab === 'prescriptions' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recommendations Hist</h4>
                  <button
                    onClick={() => setIsPrescModalOpen(true)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-primary-100 hover:bg-primary-200 text-primary-709 rounded-lg font-semibold text-xs dark:bg-primary-950/40 dark:text-primary-400 dark:hover:bg-primary-950 transition"
                  >
                    <Plus size={14} />
                    <span>Create Prescription</span>
                  </button>
                </div>

                {prescriptions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {prescriptions.map((pr) => (
                      <div key={pr._id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-808 p-5 rounded-xl shadow-sm text-xs relative flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <span className="text-[10px] text-slate-400 font-bold block">
                              {new Date(pr.createdAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}
                            </span>
                            <span className="px-2 py-0.5 bg-slate-50 dark:bg-slate-800 rounded font-bold font-mono text-[9px]">
                              Rx ID
                            </span>
                          </div>
                          <p className="font-semibold text-slate-850 dark:text-white line-clamp-2">
                            Diagnosis: <strong>{pr.diagnosis}</strong>
                          </p>
                          <p className="text-[10px] text-slate-405 mt-2 line-clamp-1">
                            Medicines: {pr.medicines.map(m => m.name).join(", ") || 'No medicines prescribed'}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-50 dark:border-slate-800 flex justify-end">
                          <button
                            onClick={() => setPrintablePrescription(pr)}
                            className="flex items-center space-x-1 text-primary-500 hover:text-primary-650 font-bold"
                          >
                            <Eye size={12} />
                            <span>Preview Rx</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-xs text-slate-400 border border-dashed rounded-xl">
                    No prescription history registered for this patient.
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Diagnostic Lab Reports */}
            {activeTab === 'reports' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Attached Medical Files</h4>
                  <button
                    onClick={() => setIsReportModalOpen(true)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-primary-100 hover:bg-primary-200 text-primary-709 rounded-lg font-semibold text-xs dark:bg-primary-950/40 dark:text-primary-400 dark:hover:bg-primary-950 transition"
                  >
                    <Upload size={14} />
                    <span>Upload Report Scan</span>
                  </button>
                </div>

                {reports.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reports.map((rep) => (
                      <div key={rep._id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-xl shadow-xs text-xs flex items-center justify-between">
                        <div className="text-left space-y-1.5 min-w-0 pr-4">
                          <p className="font-bold text-slate-850 dark:text-white truncate">{rep.title}</p>
                          <p className="text-[10px] text-slate-400 line-clamp-1">{rep.description || 'No description provided'}</p>
                          <span className="text-[9px] font-semibold text-slate-400 block font-mono">
                            Uploaded: {new Date(rep.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex space-x-2 shrink-0">
                          <a
                            href={rep.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-slate-50 hover:bg-primary-50 hover:text-primary-500 rounded-lg text-slate-400 dark:bg-slate-800"
                            title="Open File Document"
                          >
                            <Download size={14} />
                          </a>
                          <button
                            onClick={() => handleDeleteReport(rep._id)}
                            className="p-2 bg-slate-50 hover:bg-red-50 hover:text-red-500 rounded-lg text-slate-400 dark:bg-slate-800"
                            title="Delete File"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-xs text-slate-400 border border-dashed rounded-xl">
                    No diagnostic laboratory files attached to profile.
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Appointments */}
            {activeTab === 'appointments' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Scheduled Queues Log</h4>
                {appointments.length > 0 ? (
                  <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase py-2.5 px-4 h-10 bg-slate-50/50">
                          <th className="pl-4 py-2">Consultation Date</th>
                          <th className="py-2">Time Slot</th>
                          <th className="py-2">Reason</th>
                          <th className="py-2 text-right pr-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 dark:divide-slate-804">
                        {appointments.map(app => (
                          <tr key={app._id} className="text-slate-700 dark:text-slate-350">
                            <td className="pl-4 py-3 font-semibold text-slate-900 dark:text-white">
                              {new Date(app.appointmentDate).toLocaleDateString('en-US', { dateStyle: 'medium' })}
                            </td>
                            <td className="py-3 font-medium">{app.timeSlot}</td>
                            <td className="py-3 max-w-[150px] truncate">{app.reason}</td>
                            <td className="py-3 text-right pr-4">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                app.status === 'Completed' 
                                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20' 
                                  : app.status === 'Cancelled'
                                  ? 'bg-red-50 text-red-700 dark:bg-red-950/20'
                                  : 'bg-blue-50 text-blue-705 dark:bg-blue-950/20'
                              }`}>
                                {app.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-8 text-center text-xs text-slate-400 border border-dashed rounded-xl">
                    No Scheduled visits linked to files.
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Global Preview Modal */}
      {printablePrescription && (
        <PrintPrescription
          prescription={printablePrescription}
          onClose={() => setPrintablePrescription(null)}
        />
      )}

      {/* WRITE PRESCRIPTION MODAL */}
      {isPrescModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-hidden select-none">
          <div className="bg-white dark:bg-slate-905 w-full max-w-4xl h-[90vh] overflow-y-auto rounded-3xl p-8 border border-slate-100 dark:border-slate-850 shadow-2xl flex flex-col justify-between">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800 mb-6Shared">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">Generate Medicine Chart</h3>
              <button
                onClick={() => setIsPrescModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePrescriptionSubmit} className="space-y-6 flex-grow">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-left">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 block pb-0.5">DIAGNOSIS SUMMARY *</label>
                  <input
                    type="text"
                    required
                    value={newPresc.diagnosis}
                    onChange={(e) => setNewPresc(prev => ({ ...prev, diagnosis: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-150 dark:border-slate-850 bg-transparent rounded-lg focus:outline-none focus:border-primary-500 dark:text-white"
                    placeholder="e.g. Hypertension, Gastrology pain issues"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 block pb-0.5">NEXT FOLLOW-UP DATE (OPTIONAL)</label>
                  <input
                    type="date"
                    value={newPresc.nextFollowUp}
                    onChange={(e) => setNewPresc(prev => ({ ...prev, nextFollowUp: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-150 dark:border-slate-850 bg-transparent rounded-lg focus:outline-none focus:border-primary-500 dark:text-white"
                  />
                </div>
              </div>

              {/* Medicine rows container */}
              <div className="space-y-3.5 text-left">
                <div className="flex justify-between items-center pb-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Medications Details</span>
                  <button
                    type="button"
                    onClick={addMedicineRow}
                    className="text-[11px] font-bold text-primary-500 hover:text-primary-650 flex items-center space-x-1"
                  >
                    <span>+ Add Medicine</span>
                  </button>
                </div>

                {newPresc.medicines.map((med, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs bg-slate-50 dark:bg-slate-850 p-4 rounded-xl items-center">
                    <div className="md:col-span-4 space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 block">MEDICINE NAME</label>
                      <input
                        type="text"
                        required
                        value={med.name}
                        onChange={(e) => handleMedChange(index, 'name', e.target.value)}
                        className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-805 rounded-lg focus:outline-none dark:text-white"
                        placeholder="Paracetamol"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 block">DOSAGE</label>
                      <input
                        type="text"
                        value={med.dosage}
                        onChange={(e) => handleMedChange(index, 'dosage', e.target.value)}
                        className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-805 rounded-lg focus:outline-none dark:text-white"
                        placeholder="1 Pill"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-[9px] font-bold text-slate-450 block mb-1">M - A - N SCHEDULE</label>
                      <div className="flex items-center space-x-2 py-0.5">
                        <label className="flex items-center space-x-1 cursor-pointer">
                          <input type="checkbox" checked={med.morning} onChange={(e) => handleMedChange(index, 'morning', e.target.checked)} className="h-4 w-4 rounded text-primary-500 bg-transparent border-slate-300" />
                          <span className="text-[10px] font-bold">M</span>
                        </label>
                        <label className="flex items-center space-x-1 cursor-pointer">
                          <input type="checkbox" checked={med.afternoon} onChange={(e) => handleMedChange(index, 'afternoon', e.target.checked)} className="h-4 w-4 rounded text-primary-500 bg-transparent border-slate-300" />
                          <span className="text-[10px] font-bold">A</span>
                        </label>
                        <label className="flex items-center space-x-1 cursor-pointer">
                          <input type="checkbox" checked={med.night} onChange={(e) => handleMedChange(index, 'night', e.target.checked)} className="h-4 w-4 rounded text-primary-500 bg-transparent border-slate-300" />
                          <span className="text-[10px] font-bold">N</span>
                        </label>
                      </div>
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 block">DURATION</label>
                      <input
                        type="text"
                        value={med.duration}
                        onChange={(e) => handleMedChange(index, 'duration', e.target.value)}
                        className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-805 rounded-lg focus:outline-none dark:text-white"
                        placeholder="5 Days"
                      />
                    </div>
                    <div className="md:col-span-2 flex space-x-2 pt-4">
                      {newPresc.medicines.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMedicineRow(index)}
                          className="px-2.5 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-1 text-xs text-left">
                <label className="text-[10px] font-bold text-slate-400 block">DOCTOR ADVICES / INSTRUCTIONS</label>
                <textarea
                  rows={2}
                  value={newPresc.advice}
                  onChange={(e) => setNewPresc(prev => ({ ...prev, advice: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-150 dark:border-slate-850 bg-transparent rounded-lg focus:outline-none focus:border-primary-500 dark:text-white"
                  placeholder="Drink plenty of warm water, take light food diets..."
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsPrescModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-800 text-slate-650 bg-transparent rounded-lg hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition font-semibold"
                >
                  Generate Rx
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* REPORT UPLOAD MODAL */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-hidden select-none">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-2xl flex flex-col">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display mb-4">Upload Lab Report Scan</h3>
            
            <form onSubmit={handleReportUploadSubmit} className="space-y-4 text-xs text-left">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 block">REPORT TITLE *</label>
                <input
                  type="text"
                  required
                  value={reportForm.title}
                  onChange={(e) => setReportForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-150 dark:border-slate-805 bg-transparent rounded-lg focus:outline-none focus:border-primary-505 dark:text-white"
                  placeholder="e.g. Complete Blood Count (CBC)"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 block">DESCRIPTION</label>
                <textarea
                  rows={2}
                  value={reportForm.description}
                  onChange={(e) => setReportForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-150 dark:border-slate-805 bg-transparent rounded-lg focus:outline-none focus:border-primary-505 dark:text-white"
                  placeholder="Provide diagnostic values or remarks..."
                ></textarea>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 block">SELECT DIAGNOSTIC FILE (IMAGE OR PDF) *</label>
                <input
                  type="file"
                  required
                  accept="image/*,application/pdf"
                  onChange={(e) => setReportFile(e.target.files[0])}
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-primary-50 file:text-primary-700 dark:file:bg-slate-800 dark:file:text-slate-350 cursor-pointer"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-800 text-slate-650 bg-transparent rounded-lg hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-slate-400 text-white rounded-lg transition font-semibold"
                >
                  {uploading ? 'Uploading Scan...' : 'Upload File'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
