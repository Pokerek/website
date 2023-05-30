import { Router } from 'express';

import ProjectsController from '../controllers/projectController';
import authMiddleware from '../middleware/authMiddleware';
import validationMiddleware from '../middleware/validationMiddleware';
import {
  createProjectSchema,
  updateProjectSchema
} from '../validations/project';

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
    this.router.patch(
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
