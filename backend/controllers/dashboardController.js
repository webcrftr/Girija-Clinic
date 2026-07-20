const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Prescription = require('../models/Prescription');

// @desc    Get dashboard metrics, logs, and chart aggregates
// @route   GET /api/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res, next) => {
  try {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const endOfToday = new Date(today.setHours(23, 59, 59, 999));

    // 1. Core counters
    const totalPatients = await Patient.countDocuments();
    const todaysPatients = await Patient.countDocuments({
      createdAt: { $gte: startOfToday, $lte: endOfToday }
    });
    const appointmentsToday = await Appointment.countDocuments({
      appointmentDate: { $gte: startOfToday, $lte: endOfToday }
    });
    const pendingAppointments = await Appointment.countDocuments({
      status: 'Pending'
    });

    // 2. Growth calculation (Patients registered this month vs last month)
    const now = new Date();
    const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

    const patientsThisMonth = await Patient.countDocuments({
      createdAt: { $gte: firstDayThisMonth }
    });
    const patientsLastMonth = await Patient.countDocuments({
      createdAt: { $gte: firstDayLastMonth, $lte: lastDayLastMonth }
    });

    let growthPercentage = 0;
    if (patientsLastMonth > 0) {
      growthPercentage = parseFloat((((patientsThisMonth - patientsLastMonth) / patientsLastMonth) * 100).toFixed(1));
    } else if (patientsThisMonth > 0) {
      growthPercentage = 100.0;
    }

    // 3. Recent tables (Patient, Appointment log list)
    const recentPatients = await Patient.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const recentAppointments = await Appointment.find()
      .populate('patient', 'firstName lastName patientId phone')
      .sort({ appointmentDate: -1 })
      .limit(5);

    // 4. Growth Trends Chart (last 6 months patients count)
    const monthsData = [];
    for (let i = 5; i >= 0; i--) {
      const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const year = targetDate.getFullYear();
      const month = targetDate.getMonth();
      const monthName = targetDate.toLocaleString('default', { month: 'short' });

      const startMonth = new Date(year, month, 1);
      const endMonth = new Date(year, month + 1, 0, 23, 59, 59, 999);

      const count = await Patient.countDocuments({
        createdAt: { $gte: startMonth, $lte: endMonth }
      });

      const appointmentCount = await Appointment.countDocuments({
        appointmentDate: { $gte: startMonth, $lte: endMonth }
      });

      monthsData.push({
        name: monthName,
        Patients: count,
        Appointments: appointmentCount
      });
    }

    // 5. Appointments Status distribution Pie Chart
    const pendingCount = await Appointment.countDocuments({ status: 'Pending' });
    const completedCount = await Appointment.countDocuments({ status: 'Completed' });
    const cancelledCount = await Appointment.countDocuments({ status: 'Cancelled' });

    res.json({
      success: true,
      metrics: {
        totalPatients,
        todaysPatients,
        appointmentsToday,
        pendingAppointments,
        growthPercentage
      },
      recent: {
        patients: recentPatients,
        appointments: recentAppointments
      },
      charts: {
        monthlyTrends: monthsData,
        appointmentsDistribution: [
          { name: 'Pending', value: pendingCount },
          { name: 'Completed', value: completedCount },
          { name: 'Cancelled', value: cancelledCount }
        ]
      }
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats
};
