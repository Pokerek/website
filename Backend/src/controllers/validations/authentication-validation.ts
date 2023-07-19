import Joi from 'joi';

import GenericValidation from './generic-validation';

export interface LoginInput {
  username: string;
  password: string;
}

export interface RegistrationInput extends LoginInput {
  email: string;
}

export interface CheckSessionInput {
  id: string;
  username: string;
  expiresAt: Date;
}

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required()
});

const registerSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required()
});

const checkSessionSchema = Joi.object({
  id: Joi.string().required(),
  username: Joi.string().required(),
  expiresAt: Joi.date().required()
});

export default class AuthenticationValidation extends GenericValidation {
  static login = (
    data: unknown
  ) => this.validate<LoginInput>(data, loginSchema);

  static registration = (
    data: unknown
  ) => this.validate<RegistrationInput>(data, registerSchema);

  static checkSession = (
    data: unknown
  ) => this.validate<CheckSessionInput>(data, checkSessionSchema);
}