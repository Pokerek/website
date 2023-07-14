import Joi from 'joi';

import GenericValidation from './generic-validation';

import type { ProjectInput, ProjectUpdateInput } from '../../services/projects-service';

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

export default class ProjectValidation extends GenericValidation {
  static createProject = (
    data: unknown
  ) => this.validate<ProjectInput>(data, createProjectSchema);

  static updateProject = (
    data: unknown
  ) => this.validate<ProjectUpdateInput>(data, updateProjectSchema);
}
