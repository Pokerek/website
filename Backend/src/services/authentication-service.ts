import bcrypt from "bcrypt";

import AccountService from "./account-service";
import IncorrectPasswordError from "./errors/incorrect-password-error";
import JWTService from "./jwt-service";

export default class AuthenticationService {
    private accountService: AccountService = new AccountService();

    login = async (username: string, password: string) => {
        const user = await this.accountService.getAccount(username);

        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if (!isPasswordMatching) {
            throw new IncorrectPasswordError();
        }

        const token = JWTService.sign({ username: user.username });

        // TODO - prepare cookie with token
        return { cookie: 'cookie', 'user': user };
    }

    registration = async (username: string, email: string, password: string) => {
        if (await this.accountService.checkIfAccountExists('username')) {
            // TODO - throw error
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await this.accountService.createAccount({ username, email, password: passwordHash });

        const token = JWTService.sign({ username: user.username });

        // TODO - prepare cookie with token
        return { cookie: 'cookie', user: user };
    }
}