import Joi from 'joi';

import GenericValidation from './generic-validation';

export interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: Date;
    endDate?: Date;
    technologies: string[];
    description: string;
}

export type ExperienceInput = Omit<Experience, 'id'>;
export type ExperienceUpdateInput = Partial<ExperienceInput>;

const createExperienceSchema = Joi.object({
    title: Joi.string().required().max(50),
    company: Joi.string().required().max(50),
    location: Joi.string().required().max(50),
    startDate: Joi.date().required(),
    endDate: Joi.date(),
    technologies: Joi.array<string>(),
    description: Joi.string().required(),
});

const updateExperienceSchema = Joi.object({
    title: Joi.string().max(50),
    company: Joi.string().max(50),
    location: Joi.string().max(50),
    startDate: Joi.date(),
    endDate: Joi.date(),
    technologies: Joi.array<string>(),
    description: Joi.string(),
});

export default class ExperienceValidation extends GenericValidation {
    static createExperience = (
        data: unknown
    ) => this.validate<ExperienceInput>(data, createExperienceSchema);

    static updateExperience = (
        data: unknown
    ) => this.validate<ExperienceUpdateInput>(data, updateExperienceSchema);
}