import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import MissedTokenError from './errors/missed-token-error';

import { DataStoredInToken } from '../types/authentication';
import { RequestWithUser } from '../types/request';

async function authMiddleware(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const cookies = req.cookies;
  if (cookies && cookies.Authorization) {
    const secret = process.env.JWT_SECRET || '';
    try {
      const verificationResponse = jwt.verify(
        cookies.Authorization,
        secret
      ) as DataStoredInToken;

      const id = verificationResponse._id;
      // todo: check if user is active
      const user = null;
      if (user) {
        req.user = user;
        next();
      } else {
        next(new MissedTokenError());
      }
    } catch (error) {
      next(new MissedTokenError());
    }
  } else {
    next(new MissedTokenError());
  }
}

export default authMiddleware;
