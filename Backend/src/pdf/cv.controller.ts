import { NextFunction, Request, Response, Router } from 'express';
import Controller from '../interface/controller.interface';
import RequestWithUser from '../interface/requestWithUser.interface';
import NotFoundException from '../exceptions/NotFoundException';
import cvModel, { CV } from './cv.model';
import authMiddleware from '../middleware/authMiddleware';
import generate from './func/generate';
//import convert from './func/convert';
import HttpException from '../exceptions/HttpException';
import projectModel from '../projects/projects.model';

class CVController implements Controller {
  public path = '/cv';
  public router = Router();
  private cv = cvModel;
  private project = projectModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getCVInformation);
    this.router.get(`${this.path}/document`, this.createDocument);
    this.router.get(`${this.path}/social`, this.getSocialIcons);
    this.router.patch(`${this.path}/:id`, authMiddleware, this.modifyData);
  }

  private getCVInformation = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    this.cv.findOne().then((cvInformation) => {
      if (!cvInformation) {
        next(new HttpException(500, 'Something went wrong.'));
      }

      res.send(cvInformation);
    });
  };

  private getSocialIcons = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    this.cv.findOne().then((cvInformation) => {
      if (!cvInformation) {
        next(new HttpException(500, 'Something went wrong.'));
      }

      const socialIcons = cvInformation?.social;

      res.send(socialIcons);
    });
  };

  private createDocument = async (req: Request, res: Response) => {
    const responseCvData = await this.cv.findOne();
    const responseProjectData = await this.project.find();

    const convertedCvData: CV = this.convertForType(responseCvData);
    const convertedProjectData: Project[] =
      this.convertForType(responseProjectData);
    generate(convertedCvData, convertedProjectData);
    //convert();
    res.send('CV was created.');
  };

  private modifyData = (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const cvBody: CV = req.body;
    this.cv.findByIdAndUpdate(id, cvBody, { new: true }).then((cv) => {
      if (!cv) {
        next(new NotFoundException(id, 'CV'));
      }

      res.send({ message: 'CV update!' });
    });
  };

  private convertForType = (data: any) => {
    return JSON.parse(JSON.stringify(data));
  };
}

export default CVController;
