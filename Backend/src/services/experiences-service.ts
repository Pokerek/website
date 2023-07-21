import ExperienceModel from "../models/experience-model";
import ExperienceNotFoundError from "./errors/experience-not-found-error";

import type {
    Experience,
    ExperienceInput,
    ExperienceUpdateInput
} from '../controllers/validations/experience-validation';

export default class ExperienceService {
    getExperiences = async (): Promise<Experience[]> => {
        const experiences = await ExperienceModel
            .find()
            .sort({ startDate: -1 });

        return experiences.map(experience => ({
            id: experience._id.toString(),
            title: experience.title as string,
            company: experience.company as string,
            location: experience.location as string,
            startDate: experience.startDate as Date,
            endDate: experience.endDate,
            technologies: experience.technologies,
            description: experience.description as string,
        }));
    }

    getExperience = async (
        id: string
    ): Promise<Experience> => {
        const experience = await ExperienceModel.findById(id);

        if (!experience) {
            throw new ExperienceNotFoundError(id);
        }

        return {
            id: experience._id.toString(),
            title: experience.title as string,
            company: experience.company as string,
            location: experience.location as string,
            startDate: experience.startDate as Date,
            endDate: experience.endDate,
            technologies: experience.technologies,
            description: experience.description as string,
        };
    }

    createExperience = async (
        experienceInput: ExperienceInput
    ): Promise<Experience> => {
        const experience = await ExperienceModel.create(experienceInput);

        return {
            id: experience._id.toString(),
            title: experience.title as string,
            company: experience.company as string,
            location: experience.location as string,
            startDate: experience.startDate as Date,
            endDate: experience.endDate,
            technologies: experience.technologies,
            description: experience.description as string,
        };
    }

    updateExperience = async (
        id: string,
        experienceUpdateInput: ExperienceUpdateInput
    ): Promise<void> => {
        const experience = await ExperienceModel.findByIdAndUpdate(id, experienceUpdateInput);
        if (!experience) {
            throw new ExperienceNotFoundError(id);
        }
    }

    deleteExperience = async (
        id: string
    ): Promise<void> => {
        const experience = await ExperienceModel.findByIdAndDelete(id);
        if (!experience) {
            throw new ExperienceNotFoundError(id);
        }
    }
}