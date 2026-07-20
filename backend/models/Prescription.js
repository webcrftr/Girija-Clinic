const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  dosage: {
    type: String, // e.g. "1 Tablet", "5ml"
    default: ''
  },
  morning: {
    type: Boolean,
    default: false
  },
  afternoon: {
    type: Boolean,
    default: false
  },
  night: {
    type: Boolean,
    default: false
  },
  duration: {
    type: String, // e.g. "5 days", "1 month"
    default: ''
  },
  remarks: {
    type: String, // e.g. "After food", "Before food"
    default: ''
  }
});

const PrescriptionSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  },
  medicines: [MedicineSchema],
  diagnosis: {
    type: String,
    required: true,
    default: ''
  },
  advice: {
    type: String,
    default: ''
  },
  nextFollowUp: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Prescription', PrescriptionSchema);
