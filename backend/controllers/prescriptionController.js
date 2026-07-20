const Prescription = require('../models/Prescription');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');

// @desc    Create a new prescription
// @route   POST /api/prescriptions
// @access  Private
const createPrescription = async (req, res, next) => {
  try {
    const { patientId, appointmentId, medicines, diagnosis, advice, nextFollowUp } = req.body;

    if (!patientId || !diagnosis) {
      res.status(400);
      throw new Error('Patient and diagnosis fields are required');
    }

    // Verify patient
    const patientObj = await Patient.findById(patientId);
    if (!patientObj) {
      res.status(404);
      throw new Error('Patient not found');
    }

    // Create prescription
    const prescription = new Prescription({
      patient: patientId,
      appointment: appointmentId || null,
      medicines: medicines || [],
      diagnosis,
      advice: advice || '',
      nextFollowUp: nextFollowUp ? new Date(nextFollowUp) : null
    });

    const savedPrescription = await prescription.save();

    // If linked to an appointment, mark appointment as Completed
    if (appointmentId) {
      await Appointment.findByIdAndUpdate(appointmentId, { status: 'Completed' });
    }

    // Populate patient info for response
    const populated = await Prescription.findById(savedPrescription._id)
      .populate('patient', 'firstName lastName age gender phone address patientId bloodGroup height weight');

    res.status(201).json({
      success: true,
      prescription: populated
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all prescriptions list
// @route   GET /api/prescriptions
// @access  Private
const getPrescriptions = async (req, res, next) => {
  try {
    const prescriptions = await Prescription.find()
      .populate('patient', 'firstName lastName patientId phone')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      prescriptions
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single prescription by ID
// @route   GET /api/prescriptions/:id
// @access  Private
const getPrescriptionById = async (req, res, next) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate('patient', 'firstName lastName age gender phone address patientId bloodGroup height weight')
      .populate('appointment', 'appointmentDate timeSlot reason');

    if (!prescription) {
      res.status(404);
      throw new Error('Prescription not found');
    }

    res.json({
      success: true,
      prescription
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get patient prescriptions
// @route   GET /api/prescriptions/patient/:id
// @access  Private
const getPatientPrescriptions = async (req, res, next) => {
  try {
    const prescriptions = await Prescription.find({ patient: req.params.id })
      .populate('appointment', 'appointmentDate timeSlot reason')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      prescriptions
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Prescription
// @route   DELETE /api/prescriptions/:id
// @access  Private
const deletePrescription = async (req, res, next) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription) {
      res.status(404);
      throw new Error('Prescription not found');
    }

    await prescription.deleteOne();

    res.json({
      success: true,
      message: 'Prescription record deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPrescription,
  getPrescriptions,
  getPrescriptionById,
  getPatientPrescriptions,
  deletePrescription
};
