const express = require('express');
const router = express.Router();
const { getPatients, getPatientById, createPatient, updatePatient, deletePatient } = require('../controllers/patientController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
  .get(protect, getPatients)
  .post(protect, upload.single('photo'), createPatient);

router.route('/:id')
  .get(protect, getPatientById)
  .put(protect, upload.single('photo'), updatePatient)
  .delete(protect, deletePatient);

module.exports = router;
