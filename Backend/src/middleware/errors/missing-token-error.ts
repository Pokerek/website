import AuthorizationError from '../../errors/authorization-error';

export default class MissingTokenError extends AuthorizationError {
  constructor() {
    super('Missing token');
  }
}