import { NextFunction, Request, Response, Router } from 'express';
import Controller from '../types/router';
import { RequestWithUser } from '../types/request';
import NotFoundException from '../errors/NotFoundException';
import cvModel, { CV } from './cv.model';
import authMiddleware from '../middleware/authMiddleware';
import generate from './func/generate';
import convert from './func/convert';
import HttpException from '../errors/HttpException';
import projectModel, { Project } from '../database/models/projectModel';
import ServerErrorException from '../errors/ServerErrorException';
import { getFile } from './func/fileHelpers';

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
    this.router.get(`${this.path}/get`, this.getCV);
    this.router.get(`${this.path}/social`, this.getSocialIcons);
    // this.router.get(`${this.path}/create`, authMiddleware, this.createDocument);
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

  private createDocument = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const responseCvData = await this.cv.findOne();
      if (!responseCvData) throw new ServerErrorException();
      const name = `${responseCvData.firstName}_${responseCvData.lastName}`;
      const responseProjectData: Project[] = await this.project.find();

      generate(responseCvData, responseProjectData);

      convert(name);
      res.send('Your cv is ready.');
    } catch {
      next(new ServerErrorException());
    }
  };

  private getCV = (req: Request, res: Response) => {
    const name = `Karol_Chrobok`;
    const { file, stat } = getFile(`${name}_cv.pdf`);
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${name}_cv.pdf`);
    file.pipe(res);
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
}

export default CVController;
