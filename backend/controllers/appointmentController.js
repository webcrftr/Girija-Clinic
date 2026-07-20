const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');

// @desc    Get all appointments with filter
// @route   GET /api/appointments
// @access  Private
const getAppointments = async (req, res, next) => {
  try {
    const { status, date, start_date, end_date } = req.query;
    const query = {};

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by single date
    if (date) {
      const searchDate = new Date(date);
      const startOfDay = new Date(searchDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(searchDate.setHours(23, 59, 59, 999));
      query.appointmentDate = { $gte: startOfDay, $lte: endOfDay };
    } 
    // Filter by date range (useful for calendar and scheduling lists)
    else if (start_date && end_date) {
      query.appointmentDate = {
        $gte: new Date(start_date),
        $lte: new Date(end_date)
      };
    }

    const appointments = await Appointment.find(query)
      .populate('patient', 'firstName lastName phone patientId email gender age')
      .sort({ appointmentDate: 1, timeSlot: 1 });

    res.json({
      success: true,
      appointments
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single appointment details
// @route   GET /api/appointments/:id
// @access  Private
const getAppointmentById = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient', 'firstName lastName phone patientId email age gender bloodGroup');
    
    if (!appointment) {
      res.status(404);
      throw new Error('Appointment not found');
    }

    res.json({
      success: true,
      appointment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create/Book an appointment
// @route   POST /api/appointments
// @access  Public/Private (Support booking from site or dashboard)
const createAppointment = async (req, res, next) => {
  try {
    const { patientId, doctorName, appointmentDate, timeSlot, reason, notes, isPublic = false } = req.body;

    let targetPatientId = null;

    if (isPublic) {
      // Public Booking: user fills basic details, look up or create patient
      const { firstName, lastName, phone, email, gender, age, dob, bloodGroup } = req.body;
      
      if (!firstName || !lastName || !phone) {
        res.status(400);
        throw new Error('Please provide at least first name, last name, and phone number');
      }

      // Check if patient already exists by phone
      let patient = await Patient.findOne({ phone });
      if (!patient) {
        // Generate patient ID
        const count = await Patient.countDocuments();
        const formattedNum = String(count + 1).padStart(4, '0');
        const autoPatientId = `GCN-${formattedNum}`;

        patient = new Patient({
          patientId: autoPatientId,
          firstName,
          lastName,
          phone,
          email: email || '',
          gender: gender || 'Other',
          age: parseInt(age) || 30,
          dob: dob ? new Date(dob) : new Date(),
          bloodGroup: bloodGroup || 'O+'
        });
        await patient.save();
      }
      targetPatientId = patient.id;
    } else {
      // Admin dashboard booking: patient field contains patient ID (MongoDB _id or patientId string)
      if (!patientId) {
        res.status(400);
        throw new Error('Must select a patient');
      }
      
      const foundPatient = await Patient.findById(patientId);
      if (!foundPatient) {
        res.status(404);
        throw new Error('Selected patient record not found');
      }
      targetPatientId = foundPatient.id;
    }

    const appointment = new Appointment({
      patient: targetPatientId,
      doctorName: doctorName || 'Dr. Girija Prasad',
      appointmentDate: new Date(appointmentDate),
      timeSlot,
      reason,
      notes: notes || '',
      status: 'Pending'
    });

    const bookedAppointment = await appointment.save();
    
    // Populate patient fields for response
    const populated = await Appointment.findById(bookedAppointment.id)
      .populate('patient', 'firstName lastName phone patientId email');

    res.status(201).json({
      success: true,
      appointment: populated
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update and reschedule / Cancel appointments
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      res.status(404);
      throw new Error('Appointment not found');
    }

    const { appointmentDate, timeSlot, status, doctorName, reason, notes } = req.body;

    appointment.appointmentDate = appointmentDate ? new Date(appointmentDate) : appointment.appointmentDate;
    appointment.timeSlot = timeSlot || appointment.timeSlot;
    appointment.status = status || appointment.status;
    appointment.doctorName = doctorName || appointment.doctorName;
    appointment.reason = reason || appointment.reason;
    appointment.notes = notes !== undefined ? notes : appointment.notes;

    const updated = await appointment.save();

    // Populate patient fields
    const populated = await Appointment.findById(updated.id)
      .populate('patient', 'firstName lastName phone patientId email gender age');

    res.json({
      success: true,
      appointment: populated
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private
const deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      res.status(404);
      throw new Error('Appointment not found');
    }

    await appointment.deleteOne();

    res.json({
      success: true,
      message: 'Appointment cancelled and deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
};
