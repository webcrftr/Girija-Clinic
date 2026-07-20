const Settings = require('../models/Settings');

// @desc    Get clinic settings
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({});
      await settings.save();
    }
    res.json({
      success: true,
      settings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update clinic settings
// @route   PUT /api/settings
// @access  Private
const updateSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({});
    }

    const { clinicName, doctorName, logo, address, phone, email, openingHours } = req.body;

    settings.clinicName = clinicName || settings.clinicName;
    settings.doctorName = doctorName || settings.doctorName;
    settings.logo = logo || settings.logo;
    settings.address = address || settings.address;
    settings.phone = phone || settings.phone;
    settings.email = email || settings.email;
    settings.openingHours = openingHours || settings.openingHours;

    const updatedSettings = await settings.save();

    res.json({
      success: true,
      settings: updatedSettings
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSettings,
  updateSettings
};
