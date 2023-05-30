import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { DataStoredInToken } from '../types/authentication';
import AuthenticationTokenMissedException from '../errors/AuthenticationTokenMissedException';
import WrongAuthenticationTokenException from '../errors/WrongAuthenticationTokenException';
import { RequestWithUser } from '../types/request';
import userModel from '../database/models/userModel';

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
      const user = await userModel.findById(id);
      if (user) {
        req.user = user;
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissedException());
  }
}

export default authMiddleware;
