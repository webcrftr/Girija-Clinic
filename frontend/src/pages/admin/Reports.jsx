import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUI } from '../../context/UIContext';
import { db } from '../../firebase/firebase';
import api from '../../services/api';
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  addDoc, 
  doc, 
  getDoc, 
  deleteDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { 
  FolderHeart, 
  Search, 
  User, 
  FileCheck, 
  Upload, 
  Download, 
  Trash2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function Reports() {
  const navigate = useNavigate();
  const { showToast, triggerConfirm } = useUI();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Selected patient details for reports view
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [reports, setReports] = useState([]);
  const [reportsLoading, setReportsLoading] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [reportTitle, setReportTitle] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [reportFile, setReportFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Fetch patients directory list
  const getPatients = async () => {
    setLoading(true);
    try {
      const patientsRef = collection(db, "patients");
      const snap = await getDocs(patientsRef);
      let list = snap.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
      if (search.trim()) {
        const val = search.toLowerCase();
        list = list.filter(pat => 
          (pat.firstName + ' ' + pat.lastName).toLowerCase().includes(val) ||
          (pat.patientId || '').toLowerCase().includes(val) ||
          (pat.phone || '').toLowerCase().includes(val)
        );
      }
      setPatients(list.slice(0, 15));
    } catch (err) {
      console.error(err);
      showToast('Failed to load patient index databases.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPatients();
  }, [search]);

  // Load selected patient reports
  const fetchPatientReports = async (patient) => {
    setSelectedPatient(patient);
    setReportsLoading(true);
    try {
      const reportsRef = collection(db, "reports");
      const q = query(reportsRef, where("patientId", "==", patient.id));
      const snap = await getDocs(q);
      const list = snap.docs.map(docSnap => {
        const data = docSnap.data();
        return {
          _id: docSnap.id,
          ...data,
          fileUrl: data.fileURL || data.fileUrl,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : (data.createdAt || new Date().toISOString())
        };
      });
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setReports(list);
    } catch (err) {
      console.error(err);
      showToast('Failed to retrieve diagnostic reports for patient.', 'error');
    } finally {
      setReportsLoading(false);
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!reportFile) {
      showToast('Please attach a diagnostic file scan.', 'error');
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
        patientId: selectedPatient.id,
        title: reportTitle,
        description: reportDescription,
        fileURL: secure_url,
        publicId: public_id,
        createdAt: serverTimestamp()
      });

      showToast('Medical scan report uploaded successfully!', 'success');
      setIsUploadModalOpen(false);
      setReportTitle('');
      setReportDescription('');
      setReportFile(null);
      // Refresh list
      fetchPatientReports(selectedPatient);
    } catch (err) {
      console.log("UPLOAD ERROR:", err);
      console.error(err);
      showToast('Failed to upload report file.', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteReport = async (reportId) => {
    const confirm = await triggerConfirm({
      title: 'Remove Diagnostic Scan',
      message: 'Are you sure you want to permanently delete this lab scan report from clinic database registries?',
      confirmText: 'Delete Scan',
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
        showToast('Scan report deleted successfully', 'success');
        // Refresh list
        fetchPatientReports(selectedPatient);
      } catch (err) {
        console.error(err);
        showToast('Failed to delete reports scan.', 'error');
      }
    }
  };

  return (
    <div className="space-y-6 font-sans text-left select-none relative z-10">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-display flex items-center space-x-2">
          <FolderHeart className="text-primary-500" size={24} />
          <span>Diagnostic Reports Portal</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">Manage, upload, download, and delete diagnostic lab scannings and medical logs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Patient Selector (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4 flex flex-col justify-start">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Patient File</h3>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search patient, ID or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-100 text-slate-700 placeholder-slate-400 rounded-lg focus:outline-none focus:border-primary-400 dark:bg-slate-800 dark:border-slate-800 dark:text-white dark:placeholder-slate-500 transition"
              />
            </div>

            {loading ? (
              <div className="space-y-2 pt-2">
                {[1, 2, 3].map(i => <div key={i} className="h-12 bg-slate-50 dark:bg-slate-800 animate-pulse rounded-xl"></div>)}
              </div>
            ) : patients.length > 0 ? (
              <div className="space-y-1 max-h-[50vh] overflow-y-auto pt-2 divide-y divide-slate-50 dark:divide-slate-800/40">
                {patients.map(pat => (
                  <button
                    key={pat.id}
                    onClick={() => fetchPatientReports(pat)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition text-left text-xs ${
                      selectedPatient?._id === pat.id 
                        ? 'bg-primary-50 text-primary-900 dark:bg-primary-950/20 dark:text-primary-350 border border-primary-100/50 dark:border-primary-900/30' 
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="min-w-0 pr-4">
                      <p className="font-semibold text-slate-900 dark:text-white capitalize">
                        {pat.firstName} {pat.lastName}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        ID: {pat.patientId} • Phone: {pat.phone}
                      </p>
                    </div>
                    <ArrowRight size={14} className="opacity-40 hover:opacity-100 transition shrink-0" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-400 font-medium">No patient records found.</div>
            )}
          </div>
        </div>

        {/* Right Side: Reports Viewer (7 cols) */}
        <div className="lg:col-span-7">
          {selectedPatient ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-6">
              
              {/* Selected Patient Banner */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 block font-mono uppercase bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded w-max">
                    {selectedPatient.patientId}
                  </span>
                  <h2 className="text-base font-bold font-display text-slate-900 dark:text-white mt-1 capitalize">
                    {selectedPatient.firstName} {selectedPatient.lastName}
                  </h2>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-medium">
                    Age: {selectedPatient.age} Yrs • Blood: {selectedPatient.bloodGroup} • Phone: {selectedPatient.phone}
                  </p>
                </div>
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-primary-100 hover:bg-primary-200 text-primary-750 font-semibold text-xs dark:bg-primary-950/40 dark:text-primary-400 dark:hover:bg-primary-950 rounded-lg transition"
                >
                  <Upload size={14} />
                  <span>Attach Scan File</span>
                </button>
              </div>

              {/* Reports List */}
              {reportsLoading ? (
                <div className="py-20 text-center text-xs text-slate-400 animate-pulse">Loading report files...</div>
              ) : reports.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reports.map((rep) => (
                    <div key={rep._id} className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 p-4 rounded-xl text-xs flex items-center justify-between transition hover:border-slate-200 dark:hover:border-slate-800">
                      <div className="text-left space-y-1.5 min-w-0 pr-4">
                        <p className="font-bold text-slate-800 dark:text-white truncate">{rep.title}</p>
                        <p className="text-[10px] text-slate-405 line-clamp-1">{rep.description || 'No description provided'}</p>
                        <span className="text-[9px] font-semibold text-slate-400 block font-mono">
                          Uploaded: {new Date(rep.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex space-x-2 shrink-0">
                        <a
                          href={rep.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white hover:bg-primary-50 hover:text-primary-500 dark:bg-slate-900 rounded-lg text-slate-400 transition"
                          title="Open Document"
                        >
                          <Download size={14} />
                        </a>
                        <button
                          onClick={() => handleDeleteReport(rep._id)}
                          className="p-2 bg-white hover:bg-red-50 hover:text-red-500 dark:bg-slate-900 rounded-lg text-slate-400 transition"
                          title="Delete Scan Files"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center text-xs text-slate-400 border border-dashed rounded-xl border-slate-200 dark:border-slate-800">
                  No diagnostic laboratory files attached to this patient profile.
                </div>
              )}

              {/* Jump shortcut to patient record */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-855 text-right">
                <Link
                  to={`/admin/patients/${selectedPatient.id}`}
                  className="text-xs text-primary-500 hover:text-primary-650 font-bold inline-flex items-center space-x-1"
                >
                  <span>Go to Full Patient File</span>
                  <ArrowRight size={12} />
                </Link>
              </div>

            </div>
          ) : (
            <div className="h-full bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center p-12 text-center text-xs min-h-[300px]">
              <Sparkles size={36} className="text-primary-400 animate-pulse mb-3" />
              <p className="font-bold text-slate-700 dark:text-slate-300">No Patient Selected</p>
              <p className="text-slate-400 mt-1 max-w-xs leading-relaxed">Search patients list on the left side directory and select a profile to audit attached diagnostic scanning logs.</p>
            </div>
          )}
        </div>

      </div>

      {/* Upload Scan Modal Overlay */}
      {isUploadModalOpen && selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-hidden select-none">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-2xl flex flex-col">
            <h3 className="text-base font-bold text-slate-905 dark:text-white font-display mb-4">Attach Lab Diagnostic File</h3>
            <p className="text-[10px] text-slate-400 mb-4 bg-slate-50 dark:bg-slate-850 p-2.5 rounded-lg">
              Uploading file for: <strong>{selectedPatient.firstName} {selectedPatient.lastName}</strong>
            </p>
            
            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs text-left">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 block">REPORT SUMMARY / TITLE *</label>
                <input
                  type="text"
                  required
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-150 dark:border-slate-805 bg-transparent rounded-lg focus:outline-none focus:border-primary-505 dark:text-white"
                  placeholder="e.g. Blood Urine Panel Test"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 block">ADDITIONAL DESCRIPTION</label>
                <textarea
                  rows={2}
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-150 dark:border-slate-805 bg-transparent rounded-lg focus:outline-none focus:border-primary-505 dark:text-white"
                  placeholder="e.g. Sugar levels, lipid levels high..."
                ></textarea>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 block">SELECT scan FILE (IMAGE OR PDF) *</label>
                <input
                  type="file"
                  required
                  accept="image/*,application/pdf"
                  onChange={(e) => setReportFile(e.target.files[0])}
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-primary-50 file:text-primary-750 dark:file:bg-slate-800 dark:file:text-slate-350 cursor-pointer"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-800 text-slate-650 bg-transparent rounded-lg hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-slate-400 text-white rounded-lg transition font-semibold"
                >
                  {uploading ? 'Processing File...' : 'Upload File'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
