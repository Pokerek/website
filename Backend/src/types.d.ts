import type { Request as ExpressRequest } from 'express';

export type AuthenticationRequest = {
  credentials?: {
    username: string,
    password: string,
  }
} & ExpressRequest;

export type JWTUserInfo = {
  id: number,
  username: string
}

export type AuthorizationRequest = {
  user?: JWTUserInfo,
} & ExpressRequest;

export interface RequestWithFile extends ExpressRequest {
  file?: Express.Multer.File;
}

export interface RequestWithImageUrl extends ExpressRequest {
  url: string;
}