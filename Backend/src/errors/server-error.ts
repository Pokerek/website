import { StatusCodes } from 'http-status-codes';

import HttpError from './http-error';

export default class ServerError extends HttpError {
  constructor(message: string) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message);
  }
}