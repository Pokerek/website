import { NextFunction, Response } from "express";

import AuthenticationService from "../services/authentication-service";
import AuthenticationValidation from "./validations/authentication-validation";

import { AuthenticationRequest } from "../types";

export default class AuthenticationController {
    private authenticationService = new AuthenticationService();

    login = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
        try {
            const loginInput = AuthenticationValidation.login(req.credentials!);
            const response = await this.authenticationService.login(loginInput);
            res.send(response);
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
            res.send(response);
        }
        catch (error) {
            next(error);
        }
    }
}