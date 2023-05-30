import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import UserAlreadyExistException from '../errors/UserAlreadyExistException';
import WrongCredentialsException from '../errors/WrongCredentialsException';
import { LoginAttributes, RegisterAttributes } from '../types/authentication';
import userModel from '../database/models/userModel';
import { DataStoredInToken, TokenData } from '../types/authentication';

class AuthenticationController {
  private user = userModel;

  public registration = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userData = req.body as RegisterAttributes;
    if (await this.user.findOne({ email: userData.email })) {
      next(new UserAlreadyExistException());
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await this.user.create({
        ...userData,
        password: hashedPassword
      });
      const tokenData = this.createToken(user);
      res.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
      res.status(200).send({
        message: 'User create!'
      });
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as LoginAttributes;
    try {
      const user = await this.user.findOne({ email });
      if (user) {
        const isPasswordMatching = await bcrypt.compare(
          password,
          user.password
        );
        if (!isPasswordMatching) throw new WrongCredentialsException();

        const tokenData = this.createToken(user);
        res.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
        res.json({ message: `Welcome ${user.username}` });
      } else throw new WrongCredentialsException();
    } catch (error) {
      next(error);
    }
  };

  private createToken(user: any): TokenData {
    const expiresIn = 60 * 60;
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id
    };
    if (!secret) {
      throw new Error('Server error!');
    }
    return {
      expiresIn,
      token: sign(dataStoredInToken, secret, { expiresIn })
    };
  }

  public createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; Max-Age=${tokenData.expiresIn}; Path=/; Domain=.${process.env.FRONTEND_URL}`;
  }
}

export default AuthenticationController;
