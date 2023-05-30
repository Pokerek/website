import { User } from '../database/models/userModel';

type LoginAttributes = Pick<User, 'email' | 'password'>;
type RegisterAttributes = Pick<User, 'username' | 'email' | 'password'>;

interface TokenData {
  token: string;
  expiresIn: number;
}

interface DataStoredInToken {
  _id: string;
}

export { LoginAttributes, RegisterAttributes, TokenData, DataStoredInToken };
