import HttpException from './http-error';

// Todo: Move after create ImageService
class NotExistException extends HttpException {
  constructor(name: string) {
    super(404, `${name} not exist.`);
  }
}

export default NotExistException;
