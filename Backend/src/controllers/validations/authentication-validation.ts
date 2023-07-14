import Joi from 'joi';

import GenericValidation from './generic-validation';

import type { LoginInput, RegistrationInput } from '../../services/authentication-service';

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required()
});

const registerSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required()
});

export default class AuthenticationValidation extends GenericValidation {
  static login = (
    data: unknown
  ) => this.validate<LoginInput>(data, loginSchema);

  static registration = (
    data: unknown
  ) => this.validate<RegistrationInput>(data, registerSchema);
}