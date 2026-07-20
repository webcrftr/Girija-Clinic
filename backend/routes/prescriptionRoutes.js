const express = require('express');
const router = express.Router();
const { createPrescription, getPrescriptions, getPrescriptionById, getPatientPrescriptions, deletePrescription } = require('../controllers/prescriptionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createPrescription)
  .get(protect, getPrescriptions);

router.route('/:id')
  .get(protect, getPrescriptionById)
  .delete(protect, deletePrescription);

router.get('/patient/:id', protect, getPatientPrescriptions);

module.exports = router;
