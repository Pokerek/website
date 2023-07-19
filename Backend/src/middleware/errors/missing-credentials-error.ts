import AuthorizationError from "../../errors/authorization-error";

export default class MissingCredentialsError extends AuthorizationError {
    constructor() {
        super("Missing credentials");
    }
}