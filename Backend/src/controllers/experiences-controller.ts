import {
    Request,
    Response,
    NextFunction
} from 'express';

import ExperienceService from '../services/experiences-service';
import ExperienceValidation from './validations/experience-validation';
import validateId from '../utils/validateId';

export default class ExperiencesController {
    private experiencesService = new ExperienceService();

    getExperiences = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const experiences = await this.experiencesService.getExperiences();

            res.json(experiences);
        } catch (error) {
            next(error);
        };
    }

    createExperience = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const validatedBodyExperience = ExperienceValidation.createExperience(req.body);

            const experience = await this.experiencesService.createExperience(validatedBodyExperience);

            res.json(experience);
        } catch (error) {
            next(error)
        };
    }

    updateExperience = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const id = validateId(req.params.id);
            const validatedBodyExperience = ExperienceValidation.updateExperience(req.body);

            await this.experiencesService.updateExperience(id, validatedBodyExperience);

            res.json();
        } catch (error) {
            next(error)
        };
    }

    deleteExperience = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const id = validateId(req.params.id);

            await this.experiencesService.deleteExperience(id);

            res.json();
        } catch (error) {
            next(error)
        };
    }
}
