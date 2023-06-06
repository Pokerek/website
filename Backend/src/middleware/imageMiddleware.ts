import { NextFunction, Request, Response } from 'express';
import fs from 'fs';

import RequiredException from '../errors/RequiredException';

class imageMiddleware {
  static deleteImage = (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    next();
  };

  static imageRequired = (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      throw new RequiredException('Image');
    }

    next();
  };
}

export default imageMiddleware;
