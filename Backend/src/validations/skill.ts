import Joi from 'joi';

const createSkillSchema = Joi.object({
  name: Joi.string().required().max(20),
  alt: Joi.string().max(10),
  type: Joi.string().required().valid('strong', 'weak', 'neutral')
});

const updateSkillSchema = Joi.object({
  name: Joi.string().max(20),
  alt: Joi.string().max(10),
  type: Joi.string().valid('strong', 'weak', 'neutral')
});

export { createSkillSchema, updateSkillSchema };
