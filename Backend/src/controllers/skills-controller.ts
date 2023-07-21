import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import SkillService from '../services/skills-service';
import SkillValidation from './validations/skill-validation';
import validateId from '../utils/validateId';

export default class SkillsController {
  private skillService = new SkillService();

  getSkills = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const skills = await this.skillService.getSkills();

      res.header('cache-control', 'public, max-age=3600')
      res.json(skills);
    } catch (error) {
      next(error);
    }
  };

  getSkill = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = validateId(req.params.id);

      const skill = await this.skillService.getSkill(id);

      res.json(skill);
    } catch (error) {
      next(error);
    }
  };

  createSkill = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const validatedBodySkill = SkillValidation.createSkill(req.body);

      const skill = await this.skillService.createSkill(validatedBodySkill);

      res.status(StatusCodes.CREATED).json(skill);
    } catch (error) {
      next(error);
    }
  };

  updateSkill = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = validateId(req.params.id);

      const validatedBodySkill = SkillValidation.updateSkill(req.body);

      await this.skillService.updateSkill(id, validatedBodySkill);

      res.send({ message: 'Skill updated successfully!' });
    } catch (error) {
      next(error);
    }
  };

  deleteSkill = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {
      const id = validateId(req.params.id);

      await this.skillService.deleteSkill(id);

      res.send({ message: 'Skill deleted successfully!' });
    } catch (error) {
      next(error);
    }
  };
}