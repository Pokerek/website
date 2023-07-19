import type { Request as ExpressRequest } from 'express';
import { CheckSessionInput } from './controllers/validations/authentication-validation';

export type AuthenticationRequest = {
  credentials?: {
    username: string,
    password: string,
  }
} & ExpressRequest;

export type JWTUserInfo = {
  id: string,
  username: string,
  exp: number,
}

export type AuthorizationRequest = {
  user?: CheckSessionInput,
} & ExpressRequest;