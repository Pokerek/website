import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import UserAlreadyExistException from '../errors/UserAlreadyExistException';
import WrongCredentialsException from '../errors/WrongCredentialsException';
import CreateUserDto from '../validations/user.dto';
import User from '../types/user';
import userModel from '../database/model/users.model';
import { DataStoredInToken, TokenData } from '../types/authentication';
import LogInDto from '../validations/logIn.dto';

class AuthenticationController {
  private user = userModel;

  public registration = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userData: CreateUserDto = req.body;
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

  public loggingIn = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const logInData: LogInDto = req.body;
    try {
      const user = await this.user.findOne({ email: logInData.email });
      if (user) {
        const isPasswordMatching = await bcrypt.compare(
          logInData.password,
          user.password
        );
        if (!isPasswordMatching) throw new WrongCredentialsException();

        const tokenData = this.createToken(user);
        res.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
        res.status(200).json({ message: 'Login!' });
      } else throw new WrongCredentialsException();
    } catch (error) {
      next(error);
    }
  };

  private createToken(user: User): TokenData {
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
