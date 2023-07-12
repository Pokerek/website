import { Router } from 'express';

import ProjectsController from '../controllers/projects-controller';
import authMiddleware from '../middleware/auth-middleware';
import validationMiddleware from '../middleware/validation-middleware';
import {
  createProjectSchema,
  updateProjectSchema
} from '../controllers/validations/project-validation';

import RouterWithPath from '../types/router';

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
      authMiddleware,
      validationMiddleware(createProjectSchema),
      this.projectsController.createProject
    );
    this.router.put(
      `${this.path}/:id`,
      authMiddleware,
      validationMiddleware(updateProjectSchema),
      this.projectsController.modifyProject
    );
    this.router.delete(
      `${this.path}/:id`,
      authMiddleware,
      this.projectsController.deleteProject
    );
  }
}

export default ProjectsRoutes;
