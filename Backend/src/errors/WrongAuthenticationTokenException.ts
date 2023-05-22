import HttpException from './HttpException';

class WrongAuthenticationTokenException extends HttpException {
  constructor() {
    super(401, 'You have wrong token please login again.');
  }
}

export default WrongAuthenticationTokenException;
