import {
  Request,
  Response,
  NextFunction
} from 'express';


import HttpError from '../errors/http-error';

export default function errorMiddleware(
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const code = error.statusCode || 500;
  const message = error.message || 'Something went wrong.';

  if (code === 500) {
    console.error(error);
    res.send({
      message: 'Something went wrong.'
    });
  }

  res.status(code).send({
    message
  });


  next();
}