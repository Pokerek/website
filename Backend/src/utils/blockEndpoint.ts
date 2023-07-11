import { NextFunction, Request, Response } from 'express';
import HttpError from '../errors/http-error';

const blockEndpoint = (req: Request, res: Response, next: NextFunction) => {
  next(new HttpError(500, 'This endpoint is blocked.'));
};

export default blockEndpoint;
