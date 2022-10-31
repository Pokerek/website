import { NextFunction, Request, Response, Router } from 'express';
import Controller from '../interface/controller.interface';
import RequestWithUser from '../interface/requestWithUser.interface';
import NotFoundException from '../exceptions/NotFoundException';
import cvModel, { CV } from './cv.model';
import authMiddleware from '../middleware/authMiddleware';
import generate from './func/generate';

class CVController implements Controller {
  public path = '/cv';
  public router = Router();
  private cv = cvModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.createCV);
    this.router.patch(`${this.path}/:id`, authMiddleware, this.modifyCV);
  }

  private createCV = (req: Request, res: Response) => {
    this.cv.findOne().then((cvData) => {
      if (cvData) {
        generate(cvData);
      }
    });
    res.send('Cv generate!');
  };

  private modifyCV = (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const cvBody: CV = req.body;
    this.cv.findByIdAndUpdate(id, cvBody, { new: true }).then((cv) => {
      if (cv) {
        res.send({ message: 'CV update!' });
      }

      next(new NotFoundException(id, 'CV'));
    });
  };
}

export default CVController;
