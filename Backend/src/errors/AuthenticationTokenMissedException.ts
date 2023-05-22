import HttpException from './HttpException';

class AuthenticationTokenMissedException extends HttpException {
  constructor() {
    super(401, 'You lost your token, please login again.');
  }
}

export default AuthenticationTokenMissedException;
