import { StatusCodes } from 'http-status-codes';

import HttpError from '../../errors/http-error';

export default class MissedTokenError extends HttpError {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, 'You lost your token, please login again.');
  }
}