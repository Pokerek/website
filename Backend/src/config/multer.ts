import multer from 'multer';

const storageCV = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, 'cv.pdf');
  }
});

const uploadCV = multer({ storage: storageCV });

export default uploadCV;
