import { Router } from 'express';

import { uploadCV } from '../config/multer';
import CVController from '../controllers/cv-controller';
import authorizationMiddleware from '../middleware/authorization-middleware';

import RouterWithPath from '../types/router';

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
      authorizationMiddleware,
      uploadCV.single('cv'),
      this.cvController.updateCV
    );
  }
}

export default CVRoutes;
