import HttpException from './HttpException';

class WrongCredentialsException extends HttpException {
  constructor() {
    super(401, `That user don't exists.`);
  }
}

export default WrongCredentialsException;
