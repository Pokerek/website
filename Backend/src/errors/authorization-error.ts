import { StatusCodes } from 'http-status-codes';

import HttpError from './http-error';

export default class AuthorizationError extends HttpError {
    constructor(message: string) {
        super(StatusCodes.UNAUTHORIZED, message);
    }
}