import { Router } from 'express';
import AuthenticationController from '../controllers/authenticationController';
import RouterWithPath from '../types/router';
import blockEndpoint from '../utils/blockEndpoint';
import validationMiddleware from '../middleware/validationMiddleware';
import { loginSchema, registerSchema } from '../validations/authentication';

class AuthenticationRoutes implements RouterWithPath {
  public path = '/auth';
  public router = Router();

  private authenticationController = new AuthenticationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(loginSchema),
      this.authenticationController.login
    );
    this.router.post(
      `${this.path}/registration`,
      blockEndpoint,
      validationMiddleware(registerSchema),
      this.authenticationController.registration
    );
  }
}

export default AuthenticationRoutes;
