const multer = require('multer');
const path = require('path');

// Konfigurasi tempat penyimpanan & penamaan file otomatis unik
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); // Masuk ke folder Backend/uploads
  },
  filename: function (req, file, cb) {
    // Memberikan nama unik menggunakan timestamp agar file tidak saling menimpa
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Filter file untuk memastikan hanya gambar yang boleh diupload
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Hanya file gambar (JPG/PNG) yang diperbolehkan!'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;