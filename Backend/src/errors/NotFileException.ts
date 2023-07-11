import HttpException from './http-error';

// Todo: Move after create CvService
class NotFileException extends HttpException {
  constructor() {
    super(400, `No file uploaded.`);
  }
}

export default NotFileException;
