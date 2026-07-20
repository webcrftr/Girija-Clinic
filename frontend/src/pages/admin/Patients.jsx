import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useUI } from '../../context/UIContext';
import { db } from "../../firebase/firebase";
import api from '../../services/api';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  where
} from "firebase/firestore";
import {
  Plus,
  Search,
  Eye,
  Edit2,
  Trash2,
  Filter,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Upload
} from 'lucide-react';

export default function Patients() {
  const { showToast, triggerConfirm } = useUI();
  const location = useLocation();
  const navigate = useNavigate();

  // Patients states
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 });

  // Query states
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [sort, setSort] = useState('Newest');
  const [page, setPage] = useState(1);

  // Modal overlays
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null); // Null if creating
  const [photoFile, setPhotoFile] = useState(null);
  const [tempPhotoUrl, setTempPhotoUrl] = useState('');

  const [formFields, setFormFields] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    dob: '',
    gender: 'Male',
    bloodGroup: 'O+',
    age: '',
    height: '',
    weight: '',
    address: '',
    occupation: '',
    medicalHistory: '',
    allergies: '',
    currentMedications: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',
    doctorNotes: ''
  });

  const getPatientsList = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "patients"));
      let list = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data()
      }));

      // Apply Search (firstName, lastName, phone, patientId, email)
      if (search.trim()) {
        const term = search.toLowerCase();
        list = list.filter(pat =>
          (pat.firstName + ' ' + pat.lastName).toLowerCase().includes(term) ||
          (pat.patientId || '').toLowerCase().includes(term) ||
          (pat.phone || '').toLowerCase().includes(term) ||
          (pat.email || '').toLowerCase().includes(term)
        );
      }

      // Apply Gender Filter
      if (gender) {
        list = list.filter(pat => pat.gender === gender);
      }

      // Apply Blood Group Filter
      if (bloodGroup) {
        list = list.filter(pat => pat.bloodGroup === bloodGroup);
      }

      // Apply Sort
      if (sort === 'Newest') {
        list.sort((a, b) => {
          const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
          const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
          return dateB - dateA;
        });
      } else if (sort === 'Oldest') {
        list.sort((a, b) => {
          const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
          const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
          return dateA - dateB;
        });
      } else if (sort === 'Alphabetical') {
        list.sort((a, b) => {
          const nameA = `${a.firstName || ''} ${a.lastName || ''}`.toLowerCase();
          const nameB = `${b.firstName || ''} ${b.lastName || ''}`.toLowerCase();
          return nameA.localeCompare(nameB);
        });
      }

      // Apply Pagination
      const totalDocs = list.length;
      const pagesCount = Math.ceil(totalDocs / pagination.limit);
      const startIndex = (page - 1) * pagination.limit;
      const paginatedList = list.slice(startIndex, startIndex + pagination.limit);

      setPatients(paginatedList);
      setPagination(prev => ({
        ...prev,
        page,
        total: totalDocs,
        pages: pagesCount || 1
      }));

    } catch (error) {
      console.error(error);
      showToast("Failed to load patients", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPatientsList();
  }, [search, gender, bloodGroup, sort, page]);

  // Open modal for creating or editing patient
  const openModal = (patient = null) => {
    setPhotoFile(null);
    if (patient) {
      setSelectedPatientId(patient.id);
      setTempPhotoUrl(patient.photo || '');
      setFormFields({
        firstName: patient.firstName || '',
        lastName: patient.lastName || '',
        phone: patient.phone || '',
        email: patient.email || '',
        dob: patient.dob ? new Date(patient.dob).toISOString().split('T')[0] : '',
        gender: patient.gender || 'Male',
        bloodGroup: patient.bloodGroup || 'O+',
        age: patient.age || '',
        height: patient.height || '',
        weight: patient.weight || '',
        address: patient.address || '',
        occupation: patient.occupation || '',
        medicalHistory: Array.isArray(patient.medicalHistory) ? patient.medicalHistory.join(', ') : (patient.medicalHistory || ''),
        allergies: Array.isArray(patient.allergies) ? patient.allergies.join(', ') : (patient.allergies || ''),
        currentMedications: Array.isArray(patient.currentMedications) ? patient.currentMedications.join(', ') : (patient.currentMedications || ''),
        emergencyContactName: patient.emergencyContact?.name || '',
        emergencyContactPhone: patient.emergencyContact?.phone || '',
        emergencyContactRelation: patient.emergencyContact?.relation || '',
        doctorNotes: patient.doctorNotes || ''
      });
    } else {
      setSelectedPatientId(null);
      setTempPhotoUrl('');
      setFormFields({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        dob: '',
        gender: 'Male',
        bloodGroup: 'O+',
        age: '',
        height: '',
        weight: '',
        address: '',
        occupation: '',
        medicalHistory: '',
        allergies: '',
        currentMedications: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactRelation: '',
        doctorNotes: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    setFormFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoFile(file);
      setTempPhotoUrl(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const parseCommaStringField = (val) => {
        if (!val) return [];
        if (typeof val !== 'string') return val;
        return val.split(',').map(item => item.trim()).filter(Boolean);
      };

      const patientData = {
        firstName: formFields.firstName,
        lastName: formFields.lastName,
        phone: formFields.phone,
        email: formFields.email || '',
        gender: formFields.gender || 'Male',
        age: calculateAge(formFields.dob),
        dob: formFields.dob || '',
        bloodGroup: formFields.bloodGroup || 'O+',
        address: formFields.address || '',
        height: parseFloat(formFields.height) || 0,
        weight: parseFloat(formFields.weight) || 0,
        occupation: formFields.occupation || '',
        doctorNotes: formFields.doctorNotes || '',
        medicalHistory: parseCommaStringField(formFields.medicalHistory),
        allergies: parseCommaStringField(formFields.allergies),
        currentMedications: parseCommaStringField(formFields.currentMedications),
        emergencyContact: {
          name: formFields.emergencyContactName || '',
          phone: formFields.emergencyContactPhone || '',
          relation: formFields.emergencyContactRelation || ''
        },
        photo: tempPhotoUrl || ''
      };

      if (selectedPatientId) {
        // Upload photo if a new file is uploaded
        if (photoFile) {
          const formData = new FormData();
          formData.append('file', photoFile);
          const uploadRes = await api.post('/api/reports/upload-cloudinary', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          patientData.photo = uploadRes.data.secure_url;
        }

        await updateDoc(doc(db, "patients", selectedPatientId), patientData);
        showToast("Patient updated successfully", "success");
      } else {
        // Fetch count to construct patientId (e.g. GCN-0005)
        const allPatientsSnap = await getDocs(collection(db, "patients"));
        const count = allPatientsSnap.size;
        const formattedNum = String(count + 1).padStart(4, '0');
        patientData.patientId = `GCN-${formattedNum}`;
        patientData.createdAt = serverTimestamp();

        // Upload photo if photo file selected
        if (photoFile) {
          const formData = new FormData();
          formData.append('file', photoFile);
          const uploadRes = await api.post('/api/reports/upload-cloudinary', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          patientData.photo = uploadRes.data.secure_url;
        }

        // Create doc
        await addDoc(collection(db, "patients"), patientData);

        showToast("Patient added successfully", "success");
      }

      setIsModalOpen(false);
      getPatientsList();

    } catch (error) {
      console.log("UPLOAD ERROR:", error);
      console.error(error);
      showToast("Failed to save patient", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePatient = async (id, name) => {
    const confirm = await triggerConfirm({
      title: 'Delete Patient Record',
      message: `Are you sure you want to delete ${name}? This action deletes clinical files, past scheduling, report logs, and cannot be undone.`,
      confirmText: 'Delete Record',
      cancelText: 'Cancel'
    });

    if (confirm) {
      try {
        // Delete Patient Doc
        await deleteDoc(doc(db, "patients", id));

        // Delete associated Appointments
        const appointmentsSnap = await getDocs(
          query(collection(db, "appointments"), where("patientId", "==", id))
        );
        for (const docSnap of appointmentsSnap.docs) {
          await deleteDoc(doc(db, "appointments", docSnap.id));
        }

        // Delete associated Prescriptions
        const prescSnap = await getDocs(
          query(collection(db, "prescriptions"), where("patientId", "==", id))
        );
        for (const docSnap of prescSnap.docs) {
          await deleteDoc(doc(db, "prescriptions", docSnap.id));
        }

        // Delete associated Reports
        const reportsSnap = await getDocs(
          query(collection(db, "reports"), where("patientId", "==", id))
        );
        for (const docSnap of reportsSnap.docs) {
          const reportData = docSnap.data();
          if (reportData.publicId) {
            await api.post('/api/reports/delete-cloudinary', { publicId: reportData.publicId }).catch(err => {
              console.warn("Cloudinary delete failed:", err);
            });
          }
          await deleteDoc(doc(db, "reports", docSnap.id));
        }

        showToast('Patient record and all associated logs deleted successfully', 'success');
        getPatientsList();
      } catch (error) {
        console.error(error);
        showToast('Failed to delete patient record.', 'error');
      }
    }
  };

  const calculateAge = (dob) => {
    if (!dob) return "";
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
    <div className="space-y-6 font-sans text-left select-none relative z-10">

      {/* Page Title Row */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-display">Patients Directory</h1>
          <p className="text-xs text-slate-400 mt-1">Manage clinical files, patient registrations, history timelines, etc.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center space-x-2 px-4 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition text-xs font-semibold shadow-md active:scale-95"
        >
          <Plus size={16} />
          <span>Register New Patient</span>
        </button>
      </div>

      {/* Query Filters row */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">

        {/* Search Input */}
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search name, phone, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-100 text-slate-700 placeholder-slate-400 rounded-lg focus:outline-none focus:border-primary-400 dark:bg-slate-800 dark:border-slate-800 dark:text-white dark:placeholder-slate-500 transition"
          />
        </div>

        {/* Filters and sorting selects */}
        <div className="flex flex-wrap items-center gap-3 text-xs">

          <div className="flex items-center space-x-2">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Gender</span>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-105 rounded-lg dark:bg-slate-800 dark:border-slate-800 text-slate-650 dark:text-slate-300 focus:outline-none"
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Blood</span>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-105 rounded-lg dark:bg-slate-800 dark:border-slate-800 text-slate-650 dark:text-slate-300 focus:outline-none"
            >
              <option value="">All</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-105 rounded-lg dark:bg-slate-800 dark:border-slate-800 text-slate-650 dark:text-slate-300 focus:outline-none"
            >
              <option value="Newest">Newest First</option>
              <option value="Oldest">Oldest First</option>
              <option value="Alphabetical">Alphabetical</option>
            </select>
          </div>

        </div>

      </div>

      {/* Grid listing patient records */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-20 bg-white dark:bg-slate-900 border border-slate-100 rounded-2xl animate-pulse"></div>)}
        </div>
      ) : patients.length > 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs select-none">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase py-3 px-6 h-12 bg-slate-50/50 dark:bg-slate-900">
                  <th className="pl-6 py-3">Patient ID</th>
                  <th className="py-3">Name</th>
                  <th className="py-3">Contacts</th>
                  <th className="py-3">Age / Gender</th>
                  <th className="py-3 text-center">Blood</th>
                  <th className="py-3 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {patients.map((pat) => (
                  <tr key={pat.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                    <td className="pl-6 py-4 font-bold text-primary-500">
                      <Link to={`/admin/patients/${pat.id}`}>{pat.patientId}</Link>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-9 w-9 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex items-center justify-center font-display border border-slate-200 dark:border-slate-700 text-sm">
                          {pat.photo ? (
                            <img src={pat.photo} alt={pat.firstName} className="h-full w-full object-cover" />
                          ) : (
                            <span>{pat.firstName[0]}{pat.lastName[0]}</span>
                          )}
                        </div>
                        <div className="text-left font-medium">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            {pat.firstName} {pat.lastName}
                          </p>
                          <p className="text-[10px] text-slate-400">DOB: {new Date(pat.dob).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <p className="font-mono text-slate-750 dark:text-slate-300 font-semibold">{pat.phone}</p>
                      <p className="text-[10px] text-slate-400">{pat.email || 'No email registered'}</p>
                    </td>
                    <td className="py-4 font-semibold text-slate-600 dark:text-slate-450">
                      {calculateAge(pat.dob)} Yrs / {pat.gender}
                    </td>
                    <td className="py-4 text-center font-bold">
                      <span className="px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-300">
                        {pat.bloodGroup}
                      </span>
                    </td>
                    <td className="py-4 text-right pr-6 space-x-2">
                      <Link
                        to={`/admin/patients/${pat.id}`}
                        className="inline-flex p-1.5 bg-slate-50 hover:bg-primary-50 hover:text-primary-500 rounded-lg text-slate-500 dark:bg-slate-800 dark:hover:bg-primary-950 dark:text-slate-450 transition"
                        title="View Profile"
                      >
                        <Eye size={14} />
                      </Link>
                      <button
                        onClick={() => openModal(pat)}
                        className="inline-flex p-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-500 rounded-lg text-slate-500 dark:bg-slate-800 dark:hover:bg-blue-950 dark:text-slate-450 transition"
                        title="Edit Details"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeletePatient(pat.id, `${pat.firstName} ${pat.lastName}`)}
                        className="inline-flex p-1.5 bg-slate-50 hover:bg-red-50 hover:text-red-500 rounded-lg text-slate-500 dark:bg-slate-800 dark:hover:bg-red-950 dark:text-slate-450 transition"
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

          {/* Pagination Footer */}
          {pagination.pages > 1 && (
            <div className="px-6 py-4 flex justify-between items-center border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-550 dark:text-slate-400">
                Patient {((page - 1) * pagination.limit) + 1} to {Math.min(page * pagination.limit, pagination.total)} of {pagination.total} records
              </span>
              <div className="flex space-x-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="p-1.5 border border-slate-150 rounded-lg text-slate-505 dark:border-slate-800 hover:bg-slate-50 disabled:opacity-50 transition"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  disabled={page === pagination.pages}
                  onClick={() => setPage(page + 1)}
                  className="p-1.5 border border-slate-150 rounded-lg text-slate-505 dark:border-slate-800 hover:bg-slate-50 disabled:opacity-50 transition"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-12 text-center rounded-2xl">
          <UserCheck size={48} className="text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-700 dark:text-white mt-4">No patient records matches.</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">Register patient records or change search filters.</p>
        </div>
      )}

      {/* Patient Create / Edit Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-hidden">
          <div className="bg-white dark:bg-slate-900 w-full max-w-4xl h-[90vh] overflow-y-auto rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-2xl flex flex-col justify-between">

            {/* Modal Header */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                {selectedPatientId ? 'Edit Patient File' : 'Register New Patient File'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="space-y-6 flex-grow">

              {/* Photo upload input row */}
              <div className="flex items-center space-x-6 pb-4 border-b border-slate-50 dark:border-slate-800">
                <div className="h-16 w-16 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-400 font-display select-none">
                  {tempPhotoUrl ? (
                    <img src={tempPhotoUrl} alt="Patient Avatar preview" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-xs">Photo</span>
                  )}
                </div>
                <div>
                  <label className="flex items-center space-x-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold cursor-pointer dark:bg-slate-800 dark:border-slate-800 dark:text-slate-350 hover:bg-slate-100 transition">
                    <Upload size={14} />
                    <span>Upload Clinic Avatar</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[10px] text-slate-400 mt-1">Accepts PNG, JPG, JPEG, or WEBP up to 5MB.</p>
                </div>
              </div>

              {/* Patient Basic Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-left">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 dark:text-slate-400 block">FIRST NAME *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formFields.firstName}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-slate-150 dark:border-slate-800 bg-transparent rounded-lg focus:outline-none focus:border-primary-500 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 dark:text-slate-400 block">LAST NAME *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formFields.lastName}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-slate-150 dark:border-slate-800 bg-transparent rounded-lg focus:outline-none focus:border-primary-500 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 dark:text-slate-400 block">CONTACT PHONE *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formFields.phone}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-slate-150 dark:border-slate-800 bg-transparent rounded-lg focus:outline-none focus:border-primary-500 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-5 text-xs text-left">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 dark:text-slate-400 block">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    name="email"
                    value={formFields.email}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-slate-150 dark:border-slate-800 bg-transparent rounded-lg focus:outline-none focus:border-primary-500 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 dark:text-slate-400 block">DATE OF BIRTH *</label>
                  <input
                    type="date"
                    name="dob"
                    required
                    value={formFields.dob}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-slate-150 dark:border-slate-800 bg-transparent rounded-lg focus:outline-none focus:border-primary-500 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 dark:text-slate-400 block">GENDER *</label>
                  <select
                    name="gender"
                    required
                    value={formFields.gender}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-slate-150 dark:border-slate-800 bg-transparent rounded-lg focus:outline-none focus:border-primary-500 dark:text-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 dark:text-slate-400 block">AGE *</label>
                  <input
                    type="number"
                    value={calculateAge(formFields.dob)}
                    readOnly
                    className="w-full px-3 py-2 border border-slate-150 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-not-allowed dark:text-white"
                  />
                </div>
              </div>

              {/* Physical Vitals fields */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5 text-xs text-left bg-slate-50 dark:bg-slate-850 p-4 rounded-xl">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 dark:text-slate-400 block">BLOOD GROUP *</label>
                  <select
                    name="bloodGroup"
                    required
                    value={formFields.bloodGroup}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-lg focus:outline-none focus:border-primary-500 dark:text-white"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 dark:text-slate-400 block">HEIGHT (CM)</label>
                  <input
                    type="number"
                    name="height"
                    placeholder="e.g. 175"
                    value={formFields.height}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-lg focus:outline-none focus:border-primary-500 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 dark:text-slate-400 block">WEIGHT (KG)</label>
                  <input
                    type="number"
                    name="weight"
                    placeholder="e.g. 70"
                    value={formFields.weight}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-lg focus:outline-none focus:border-primary-500 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 dark:text-slate-400 block">OCCUPATION</label>
                  <input
                    type="text"
                    name="occupation"
                    value={formFields.occupation}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-805 rounded-lg focus:outline-none focus:border-primary-500 dark:text-white"
                  />
                </div>
              </div>

              {/* Medical histories fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-left">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 dark:text-slate-450 block">MEDICAL HISTORY (COMMA SEPARATED)</label>
                  <input
                    type="text"
                    name="medicalHistory"
                    placeholder="e.g. Hypertension, Asthma"
                    value={formFields.medicalHistory}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-slate-150 dark:border-slate-800 bg-transparent rounded-lg focus:outline-none focus:border-primary-500 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 dark:text-slate-450 block">ALLERGIES</label>
                  <input
                    type="text"
                    name="allergies"
                    placeholder="e.g. Penicillin, Peanuts"
                    value={formFields.allergies}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-slate-150 dark:border-slate-800 bg-transparent rounded-lg focus:outline-none focus:border-primary-500 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-455 dark:text-slate-450 block">CURRENT MEDICATION LOGS</label>
                  <input
                    type="text"
                    name="currentMedications"
                    placeholder="e.g. Metformin, Aspirin"
                    value={formFields.currentMedications}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-slate-150 dark:border-slate-800 bg-transparent rounded-lg focus:outline-none focus:border-primary-500 dark:text-white"
                  />
                </div>
              </div>

              {/* Emergency Contact elements */}
              <div className="space-y-3 text-left">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-100 dark:border-slate-800">
                  Emergency Contact Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-455 dark:text-slate-400 block">CONTACT NAME</label>
                    <input
                      type="text"
                      name="emergencyContactName"
                      value={formFields.emergencyContactName}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-slate-150 dark:border-slate-805 bg-transparent rounded-lg focus:outline-none focus:border-primary-500 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-455 dark:text-slate-400 block">PHONE NUMBER</label>
                    <input
                      type="tel"
                      name="emergencyContactPhone"
                      value={formFields.emergencyContactPhone}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-slate-150 dark:border-slate-805 bg-transparent rounded-lg focus:outline-none focus:border-primary-500 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-455 dark:text-slate-400 block">RELATIONSHIP</label>
                    <input
                      type="text"
                      name="emergencyContactRelation"
                      placeholder="e.g. Spouse"
                      value={formFields.emergencyContactRelation}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-slate-150 dark:border-slate-805 bg-transparent rounded-lg focus:outline-none focus:border-primary-500 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* General address & internal diagnosis notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-left">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-455 dark:text-slate-450 block">RESIDENTIAL ADDRESS</label>
                  <textarea
                    name="address"
                    rows={3}
                    value={formFields.address}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-slate-150 dark:border-slate-805 bg-transparent rounded-lg focus:outline-none focus:border-primary-500 dark:text-white"
                  ></textarea>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-455 dark:text-slate-450 block">DOCTOR INTERNAL CLINICAL DIAGNOSIS NOTES</label>
                  <textarea
                    name="doctorNotes"
                    rows={3}
                    value={formFields.doctorNotes}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-slate-150 dark:border-slate-805 bg-transparent rounded-lg focus:outline-none focus:border-primary-500 dark:text-white"
                  ></textarea>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-205 dark:border-slate-800 text-slate-650 bg-transparent rounded-lg hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition font-semibold"
                >
                  {selectedPatientId ? 'Update Record File' : 'Save Patient File'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
