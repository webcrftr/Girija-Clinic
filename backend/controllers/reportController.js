const Report = require('../models/Report');
const Patient = require('../models/Patient');
const { cloudinary, isCloudinaryConfigured } = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

// Helper to upload document (PDF or Image)
const handleDocumentUpload = async (file) => {
  if (!file) {
    throw new Error('No file uploaded');
  }

  if (isCloudinaryConfigured) {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'girija_clinic_reports',
        resource_type: 'auto' // Autodetect pdf vs images
      });
      // Delete temporary local file
      fs.unlinkSync(file.path);
      return result.secure_url;
    } catch (err) {
      console.error('Cloudinary Document Upload Error:', err.message);
      return `/uploads/${file.filename}`;
    }
  } else {
    return `/uploads/${file.filename}`;
  }
};

// @desc    Upload patient lab/medical report
// @route   POST /api/reports/upload
// @access  Private
const uploadReport = async (req, res, next) => {
  try {
    const { patientId, reportName, reportType, notes } = req.body;

    if (!patientId || !reportName || !reportType) {
      res.status(400);
      throw new Error('Please provide patientId, reportName and reportType');
    }

    if (!req.file) {
      res.status(400);
      throw new Error('Please upload a file (PDF or Image)');
    }

    // Verify patient
    const patientObj = await Patient.findById(patientId);
    if (!patientObj) {
      res.status(404);
      throw new Error('Patient not found');
    }

    const fileUrl = await handleDocumentUpload(req.file);

    const report = new Report({
      patient: patientId,
      reportName,
      reportType,
      fileUrl,
      notes: notes || ''
    });

    const savedReport = await report.save();

    res.status(201).json({
      success: true,
      report: savedReport
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      try { fs.unlinkSync(req.file.path); } catch (e) {}
    }
    next(error);
  }
};

// @desc    Get patient reports
// @route   GET /api/reports/patient/:id
// @access  Private
const getPatientReports = async (req, res, next) => {
  try {
    const reports = await Report.find({ patient: req.params.id }).sort({ uploadDate: -1 });
    res.json({
      success: true,
      reports
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete medical report
// @route   DELETE /api/reports/:id
// @access  Private
const deleteReport = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      res.status(404);
      throw new Error('Report not found');
    }

    // Delete record from DB
    await report.deleteOne();

    res.json({
      success: true,
      message: 'Report deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload file directly to Cloudinary and return secure_url and public_id
// @route   POST /api/reports/upload-cloudinary
// @access  Private
const uploadCloudinaryFile = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error('Please upload a file (PDF or Image)');
    }

    if (isCloudinaryConfigured) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'girija_clinic_reports',
          resource_type: 'auto'
        });
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(200).json({
          secure_url: result.secure_url,
          public_id: result.public_id
        });
      } catch (err) {
        console.error('Cloudinary Document Upload Error:', err.message);
        const localUrl = `/uploads/${req.file.filename}`;
        return res.status(200).json({
          secure_url: localUrl,
          public_id: `local_${req.file.filename}`
        });
      }
    } else {
      const localUrl = `/uploads/${req.file.filename}`;
      return res.status(200).json({
        secure_url: localUrl,
        public_id: `local_${req.file.filename}`
      });
    }
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      try { fs.unlinkSync(req.file.path); } catch (e) {}
    }
    next(error);
  }
};

// @desc    Delete file directly from Cloudinary using publicId
// @route   POST /api/reports/delete-cloudinary
// @access  Private
const deleteCloudinaryFile = async (req, res, next) => {
  try {
    const { publicId } = req.body;
    if (!publicId) {
      res.status(400);
      throw new Error('Please provide publicId');
    }

    if (publicId.startsWith('local_')) {
      const filename = publicId.replace('local_', '');
      const filepath = path.join(__dirname, '../uploads', filename);
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      return res.status(200).json({
        success: true,
        message: 'Local file deleted successfully'
      });
    }

    if (isCloudinaryConfigured) {
      await cloudinary.uploader.destroy(publicId);
      return res.status(200).json({
        success: true,
        message: 'Cloudinary resource deleted successfully'
      });
    } else {
      return res.status(200).json({
        success: true,
        message: 'No Cloudinary credentials, did not delete anything'
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadReport,
  getPatientReports,
  deleteReport,
  uploadCloudinaryFile,
  deleteCloudinaryFile
};
