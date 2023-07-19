import Joi from 'joi';

import GenericValidation from './generic-validation';

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

export default class PostValidation extends GenericValidation {
  static createPost = (
    data: unknown
  ) => this.validate<PostInput>(data, createPostSchema);

  static updatePost = (
    data: unknown
  ) => this.validate<PostUpdateInput>(data, updatePostSchema);
}