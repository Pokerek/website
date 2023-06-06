import { Request, Response, NextFunction } from 'express';
import HttpException from '../errors/HttpException';

function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const code = error.code || 500;
  const message = error.message || 'Something went wrong.';
  res.status(code).send({
    code,
    message
  });

  next();
}

export default errorMiddleware;
