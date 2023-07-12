import Joi from 'joi';

const createPostSchema = Joi.object({
  title: Joi.string().required().max(50),
  text: Joi.string().required(),
  tags: Joi.array<string>()
});

const updatePostSchema = Joi.object({
  title: Joi.string().max(50),
  text: Joi.string(),
  tags: Joi.array<string>()
});

export { createPostSchema, updatePostSchema };
