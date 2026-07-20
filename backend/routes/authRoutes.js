const express = require('express');
const router = express.Router();
const { loginAdmin, getAdminProfile, updateAdminProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.route('/me')
  .get(protect, getAdminProfile)
  .put(protect, updateAdminProfile);

module.exports = router;
