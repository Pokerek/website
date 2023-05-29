import { Request } from 'express';
import User from './user';

export interface RequestWithUser extends Request {
  user?: User;
}

export interface RequestWithFile extends Request {
  file?: Express.Multer.File;
}
