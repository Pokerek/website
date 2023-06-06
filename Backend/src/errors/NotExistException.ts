import HttpException from './HttpException';

class NotExistException extends HttpException {
  constructor(name: string) {
    super(404, `${name} not exist.`);
  }
}

export default NotExistException;
