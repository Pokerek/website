import HttpException from './HttpException';

class ServerErrorException extends HttpException {
  constructor() {
    super(500, `Something went wrong.`);
  }
}

export default ServerErrorException;
