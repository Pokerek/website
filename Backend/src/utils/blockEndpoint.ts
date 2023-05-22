import { NextFunction, Request, Response } from 'express';
import HttpException from '../errors/HttpException';

const blockEndpoint = (req: Request, res: Response, next: NextFunction) => {
  next(new HttpException(500, 'This endpoint is blocked.'));
};

export default blockEndpoint;
