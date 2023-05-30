import { Router } from 'express';
import ProjectsController from '../controllers/projectsController';
import authMiddleware from '../middleware/authMiddleware';
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
      // validationMiddleware(CreateProjectDto),
      this.projectsController.createProject
    );
    this.router.patch(
      `${this.path}/:id`,
      authMiddleware,
      // validationMiddleware(CreateProjectDto, true),
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
