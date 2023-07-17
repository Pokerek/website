import { Request, Response, NextFunction } from 'express';

import MailValidation from './validations/mail-validation';
import MailService from '../services/mail-service';

export default class MailController {
  sendMail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const validatedBodyMail = MailValidation.createMail(req.body);

      await MailService.sendMail(validatedBodyMail);

      res.json({ message: 'Email sent' });
    } catch (error) {
      next(error);
    }
  };
}