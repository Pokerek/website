import GenericRoute from './generic-route';

import SkillController from '../controllers/skills-controller';
import authenticationMiddleware from '../middleware/authentication-middleware';

export default class SkillsRoutes extends GenericRoute {
  private skillsController = new SkillController();

  constructor() {
    super('/skills');

    this.router.get(
      this.path,
      this.skillsController.getSkills
    );

    this.router.post(
      this.path,
      authenticationMiddleware,
      this.skillsController.createSkill
    );

    this.router.patch(
      `${this.path}/:id`,
      authenticationMiddleware,
      this.skillsController.updateSkill
    );

    this.router.delete(
      `${this.path}/:id`,
      authenticationMiddleware,
      this.skillsController.deleteSkill
    );
  }
}