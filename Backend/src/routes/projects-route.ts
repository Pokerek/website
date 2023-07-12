import { Router } from 'express';

import ProjectsController from '../controllers/projects-controller';
import {
  createProjectSchema,
  updateProjectSchema
} from '../controllers/validations/project-validation';
import validationMiddleware from '../middleware/validation-middleware';

import RouterWithPath from '../types/router';
import authorizationMiddleware from '../middleware/authorization-middleware';

class ProjectsRoutes implements RouterWithPath {
  public path = '/projects';
  public router = Router();

  private projectsController = new ProjectsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.projectsController.getAllProjects);
    this.router.get(`${this.path}/:id`, this.projectsController.getProject);
    this.router.post(
      this.path,
      authorizationMiddleware,
      validationMiddleware(createProjectSchema),
      this.projectsController.createProject
    );
    this.router.put(
      `${this.path}/:id`,
      authorizationMiddleware,
      validationMiddleware(updateProjectSchema),
      this.projectsController.modifyProject
    );
    this.router.delete(
      `${this.path}/:id`,
      authorizationMiddleware,
      this.projectsController.deleteProject
    );
  }
}

export default ProjectsRoutes;
