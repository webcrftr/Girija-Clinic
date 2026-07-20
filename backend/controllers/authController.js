const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Generate JWT Helper
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecret_girijaclinic_token', {
    expiresIn: '30d' // Token valid for 30 days
  });
};

// @desc    Auth Admin & Get Token
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide email and password');
    }

    // Find admin by email
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.comparePassword(password))) {
      res.json({
        success: true,
        token: generateToken(admin.id),
        admin: {
          _id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role
        }
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get Admin Profile
// @route   GET /api/auth/me
// @access  Private
const getAdminProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id).select('-password');
    if (admin) {
      res.json({
        success: true,
        admin
      });
    } else {
      res.status(404);
      throw new Error('Admin not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update Admin Profile
// @route   PUT /api/auth/me
// @access  Private
const updateAdminProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user._id);

    if (admin) {
      admin.name = req.body.name || admin.name;
      admin.email = req.body.email || admin.email;
      
      if (req.body.password) {
        admin.password = req.body.password;
      }

      const updatedAdmin = await admin.save();
      
      res.json({
        success: true,
        admin: {
          _id: updatedAdmin._id,
          name: updatedAdmin.name,
          email: updatedAdmin.email,
          role: updatedAdmin.role
        },
        token: generateToken(updatedAdmin._id)
      });
    } else {
      res.status(404);
      throw new Error('Admin not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginAdmin,
  getAdminProfile,
  updateAdminProfile
};
