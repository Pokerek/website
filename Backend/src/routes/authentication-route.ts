import GenericRoute from './generic-route';
import AuthenticationController from '../controllers/authentication-controller';
import credentialsMiddleware from '../middleware/authentication-middleware';
import blockEndpoint from '../utils/blockEndpoint';

export default class AuthenticationRoutes extends GenericRoute {
  private authenticationController = new AuthenticationController();

  constructor(path: string) {
    super(path);

    this.router.get(
      `${this.path}/login`,
      credentialsMiddleware,
      this.authenticationController.login
    );

    this.router.post(
      `${this.path}/registration`,
      blockEndpoint,
      credentialsMiddleware,
      this.authenticationController.registration
    );
  }
}