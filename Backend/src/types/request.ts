import { Request } from 'express';
import { User } from '../database/models/usersModel';

export interface RequestWithUser extends Request {
  user?: User;
}

export interface RequestWithFile extends Request {
  file?: Express.Multer.File;
}
