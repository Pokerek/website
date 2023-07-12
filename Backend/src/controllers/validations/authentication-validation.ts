import Joi from 'joi';

import validationError from '../../errors/validation-error';

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required()
});

const registerSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required()
});

export default class AuthenticationValidation {
  public static login = (data: unknown) => {
    const { error, value } = loginSchema.validate(data, { abortEarly: false });

    if (error) {
      throw new validationError(error.message);
    }

    return value;
  };
  public static registration = (data: unknown) => {
    const { error, value } = registerSchema.validate(data, { abortEarly: false });

    if (error) {
      throw new validationError(error.message);
    }

    return value;
  };
}