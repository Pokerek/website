import GenericRoute from './generic-route';
import ProjectsController from '../controllers/projects-controller';
import authorizationMiddleware from '../middleware/authorization-middleware';

const PATH = '/projects';

export const PROJECTS_ROUTES = {
  GET_PROJECTS: {
    path: PATH,
    method: 'GET',
    protected: false,
  },
  GET_PROJECT: {
    path: `${PATH}/:id`,
    method: 'GET',
    protected: false,
  },
  CREATE_PROJECT: {
    path: PATH,
    method: 'POST',
    protected: true
  },
  UPDATE_PROJECT: {
    path: `${PATH}/:id`,
    method: 'PATCH',
    protected: true
  },
  DELETE_PROJECT: {
    path: `${PATH}/:id`,
    method: 'DELETE',
    protected: true
  }
}

export default class ProjectsRoutes extends GenericRoute {
  private projectsController = new ProjectsController();

  constructor() {
    super(PATH);

    this.router.get(
      PROJECTS_ROUTES.GET_PROJECTS.path,
      this.projectsController.getProjects
    )

    this.router.get(
      PROJECTS_ROUTES.GET_PROJECT.path,
      this.projectsController.getProject
    )

    this.router.post(
      PROJECTS_ROUTES.CREATE_PROJECT.path,
      authorizationMiddleware,
      this.projectsController.createProject
    )

    this.router.patch(
      PROJECTS_ROUTES.UPDATE_PROJECT.path,
      authorizationMiddleware,
      this.projectsController.updateProject
    )

    this.router.delete(
      PROJECTS_ROUTES.DELETE_PROJECT.path,
      authorizationMiddleware,
      this.projectsController.deleteProject
    )
  }
}