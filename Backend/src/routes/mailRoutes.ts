import { Router } from 'express';
import MailController from '../controllers/mailController';
import RouterWithPath from '../types/router';
import validationMiddleware from '../middleware/validationMiddleware';
import { mailSchema } from '../validations/mail';

class MailRoutes implements RouterWithPath {
  public path = '/message';
  public router = Router();

  private mailController = new MailController();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.post(
      this.path,
      validationMiddleware(mailSchema),
      this.mailController.sendMail
    );
  }
}

export default MailRoutes;
