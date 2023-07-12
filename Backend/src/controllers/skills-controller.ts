import { NextFunction, Request, Response } from 'express';
import SkillService from '../services/skills-service';
import { Skill } from '../models/skill-model';
import NotFoundError from '../errors/not-found-error';
import { RequestWithImageUrl } from '../types';
import HttpError from '../errors/http-error';

export default class SkillsController {
  private skillService = new SkillService();

  public getAllSkills = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const data = await this.skillService.getAllSkills();
    if (data instanceof HttpError) return next(data);

    const skills = data.map((skill) => {
      return {
        name: skill.name,
        alt: skill.alt,
        type: skill.type,
        url: skill.url
      };
    });

    res.send(skills);
  };

  public createSkill = async (
    req: RequestWithImageUrl,
    res: Response,
    next: NextFunction
  ) => {
    const skillBody = req.body as Skill;

    const data = await this.skillService.createSkill(skillBody);
    if (data instanceof HttpError) return next(data);

    res.send({
      status: 'success',
      message: 'Skill added successfully!',
      skill: {
        name: data.name,
        alt: data.alt,
        type: data.type,
        url: data.url
      }
    });
  };

  public modifySkill = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const skillBody = req.body as Skill;

    const data = await this.skillService.createSkill(skillBody);
    if (data instanceof HttpError) return next(data);
    if (!data) return next(new NotFoundError(id, 'Skill'));

    res.send({ status: 'success', message: 'Skill modified successfully!' });
  };

  public deleteSkill = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    const deletedSkill = await this.skillService.deleteSkill(id);
    if (!deletedSkill) return next(new NotFoundError(id, 'Skill'));

    res.send({ status: 'success', message: 'Skill deleted successfully!' });
  };
}