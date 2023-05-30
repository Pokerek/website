import { Router } from 'express';
import AuthenticationController from '../controllers/authenticationController';
import RouterWithPath from '../types/router';
import blockEndpoint from '../utils/blockEndpoint';

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
      // validationMiddleware(LogInDto),
      this.authenticationController.loggingIn
    );
    this.router.post(
      `${this.path}/registration`,
      blockEndpoint,
      // validationMiddleware(CreateUserDto),
      this.authenticationController.registration
    );
  }
}

export default AuthenticationRoutes;
