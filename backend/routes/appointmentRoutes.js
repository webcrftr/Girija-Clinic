const express = require('express');
const router = express.Router();
const { getAppointments, getAppointmentById, createAppointment, updateAppointment, deleteAppointment } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

// Post is public/private (handles patient web site schedule forms or dashboard schedulers)
router.route('/')
  .get(protect, getAppointments)
  .post(createAppointment);

router.route('/:id')
  .get(protect, getAppointmentById)
  .put(protect, updateAppointment)
  .delete(protect, deleteAppointment);

module.exports = router;
