import Joi from 'joi';

import validationError from '../../errors/validation-error';

import type { PostInput, PostUpdateInput } from '../../services/posts-service';

const createPostSchema = Joi.object({
  title: Joi.string().required().max(50),
  text: Joi.string().required(),
  createdDate: Joi.date().required(),
  tags: Joi.array<string>()
});

const updatePostSchema = Joi.object({
  title: Joi.string().max(50),
  text: Joi.string(),
  createdDate: Joi.date(),
  tags: Joi.array<string>()
});

export default class PostValidation {
  static createPost = (data: unknown): PostInput => {
    const { error, value } = createPostSchema.validate(data, { abortEarly: false });

    if (error) {
      throw new validationError(error.message);
    }

    return value as PostInput;
  };

  static updatePost = (data: unknown): PostUpdateInput => {
    const { error, value } = updatePostSchema.validate(data, { abortEarly: false });

    if (error) {
      throw new validationError(error.message);
    }

    return value as PostUpdateInput;
  }
}