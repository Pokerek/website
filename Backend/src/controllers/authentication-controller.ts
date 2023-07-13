import { NextFunction, Response } from "express";

import AuthenticationService from "../services/authentication-service";
import AuthenticationValidation from "./validations/authentication-validation";

import { AuthenticationRequest } from "../types";

export default class AuthenticationController {
    private authenticationService = new AuthenticationService();

    login = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
        const { username, password } = req.credentials!;

        try {
            await AuthenticationValidation.login({ username, password });
            const response = await this.authenticationService.login(username, password);
            res.send(response);
        }
        catch (error) {
            next(error);
        }
    }

    registration = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
        const { username, password } = req.credentials!;
        const { email } = req.body;

        try {
            await AuthenticationValidation.registration({ username, email, password });
            const response = await this.authenticationService.registration(username, email, password);
            res.send(response);
        }
        catch (error) {
            next(error);
        }
    }
}