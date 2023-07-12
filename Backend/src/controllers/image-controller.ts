import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import NotExistException from '../errors/NotExistException';

export default class ImageController {
  public getImage = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.params;

    if (!fs.existsSync(`./uploads/images/${name}`))
      return next(new NotExistException('Image'));

    res.sendFile(`${name}`, { root: './uploads/images' });
  };
}