const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Prescription = require('../models/Prescription');
const Report = require('../models/Report');
const { cloudinary, isCloudinaryConfigured } = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

// Helper function to handle image upload
const handleImageUpload = async (file) => {
  if (!file) return '';
  
  if (isCloudinaryConfigured) {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'girija_clinic_patients'
      });
      // Delete temporary local file
      fs.unlinkSync(file.path);
      return result.secure_url;
    } catch (err) {
      console.error('Cloudinary Upload Error:', err.message);
      // Fallback: return local path if Cloudinary fails
      return `/uploads/${file.filename}`;
    }
  } else {
    // Return local static path
    return `/uploads/${file.filename}`;
  }
};

// @desc    Get all patients with filters, search, sorting and pagination
// @route   GET /api/patients
// @access  Private
const getPatients = async (req, res, next) => {
  try {
    const { search, gender, bloodGroup, ageMin, ageMax, sort, page = 1, limit = 10 } = req.query;

    const query = {};

    // Search Query (ByName, Phone, PatientID)
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { phone: searchRegex },
        { patientId: searchRegex }
      ];
    }

    // Filters
    if (gender) {
      query.gender = gender;
    }

    if (bloodGroup) {
      query.bloodGroup = bloodGroup;
    }

    if (ageMin || ageMax) {
      query.age = {};
      if (ageMin) query.age.$gte = parseInt(ageMin);
      if (ageMax) query.age.$lte = parseInt(ageMax);
    }

    // Sort order mapping
    let sortOptions = {};
    if (sort === 'Oldest') {
      sortOptions = { createdAt: 1 };
    } else if (sort === 'Alphabetical') {
      sortOptions = { firstName: 1, lastName: 1 };
    } else {
      // Default: Newest first
      sortOptions = { createdAt: -1 };
    }

    // Pagination
    const skipCount = (parseInt(page) - 1) * parseInt(limit);
    const totalPatients = await Patient.countDocuments(query);
    
    const patients = await Patient.find(query)
      .sort(sortOptions)
      .skip(skipCount)
      .limit(parseInt(limit));

    res.json({
      success: true,
      patients,
      pagination: {
        total: totalPatients,
        pages: Math.ceil(totalPatients / parseInt(limit)),
        page: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Single Patient & Profile Details (Timeline, Prescriptions, Reports)
// @route   GET /api/patients/:id
// @access  Private
const getPatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      res.status(404);
      throw new Error('Patient not found');
    }

    // Fetch related records
    const appointments = await Appointment.find({ patient: patient.id }).sort({ appointmentDate: -1 });
    const prescriptions = await Prescription.find({ patient: patient.id }).sort({ createdAt: -1 });
    const reports = await Report.find({ patient: patient.id }).sort({ uploadDate: -1 });

    res.json({
      success: true,
      patient,
      history: {
        appointments,
        prescriptions,
        reports
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a Patient
// @route   POST /api/patients
// @access  Private
const createPatient = async (req, res, next) => {
  try {
    // Generate automated patient ID
    const count = await Patient.countDocuments();
    const nextNum = count + 1;
    const formattedNum = String(nextNum).padStart(4, '0');
    const patientId = `GCN-${formattedNum}`;

    const {
      firstName,
      lastName,
      gender,
      age,
      dob,
      phone,
      email,
      address,
      bloodGroup,
      height,
      weight,
      medicalHistory,
      allergies,
      occupation,
      doctorNotes,
      currentMedications,
      emergencyContactName,
      emergencyContactPhone,
      emergencyContactRelation
    } = req.body;

    // Handle photo compilation
    let photoUrl = '';
    if (req.file) {
      photoUrl = await handleImageUpload(req.file);
    }

    const patientData = {
      patientId,
      firstName,
      lastName,
      gender,
      age: parseInt(age),
      dob: new Date(dob),
      phone,
      email,
      address,
      bloodGroup,
      height: parseFloat(height) || 0,
      weight: parseFloat(weight) || 0,
      medicalHistory: medicalHistory ? (typeof medicalHistory === 'string' ? medicalHistory.split(',') : medicalHistory) : [],
      allergies: allergies ? (typeof allergies === 'string' ? allergies.split(',') : allergies) : [],
      occupation,
      doctorNotes,
      currentMedications: currentMedications ? (typeof currentMedications === 'string' ? currentMedications.split(',') : currentMedications) : [],
      photo: photoUrl,
      emergencyContact: {
        name: emergencyContactName || '',
        phone: emergencyContactPhone || '',
        relation: emergencyContactRelation || ''
      }
    };

    const patient = new Patient(patientData);
    const createdPatient = await patient.save();

    res.status(201).json({
      success: true,
      patient: createdPatient
    });
  } catch (error) {
    // Clean up file if validation failed
    if (req.file && fs.existsSync(req.file.path)) {
      try { fs.unlinkSync(req.file.path); } catch (e) {}
    }
    next(error);
  }
};

// @desc    Update a Patient
// @route   PUT /api/patients/:id
// @access  Private
const updatePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      res.status(404);
      throw new Error('Patient not found');
    }

    const {
      firstName,
      lastName,
      gender,
      age,
      dob,
      phone,
      email,
      address,
      bloodGroup,
      height,
      weight,
      medicalHistory,
      allergies,
      occupation,
      doctorNotes,
      currentMedications,
      emergencyContactName,
      emergencyContactPhone,
      emergencyContactRelation
    } = req.body;

    // Handles Photo Update
    if (req.file) {
      patient.photo = await handleImageUpload(req.file);
    }

    // Populate Fields
    patient.firstName = firstName || patient.firstName;
    patient.lastName = lastName || patient.lastName;
    patient.gender = gender || patient.gender;
    patient.age = age ? parseInt(age) : patient.age;
    patient.dob = dob ? new Date(dob) : patient.dob;
    patient.phone = phone || patient.phone;
    patient.email = email !== undefined ? email : patient.email;
    patient.address = address !== undefined ? address : patient.address;
    patient.bloodGroup = bloodGroup || patient.bloodGroup;
    patient.height = height ? parseFloat(height) : patient.height;
    patient.weight = weight ? parseFloat(weight) : patient.weight;
    patient.occupation = occupation !== undefined ? occupation : patient.occupation;
    patient.doctorNotes = doctorNotes !== undefined ? doctorNotes : patient.doctorNotes;

    if (medicalHistory !== undefined) {
      patient.medicalHistory = typeof medicalHistory === 'string' ? medicalHistory.split(',') : medicalHistory;
    }
    if (allergies !== undefined) {
      patient.allergies = typeof allergies === 'string' ? allergies.split(',') : allergies;
    }
    if (currentMedications !== undefined) {
      patient.currentMedications = typeof currentMedications === 'string' ? currentMedications.split(',') : currentMedications;
    }

    if (emergencyContactName || emergencyContactPhone || emergencyContactRelation) {
      patient.emergencyContact = {
        name: emergencyContactName || patient.emergencyContact.name,
        phone: emergencyContactPhone || patient.emergencyContact.phone,
        relation: emergencyContactRelation || patient.emergencyContact.relation
      };
    }

    const updatedPatient = await patient.save();
    res.json({
      success: true,
      patient: updatedPatient
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      try { fs.unlinkSync(req.file.path); } catch (e) {}
    }
    next(error);
  }
};

// @desc    Delete Patient
// @route   DELETE /api/patients/:id
// @access  Private
const deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      res.status(404);
      throw new Error('Patient not found');
    }

    // Clean up dependent resources
    await Appointment.deleteMany({ patient: patient.id });
    await Prescription.deleteMany({ patient: patient.id });
    await Report.deleteMany({ patient: patient.id });

    await patient.deleteOne();
    
    res.json({
      success: true,
      message: 'Patient record and associated history deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient
};
