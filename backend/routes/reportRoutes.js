const express = require('express');
const router = express.Router();
const { 
  uploadReport, 
  getPatientReports, 
  deleteReport,
  uploadCloudinaryFile,
  deleteCloudinaryFile
} = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/upload', protect, upload.single('file'), uploadReport);
router.post('/upload-cloudinary', upload.single('file'), uploadCloudinaryFile);
router.post('/delete-cloudinary', deleteCloudinaryFile);
router.get('/patient/:id', protect, getPatientReports);
router.delete('/:id', protect, deleteReport);

module.exports = router;
