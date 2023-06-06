import multer from 'multer';
import { randomUUID } from 'crypto';

const storageCV = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, 'cv.pdf');
  }
});

const uploadCV = multer({ storage: storageCV });

const storageSkillImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images/');
  },
  filename: function (req, file, cb) {
    cb(null, `${randomUUID()}.png`);
  }
});

const uploadSkillImage = multer({ storage: storageSkillImage });

export { uploadCV, uploadSkillImage };
