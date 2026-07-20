const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const Settings = require('../models/Settings');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/girija-clinic';
    console.log(`Connecting to MongoDB at: ${connStr}...`);
    
    // Connect to database
    // Set strictQuery for Mongoose
    mongoose.set('strictQuery', false);
    
    const conn = await mongoose.connect(connStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Seed initial admin if empty
    await seedAdmin();
    // Seed initial settings if empty
    await seedSettings();
    
  } catch (error) {
    console.error(`Database connection warning: ${error.message}`);
    console.log('Running backend with database connection warnings. Make sure MongoDB is active.');
  }
};

const seedAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      console.log('No admin users found. Creating default admin...');
      const defaultAdmin = new Admin({
        name: 'Administrator',
        email: 'admin@girijaclinic.com',
        password: 'adminpassword123', // Clean password (hashed by pre-save hook)
        role: 'admin'
      });
      await defaultAdmin.save();
      console.log('Default admin created successfully: admin@girijaclinic.com / adminpassword123');
    }
  } catch (err) {
    console.error('Failed to seed default admin:', err.message);
  }
};

const seedSettings = async () => {
  try {
    const settingsCount = await Settings.countDocuments();
    if (settingsCount === 0) {
      console.log('No clinic settings found. Initing default config...');
      const defaultSettings = new Settings({});
      await defaultSettings.save();
      console.log('Default clinic config initialized.');
    }
  } catch (err) {
    console.error('Failed to seed default settings:', err.message);
  }
};

module.exports = connectDB;
