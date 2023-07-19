import {
    Response,
    NextFunction,
} from "express";

import MissingAuthorizationHeaderError from "./errors/missing-authorization-header-error";
import InvalidAuthorizationTypeError from "./errors/invalid-authorization-type-error";
import InvalidBasicAuthorizationHeaderFormatError from "./errors/invalid-basic-authorization-header-format-error";
import MissingCredentialsError from "./errors/missing-credentials-error";

import { AuthenticationRequest } from "../types";

export default function authenticationMiddleware(
    req: AuthenticationRequest,
    res: Response,
    next: NextFunction
): void {
    const { authorization } = req.headers;

    if (!authorization) {
        throw new MissingAuthorizationHeaderError();
    }

    const [
        authorizationType,
        authorizationCredentials
    ] = authorization.split(" ");

    if (authorizationType.toLowerCase() !== "basic") {
        throw new InvalidAuthorizationTypeError(authorizationType.toLowerCase(), "basic");
    }
    if (!authorizationCredentials) {
        throw new InvalidBasicAuthorizationHeaderFormatError();
    }

    const [username, password] = Buffer
        .from(authorizationCredentials, "base64")
        .toString('utf-8')
        .split(":");

    if (!username || !password) {
        throw new MissingCredentialsError();
    }

    req.credentials = {
        username,
        password
    };

    next();
}