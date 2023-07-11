import { NextFunction, Request, Response } from 'express';
import SkillService from '../services/skillService';
import { Skill } from '../database/models/skillModel';
import NotFoundError from '../errors/not-found-error';
import { RequestWithImageUrl } from '../types/request';
import HttpError from '../errors/http-error';

class SkillController {
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

export default SkillController;
