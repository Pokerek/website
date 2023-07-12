import { StatusCodes } from 'http-status-codes';

import HttpException from '../../errors/http-error';

export default class WrongCredentialsError extends HttpException {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, 'Wrong credentials provided');
  }
}