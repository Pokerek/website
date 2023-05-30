import Joi from 'joi';

const createProjectSchema = Joi.object({
  name: Joi.string().required().max(50),
  description: Joi.string().required(),
  stack: Joi.array<string>(),
  imageUrl: Joi.string().required(),
  links: Joi.object({
    online: Joi.string(),
    github: Joi.string()
  })
});

const updateProjectSchema = Joi.object({
  name: Joi.string().max(50),
  description: Joi.string(),
  stack: Joi.array<string>(),
  imageUrl: Joi.string(),
  links: Joi.object({
    online: Joi.string(),
    github: Joi.string()
  })
});

export { createProjectSchema, updateProjectSchema };
