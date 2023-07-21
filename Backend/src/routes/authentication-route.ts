import GenericRoute from './generic-route';
import AuthenticationController from '../controllers/authentication-controller';
import credentialsMiddleware from '../middleware/authentication-middleware';
import authorizationMiddleware from '../middleware/authorization-middleware';
import blockEndpoint from '../utils/blockEndpoint';

const PATH = '/auth';

export const AUTHENTICATION_ROUTES = {
  LOGIN: {
    path: `${PATH}/login`,
    method: 'GET',
    protected: true,
  },
  LOGOUT: {
    path: `${PATH}/logout`,
    method: 'GET',
    protected: true,
  },
  CHECK_SESSION: {
    path: `${PATH}/checkSession`,
    method: 'GET',
    protected: true,
  },
  REGISTRATION: {
    path: `${PATH}/registration`,
    method: 'POST',
    protected: true,
  }
}

export default class AuthenticationRoutes extends GenericRoute {
  private authenticationController = new AuthenticationController();

  constructor() {
    super(PATH);

    this.router.get(
      AUTHENTICATION_ROUTES.LOGIN.path,
      credentialsMiddleware,
      this.authenticationController.login
    );

    this.router.get(
      AUTHENTICATION_ROUTES.LOGOUT.path,
      authorizationMiddleware,
      this.authenticationController.logout
    );

    this.router.get(
      AUTHENTICATION_ROUTES.CHECK_SESSION.path,
      authorizationMiddleware,
      this.authenticationController.checkSession
    );

    this.router.post(
      AUTHENTICATION_ROUTES.REGISTRATION.path,
      blockEndpoint,
      credentialsMiddleware,
      this.authenticationController.registration
    );
  }
}