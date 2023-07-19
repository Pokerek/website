import GenericRoute from './generic-route';

import SkillController from '../controllers/skills-controller';
import authorizationMiddleware from '../middleware/authorization-middleware';

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
      authorizationMiddleware,
      this.skillsController.createSkill
    );

    this.router.patch(
      `${this.path}/:id`,
      authorizationMiddleware,
      this.skillsController.updateSkill
    );

    this.router.delete(
      `${this.path}/:id`,
      authorizationMiddleware,
      this.skillsController.deleteSkill
    );
  }
}