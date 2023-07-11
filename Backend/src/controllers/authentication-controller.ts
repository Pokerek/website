import { NextFunction, Request, Response } from "express";

import type AuthenticationService from "../services/authentication-service";
import AuthenticationValidation from "./validations/authentication-validation";

export default class AuthenticationController {
    private authenticationService: AuthenticationService;

    constructor(authenticationService: AuthenticationService) {
        this.authenticationService = authenticationService;
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        const { username, password } = req.body;

        try {
            await AuthenticationValidation.login({ username, password });
            const { cookie, user } = await this.authenticationService.login(username, password);
            res.setHeader('Set-Cookie', [cookie]);
            res.send(user);
        }
        catch (error) {
            next(error);
        }
    }

    registration = async (req: Request, res: Response, next: NextFunction) => {
        const { username, email, password } = req.body;
        try {
            await AuthenticationValidation.registration({ username, email, password });
            const { cookie, user } = await this.authenticationService.registration(username, email, password);
            res.setHeader('Set-Cookie', [cookie]);
            res.send(user);
        }
        catch (error) {
            next(error);
        }
    }
}