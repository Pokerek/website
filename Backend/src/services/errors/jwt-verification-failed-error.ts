import AuthorizationError from "../../errors/authorization-error";

export default class JWTVerificationFailedError extends AuthorizationError {
    constructor() {
        super('JWT verification failed!');
    }
}