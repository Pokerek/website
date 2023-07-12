import bcrypt from 'bcrypt';

import AccountModel from '../models/account-model';
import AccountNotFoundError from './errors/account-not-found-error';
import AccountAlreadyExistsError from './errors/account-already-exists-error';

export interface Account {
    id: string;
    username: string;
    email: string;
    password: string;
}

type AccountAttributes = Omit<Account, 'id'>;

export default class AccountService {
    getAccount = async (username: string): Promise<Account> => {
        const account = await AccountModel.findOne({ username });

        if (!account) {
            throw new AccountNotFoundError(username);
        }

        return {
            id: account._id.toString(),
            username: account.username,
            email: account.email,
            password: account.passwordHash
        };
    }

    createAccount = async ({ email, username, password }: AccountAttributes): Promise<Account> => {
        if (await AccountModel.findOne(
            { $or: [{ username }, { email }] }
        )) {
            throw new AccountAlreadyExistsError();
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const account = new AccountModel({
            username,
            email,
            passwordHash
        });

        await account.save();

        return {
            id: account._id.toString(),
            username: account.username,
            email: account.email,
            password: account.passwordHash
        };
    }
}