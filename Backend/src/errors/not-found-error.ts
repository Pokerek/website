import { StatusCodes } from 'http-status-codes';

import HttpError from './http-error';

export default class NotFoundError extends HttpError {
  constructor(id: string, name: string) {
    super(StatusCodes.NOT_FOUND, `${name} with id: ${id} not found.`);
  }
}