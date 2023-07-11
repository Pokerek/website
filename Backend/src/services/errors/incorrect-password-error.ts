import AuthorizationError from "../../errors/authorization-error";

export default class IncorrectPasswordError extends AuthorizationError {
    constructor() {
        super('Incorrect password!');
    }
}