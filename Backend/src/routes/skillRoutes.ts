import { Router } from 'express';
import RouterWithPath from '../types/router';
import SkillController from '../controllers/skillController';
import validationMiddleware from '../middleware/validationMiddleware';
import { createSkillSchema, updateSkillSchema } from '../validations/skill';

import { uploadSkillImage } from '../config/multer';
import imageMiddleware from '../middleware/imageMiddleware';

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
      uploadSkillImage.single('image'),
      validationMiddleware(createSkillSchema),
      imageMiddleware.imageRequired,
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
