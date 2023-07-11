import { StatusCodes } from "http-status-codes";

import HttpError from "../../errors/http-error";

export default class AccountNotFoundError extends HttpError {
    constructor(username: string) {
        super(StatusCodes.NOT_FOUND, `Account with username: ${username} not found!`);
    }
}