import { NextFunction, Request, Response } from 'express';
import fs from 'fs';

import RequiredError from './errors/required-error';

class imageMiddleware {
  static deleteImage = (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    next();
  };

  static imageRequired = (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      throw new RequiredError('Image');
    }

    req.body.url = '/images/' + req.file.filename;
    next();
  };
}

export default imageMiddleware;
