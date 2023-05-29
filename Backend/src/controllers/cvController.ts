import { NextFunction, Request, Response } from 'express';
import { RequestWithFile } from '../types/request';
import NotFileException from '../errors/NotFileException';

class CVController {
  public getCvFile = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      response.sendFile('cv.pdf', { root: './uploads' });
    } catch (error) {
      next(error);
    }
  };

  public updateCV = async (
    request: RequestWithFile,
    response: Response,
    next: NextFunction
  ) => {
    if (!request.file) {
      next(new NotFileException());
      return;
    }

    response.send({ message: 'File uploaded' });
  };
}

export default CVController;
