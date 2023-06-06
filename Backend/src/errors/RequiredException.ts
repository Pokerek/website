import HttpException from './HttpException';

class RequiredException extends HttpException {
  constructor(name: string) {
    super(422, `${name} is required.`);
  }
}

export default RequiredException;
