const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

let isCloudinaryConfigured = false;

if (
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  isCloudinaryConfigured = true;
  console.log('Cloudinary successfully configured for media storage.');
} else {
  console.warn('Cloudinary environment variables missing. Storing uploads locally in "backend/uploads" directory.');
}

module.exports = {
  cloudinary,
  isCloudinaryConfigured
};
