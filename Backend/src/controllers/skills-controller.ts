import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import SkillService from '../services/skills-service';
import SkillValidation from './validations/skill-validation';
import validateId from '../utils/validateId';

import { RequestWithImageUrl } from '../types';

export default class SkillsController {
  private skillService = new SkillService();

  getSkills = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const skills = await this.skillService.getSkills();

      res.json(skills);
    } catch (error) {
      next(error);
    }
  };

  createSkill = async (
    req: RequestWithImageUrl,
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

  public updateSkill = async (
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

  public deleteSkill = async (
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