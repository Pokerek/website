import { Router } from 'express';
import RouterWithPath from '../types/router';
import SkillController from '../controllers/skillController';
import validationMiddleware from '../middleware/validationMiddleware';
import { createSkillSchema, updateSkillSchema } from '../validations/skill';

class SkillsRoutes implements RouterWithPath {
  public path = '/skills';
  public router = Router();

  private skillsController = new SkillController();

  constructor() {
    this.config();
  }

  private config() {
    this.router.get(this.path, this.skillsController.getAllSkills);
    this.router.post(
      this.path,
      validationMiddleware(createSkillSchema),
      this.skillsController.createSkill
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(updateSkillSchema),
      this.skillsController.modifySkill
    );
    this.router.delete(`${this.path}/:id`, this.skillsController.deleteSkill);
  }
}

export default SkillsRoutes;
