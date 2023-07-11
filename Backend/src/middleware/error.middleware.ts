import { Request, Response, NextFunction } from 'express';
import HttpError from '../errors/http-error';

function errorMiddleware(
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const code = error.statusCode || 500;
  const message = error.message || 'Something went wrong.';
  res.status(code).send({
    code,
    message
  });

  next();
}

export default errorMiddleware;
