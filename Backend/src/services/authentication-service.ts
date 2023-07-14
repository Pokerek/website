import bcrypt from "bcrypt";

import AccountService from "./account-service";
import IncorrectPasswordError from "./errors/incorrect-password-error";
import JWTService from "./jwt-service";

export interface LoginInput {
    username: string;
    password: string;
}

export interface RegistrationInput extends LoginInput {
    email: string;
}

export default class AuthenticationService {
    private accountService: AccountService = new AccountService();

    login = async ({ username, password }: LoginInput) => {
        const account = await this.accountService.getAccount(username);

        const isPasswordCorrect = await bcrypt.compare(password, account.passwordHash);
        if (!isPasswordCorrect) {
            throw new IncorrectPasswordError();
        }

        const token = JWTService.sign({ id: account.id, username: account.username });

        return { token };
    }

    registration = async ({ username, email, password }: RegistrationInput) => {
        const passwordHash = await bcrypt.hash(password, 10);

        const account = await this.accountService.createAccount({ username, email, passwordHash });

        const token = JWTService.sign({ id: account.id, username: account.username });

        return { token };
    }
}