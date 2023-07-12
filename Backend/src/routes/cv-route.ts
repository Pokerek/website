import { Router } from 'express';
import CVController from '../controllers/cv-controller';
import RouterWithPath from '../types/router';
import authMiddleware from '../middleware/auth-middleware';
import { uploadCV } from '../config/multer';

class CVRoutes implements RouterWithPath {
  public path = '/cv';
  public router = Router();

  private cvController = new CVController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.cvController.getCvFile);
    this.router.post(
      this.path,
      authMiddleware,
      uploadCV.single('cv'),
      this.cvController.updateCV
    );
  }
}

export default CVRoutes;
