const multer = require('multer');

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + ' ' + Date.now());
  },
});

const upload = multer({ storage: Storage }).single('image');
module.exports = upload;
