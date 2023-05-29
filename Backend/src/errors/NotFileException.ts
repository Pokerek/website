import HttpException from './HttpException';

class NotFileException extends HttpException {
  constructor() {
    super(400, `No file uploaded.`);
  }
}

export default NotFileException;
