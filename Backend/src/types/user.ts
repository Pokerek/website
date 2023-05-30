interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
}

type LoginAttributes = Pick<User, 'email' | 'password'>;
type RegistrationAttributes = Omit<User, '_id'>;

export default User;
export { LoginAttributes, RegistrationAttributes };
