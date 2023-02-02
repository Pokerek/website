import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { NextFunction, Request, Response, Router } from 'express';
import UserAlreadyExistException from '../exceptions/UserAlreadyExistException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import Controller from '../interface/controller.interface';
import validationMiddleware from '../middleware/validation.middleware';
import CreateUserDto from '../users/user.dto';
import User from '../users/user.interface';
import userModel from '../users/users.model';
import { DataStoredInToken, TokenData } from './authentication.interface';
import LogInDto from './logIn.dto';
import blockEndpoint from '../utils/blockEndpoint';

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = Router();
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LogInDto),
      this.loggingIn
    );
    this.router.post(
      `${this.path}/registration`,
      blockEndpoint,
      validationMiddleware(CreateUserDto),
      this.registration
    );
  }

  private registration = async (
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

  private loggingIn = async (
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

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; Max-Age=${tokenData.expiresIn}; Path=/; Domain=${process.env.FRONTEND_URL}`;
  }
}

export default AuthenticationController;
