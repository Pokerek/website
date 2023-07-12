import Joi from 'joi';

const mailSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  message: Joi.string().required(),
  subject: Joi.string().required()
});

export { mailSchema };
