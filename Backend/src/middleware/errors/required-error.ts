import { StatusCodes } from 'http-status-codes';

import HttpError from '../../errors/http-error';

export default class RequiredError extends HttpError {
  constructor(name: string) {
    super(StatusCodes.BAD_REQUEST, `${name} is required.`);
  }
}