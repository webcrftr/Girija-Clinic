const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  clinicName: {
    type: String,
    required: true,
    default: 'Girija Clinic'
  },
  doctorName: {
    type: String,
    required: true,
    default: 'Dr. Girija Prasad'
  },
  logo: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: '123 Healthcare Ave, Medical District, Suite 100'
  },
  phone: {
    type: String,
    default: '+1 (555) 019-2834'
  },
  email: {
    type: String,
    default: 'contact@girijaclinic.com'
  },
  openingHours: {
    type: String,
    default: 'Mon - Sat: 9:00 AM - 6:00 PM (Sunday Closed)'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Settings', SettingsSchema);
