import HttpException from './HttpException';

class AlreadyExistException extends HttpException {
  constructor(name: string) {
    super(409, `${name} already exist.`);
  }
}

export default AlreadyExistException;
