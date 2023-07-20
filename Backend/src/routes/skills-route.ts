import GenericRoute from './generic-route';

import SkillController from '../controllers/skills-controller';
import authorizationMiddleware from '../middleware/authorization-middleware';

const PATH = '/skills';

export const SKILLS_ROUTES = {
  GET_SKILLS: {
    path: PATH,
    method: 'GET',
    protected: false,
  },
  GET_SKILL: {
    path: `${PATH}/:id`,
    method: 'GET',
    protected: true,
  },
  CREATE_SKILL: {
    path: PATH,
    method: 'POST',
    protected: true
  },
  UPDATE_SKILL: {
    path: `${PATH}/:id`,
    method: 'PATCH',
    protected: true
  },
  DELETE_SKILL: {
    path: `${PATH}/:id`,
    method: 'DELETE',
    protected: true
  }
}

export default class SkillsRoutes extends GenericRoute {
  private skillsController = new SkillController();

  constructor() {
    super(PATH);

    this.router.get(
      SKILLS_ROUTES.GET_SKILLS.path,
      this.skillsController.getSkills
    );

    this.router.get(
      SKILLS_ROUTES.GET_SKILL.path,
      authorizationMiddleware,
      this.skillsController.getSkill
    );

    this.router.post(
      SKILLS_ROUTES.CREATE_SKILL.path,
      authorizationMiddleware,
      this.skillsController.createSkill
    );

    this.router.patch(
      SKILLS_ROUTES.UPDATE_SKILL.path,
      authorizationMiddleware,
      this.skillsController.updateSkill
    );

    this.router.delete(
      SKILLS_ROUTES.DELETE_SKILL.path,
      authorizationMiddleware,
      this.skillsController.deleteSkill
    );
  }
}