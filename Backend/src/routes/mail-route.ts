import { Router } from 'express';
import MailController from '../controllers/mail-controller';
import RouterWithPath from '../types/router';
import validationMiddleware from '../middleware/validation-middleware';
import { mailSchema } from '../controllers/validations/mail-validation';

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
