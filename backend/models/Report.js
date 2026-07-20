const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  reportName: {
    type: String,
    required: true,
    trim: true
  },
  reportType: {
    type: String,
    enum: ['Blood Test', 'MRI', 'X-Ray', 'Lab Report', 'Other'],
    required: true
  },
  fileUrl: {
    type: String,
    required: true // Cloudinary URL or fallback local upload link
  },
  notes: {
    type: String,
    default: ''
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Report', ReportSchema);
