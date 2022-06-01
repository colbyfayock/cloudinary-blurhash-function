require('dotenv').config();

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const image = cloudinary.url(process.env.CLOUDINARY_IMAGE_PUBLIC_ID, {
  sign_url: true,
  secure: true,
  custom_function:{
    function_type: 'remote',
    source: process.env.NETLIFY_FUNCTION_ENDPOINT
  },
  transformation: [
    {
      flags: 'no_cache'
    }
  ]
});

console.log('<<< Image');
console.log(image);
console.log('>>> Image');