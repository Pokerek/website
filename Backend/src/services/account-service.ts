import bcrypt from 'bcrypt';

import AccountModel from '../models/account-model';
import AccountNotFoundError from './errors/account-not-found-error';
import AccountAlreadyExistsError from './errors/account-already-exists-error';

export interface AccountAttributes {
    username: string;
    email: string;
    password: string;
}

export default class AccountService {
    getAccount = async (username: string): Promise<AccountAttributes> => {
        const account = await AccountModel.findOne({ username });

        if (!account) {
            throw new AccountNotFoundError(username);
        }

        return {
            username: account.username,
            email: account.email,
            password: account.passwordHash
        };
    }

    createAccount = async ({ email, username, password }: AccountAttributes): Promise<AccountAttributes> => {
        if (await AccountModel.findOne({ email })) {
            throw new AccountAlreadyExistsError(email);
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const account = new AccountModel({
            username,
            email,
            passwordHash
        });

        await account.save();

        return {
            username: account.username,
            email: account.email,
            password: account.passwordHash
        };
    }

    checkIfAccountExists = async (username: string): Promise<boolean> => {
        const account = await AccountModel.findOne({ username });

        return account ? true : false;
    }
}