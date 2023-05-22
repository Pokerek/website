import HttpException from './HttpException';

class UserAlreadyExistException extends HttpException {
  constructor() {
    super(409, 'User already exist.');
  }
}

export default UserAlreadyExistException;
