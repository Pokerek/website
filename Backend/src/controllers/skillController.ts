import { NextFunction, Request, Response } from 'express';
import SkillService from '../services/skillService';
import { Skill } from '../database/models/skillModel';
import NotFoundException from '../errors/NotFoundException';

class SkillController {
  private skillService = new SkillService();

  public getAllSkills = async (req: Request, res: Response) => {
    const data = await this.skillService.getAllSkills();

    const skills = data.map((skill) => {
      return {
        name: skill.name,
        alt: skill.alt,
        type: skill.type
      };
    });

    res.send(skills);
  };

  public createSkill = async (req: Request, res: Response) => {
    const skillBody = req.body as Skill;

    const addedSkill = await this.skillService.createSkill(skillBody);

    res.send(addedSkill);
  };

  public modifySkill = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const skillBody = req.body as Skill;

    const modifiedSkill = await this.skillService.modifySkill(id, skillBody);
    if (!modifiedSkill) return next(new NotFoundException(id, 'Skill'));

    res.send({ status: 'success', message: 'Skill modified successfully!' });
  };

  public deleteSkill = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    const deletedSkill = await this.skillService.deleteSkill(id);
    if (!deletedSkill) return next(new NotFoundException(id, 'Skill'));

    res.send({ status: 'success', message: 'Skill deleted successfully!' });
  };
}

export default SkillController;
