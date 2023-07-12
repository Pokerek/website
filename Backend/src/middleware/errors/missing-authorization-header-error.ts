import AuthorizationError from "../../errors/authorization-error";

export default class MissingAuthorizationHeaderError extends AuthorizationError {
    constructor() {
        super("Missing authorization header");
    }
}