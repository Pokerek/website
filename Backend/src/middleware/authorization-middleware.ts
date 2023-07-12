import { Response, NextFunction } from 'express';

import MissingAuthorizationHeaderError from './errors/missing-authorization-header-error';
import InvalidAuthorizationTypeError from './errors/invalid-authorization-type-error';
import MissingTokenError from './errors/missing-token-error';

import { AuthorizationRequest } from '../types';
import JWTService from '../services/jwt-service';

export default function authorizationMiddleware(req: AuthorizationRequest, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new MissingAuthorizationHeaderError();
    }

    const [
        authorizationType,
        authorizationToken
    ] = authorization.split(" ");
    if (authorizationType.toLowerCase() !== "bearer") {
        throw new InvalidAuthorizationTypeError(authorizationType.toLowerCase(), "bearer");
    }
    if (!authorizationToken) {
        throw new MissingTokenError();
    }

    const token = JWTService.verify(authorizationToken);

    req.user = token;

    next();
}

