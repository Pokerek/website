import Joi from 'joi';

import GenericValidation from './generic-validation';
import { SkillInput, SkillUpdateInput } from '../../services/skills-service';

const createSkillSchema = Joi.object({
  name: Joi.string().required().max(20),
  imageUrl: Joi.string().required(),
  category: Joi.string().required().valid('frontend', 'backend', 'tool')
});

const updateSkillSchema = Joi.object({
  name: Joi.string().max(20),
  imageUrl: Joi.string(),
  category: Joi.string().valid('frontend', 'backend', 'tool')
});

export default class SkillValidation extends GenericValidation {
  static createSkill = (
    data: unknown
  ) => this.validate<SkillInput>(data, createSkillSchema);

  static updateSkill = (
    data: unknown
  ) => this.validate<SkillUpdateInput>(data, updateSkillSchema);
}