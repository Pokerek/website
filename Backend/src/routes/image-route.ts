import { Router } from 'express';

import RouterWithPath from '../types/router';
import ImageController from '../controllers/image-controller';

class ImageRoutes implements RouterWithPath {
  public path = '/images';
  public router = Router();

  private imageController = new ImageController();

  constructor() {
    this.config();
  }

  private config() {
    this.router.get(`${this.path}/:name`, this.imageController.getImage);
  }
}

export default ImageRoutes;
