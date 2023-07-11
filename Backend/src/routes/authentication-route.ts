import { Router } from 'express';


import AuthenticationController from '../controllers/authentication-controller';
import AuthenticationService from '../services/authentication-service';
import blockEndpoint from '../utils/blockEndpoint';

import RouterWithPath from '../types/router';

class AuthenticationRoutes implements RouterWithPath {
  public path = '/auth';
  public router = Router();

  private authenticationController = new AuthenticationController(new AuthenticationService());

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
      this.authenticationController.login
    );
    this.router.post(
      `${this.path}/registration`,
      blockEndpoint,
      this.authenticationController.registration
    );
  }
}

export default AuthenticationRoutes;
