import AccountModel from '../models/account-model';
import AccountNotFoundError from './errors/account-not-found-error';
import AccountAlreadyExistsError from './errors/account-already-exists-error';

export interface Account {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
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
            passwordHash: account.passwordHash
        };
    }

    createAccount = async ({ email, username, passwordHash }: AccountAttributes): Promise<Account> => {
        if (await AccountModel.findOne(
            { $or: [{ username }, { email }] }
        )) {
            throw new AccountAlreadyExistsError();
        }

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
            passwordHash: account.passwordHash
        };
    }
}