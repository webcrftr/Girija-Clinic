const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true
  },
  height: {
    type: Number, // in cm
    default: 0
  },
  weight: {
    type: Number, // in kg
    default: 0
  },
  medicalHistory: {
    type: [String],
    default: []
  },
  allergies: {
    type: [String],
    default: []
  },
  emergencyContact: {
    name: { type: String, default: '' },
    phone: { type: String, default: '' },
    relation: { type: String, default: '' }
  },
  occupation: {
    type: String,
    default: ''
  },
  doctorNotes: {
    type: String,
    default: ''
  },
  currentMedications: {
    type: [String],
    default: []
  },
  photo: {
    type: String,
    default: '' // Cloudinary URL
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Patient', PatientSchema);
