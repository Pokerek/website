import bcrypt from "bcrypt";

import AccountService from "./account-service";
import IncorrectPasswordError from "./errors/incorrect-password-error";
import JWTService from "./jwt-service";

export default class AuthenticationService {
    private accountService: AccountService = new AccountService();

    login = async (username: string, password: string) => {
        const account = await this.accountService.getAccount(username);

        const isPasswordMatching = await bcrypt.compare(password, account.password);
        if (!isPasswordMatching) {
            throw new IncorrectPasswordError();
        }

        const token = JWTService.sign({ id: account.id, username: account.username });

        return { token };
    }

    registration = async (username: string, email: string, password: string) => {
        const passwordHash = await bcrypt.hash(password, 10);

        const account = await this.accountService.createAccount({ username, email, password: passwordHash });

        const token = JWTService.sign({ id: account.id, username: account.username });

        return { token };
    }
}