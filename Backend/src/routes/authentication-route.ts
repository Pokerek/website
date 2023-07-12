import AuthenticationController from '../controllers/authentication-controller';
import AuthenticationService from '../services/authentication-service';
import credentialsMiddleware from '../middleware/authentication-middleware';
import blockEndpoint from '../utils/blockEndpoint';

import GenericRoute from './generic-route';

export default class AuthenticationRoutes extends GenericRoute {
  private authenticationController = new AuthenticationController(new AuthenticationService());

  constructor(path: string) {
    super(path);

    this.router.get(
      `${this.path}/login`,
      credentialsMiddleware,
      this.authenticationController.login
    );

    this.router.post(
      `${this.path}/registration`,
      credentialsMiddleware,
      this.authenticationController.registration
    );
  }
}