import { Response, NextFunction } from 'express';

import MissingAuthorizationHeaderError from './errors/missing-authorization-header-error';
import InvalidAuthorizationTypeError from './errors/invalid-authorization-type-error';
import MissingTokenError from './errors/missing-token-error';

import { AuthorizationRequest } from '../types';
import JWTService from '../services/jwt-service';

export default function authorizationMiddleware(
    req: AuthorizationRequest,
    res: Response,
    next: NextFunction
) {
    const { cookie } = req.headers;
    if (!cookie) {
        throw new MissingAuthorizationHeaderError();
    }

    const [
        authorizationType,
        authorizationToken
    ] = cookie.split("=");
    if (authorizationType.toLowerCase() !== "token") {
        throw new InvalidAuthorizationTypeError(authorizationType.toLowerCase(), "token");
    }
    if (!authorizationToken) {
        throw new MissingTokenError();
    }

    const token = JWTService.verify(authorizationToken);
    req.user = {
        id: token.id,
        username: token.username,
        expiresAt: new Date(token.exp * 1000),
    };

    next();
}

