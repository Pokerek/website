import GenericRoute from './generic-route';
import AuthenticationController from '../controllers/authentication-controller';
import credentialsMiddleware from '../middleware/authentication-middleware';
import blockEndpoint from '../utils/blockEndpoint';
import authorizationMiddleware from '../middleware/authorization-middleware';

export default class AuthenticationRoutes extends GenericRoute {
  private authenticationController = new AuthenticationController();

  constructor() {
    super('/auth');

    this.router.get(
      `${this.path}/login`,
      credentialsMiddleware,
      this.authenticationController.login
    );

    this.router.get(
      `${this.path}/logout`,
      authorizationMiddleware,
      this.authenticationController.logout
    );

    this.router.get(
      `${this.path}/checkSession`,
      authorizationMiddleware,
      this.authenticationController.checkSession
    );

    this.router.post(
      `${this.path}/registration`,
      blockEndpoint,
      credentialsMiddleware,
      this.authenticationController.registration
    );
  }
}