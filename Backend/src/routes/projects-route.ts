import GenericRoute from './generic-route';
import ProjectsController from '../controllers/projects-controller';
import authorizationMiddleware from '../middleware/authorization-middleware';

export default class ProjectsRoutes extends GenericRoute {
  private projectsController = new ProjectsController();

  constructor() {
    super('/projects');

    this.router.get(
      this.path,
      this.projectsController.getProjects
    )

    this.router.get(
      `${this.path}/:id`,
      this.projectsController.getProject
    )

    this.router.post(
      this.path,
      authorizationMiddleware,
      this.projectsController.createProject
    )

    this.router.patch(
      `${this.path}/:id`,
      authorizationMiddleware,
      this.projectsController.updateProject
    )

    this.router.delete(
      `${this.path}/:id`,
      authorizationMiddleware,
      this.projectsController.deleteProject
    )
  }
}