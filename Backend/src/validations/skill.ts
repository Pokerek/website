import Joi from 'joi';

const createSkillSchema = Joi.object({
  name: Joi.string().required().max(20),
  alt: Joi.string().max(10),
  type: Joi.string().required().valid('frontend', 'backend', 'tool')
});

const updateSkillSchema = Joi.object({
  name: Joi.string().max(20),
  alt: Joi.string().max(10),
  type: Joi.string().valid('frontend', 'backend', 'tool')
});

export { createSkillSchema, updateSkillSchema };
