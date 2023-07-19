import { NextFunction, Response } from "express";

import AuthenticationService from "../services/authentication-service";
import AuthenticationValidation from "./validations/authentication-validation";

import { AuthenticationRequest, AuthorizationRequest } from "../types";

export default class AuthenticationController {
    private authenticationService = new AuthenticationService();

    login = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
        try {
            const loginInput = AuthenticationValidation.login(req.credentials!);
            const response = await this.authenticationService.login(loginInput);

            res.cookie(
                "token",
                response.token,
                {
                    httpOnly: true,
                    expires: response.expiresAt,
                }
            ).send(
                {
                    username: response.username,
                    expiresAt: response.expiresAt,
                    message: response.message,
                }
            );
        }
        catch (error) {
            next(error);
        }
    }

    registration = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
        const { email } = req.body;

        try {
            const registerInput = AuthenticationValidation.registration({ ...req.credentials!, email });
            const response = await this.authenticationService.registration(registerInput);
            res.cookie(
                "token",
                response.token,
                {
                    httpOnly: true,
                    expires: response.expiresAt,
                }
            ).send(
                {
                    username: response.username,
                    expiresAt: response.expiresAt,
                    message: response.message,
                }
            );
        }
        catch (error) {
            next(error);
        }
    }

    checkSession = async (req: AuthorizationRequest, res: Response, next: NextFunction) => {
        try {
            const { username, expiresAt } = AuthenticationValidation.checkSession(req.user);

            res.send({
                username,
                expiresAt,
                message: 'Session is valid!',
            });
        } catch (error) {
            next(error);
        }
    }

    logout = async (req: AuthorizationRequest, res: Response, next: NextFunction) => {
        try {
            res.clearCookie("token");
            res.send({
                message: 'Logged out successfully!',
            });
        }
        catch (error) {
            next(error);
        }
    }


}