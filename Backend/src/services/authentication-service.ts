import bcrypt from "bcrypt";

import AccountService from "./account-service";
import IncorrectPasswordError from "./errors/incorrect-password-error";
import JWTService from "./jwt-service";

import { LoginInput, RegistrationInput } from '../controllers/validations/authentication-validation';

export default class AuthenticationService {
    private accountService: AccountService = new AccountService();

    login = async ({ username, password }: LoginInput) => {
        const account = await this.accountService.getAccount(username);

        const isPasswordCorrect = await bcrypt.compare(password, account.passwordHash);
        if (!isPasswordCorrect) {
            throw new IncorrectPasswordError();
        }

        const { token, expiresAt } = JWTService.sign({ id: account.id, username: account.username });

        return {
            token,
            username: account.username,
            expiresAt,
            message: 'Logged in successfully!',
        };
    }

    registration = async ({ username, email, password }: RegistrationInput) => {
        const passwordHash = await bcrypt.hash(password, 10);

        const account = await this.accountService.createAccount({ username, email, passwordHash });

        const { token, expiresAt } = JWTService.sign({ id: account.id, username: account.username });

        return {
            token,
            username: account.username,
            expiresAt,
            message: 'Account created successfully!',
        };
    }
}