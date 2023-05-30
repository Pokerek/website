import { Router } from 'express';
import CVController from '../controllers/cvController';
import RouterWithPath from '../types/router';
import multer from 'multer';
import authMiddleware from '../middleware/authMiddleware';

class CVRoutes implements RouterWithPath {
  public path = '/cv';
  public router = Router();

  private cvController = new CVController();
  private storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, 'cv.pdf');
    }
  });
  private upload = multer({ storage: this.storage });

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.cvController.getCvFile);
    this.router.post(
      this.path,
      authMiddleware,
      this.upload.single('cv'),
      this.cvController.updateCV
    );
  }
}

export default CVRoutes;
