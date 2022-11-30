import { NextFunction, Request, Response, Router } from 'express';
import NotFoundException from '../exceptions/NotFoundException';
import Controller from '../interface/controller.interface';
import RequestWithUser from '../interface/requestWithUser.interface';
import authMiddleware from '../middleware/authMiddleware';
import validationMiddleware from '../middleware/validation.middleware';
import CreateProjectDto from './project.dto';
import projectModel, { Project } from './projects.model';

class ProjectsController implements Controller {
  public path = '/projects';
  public router = Router();
  private project = projectModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllProjects);
    this.router.get(`${this.path}/:id`, this.getProject);
    this.router.post(
      this.path,
      authMiddleware,
      validationMiddleware(CreateProjectDto),
      this.createProject
    );
    this.router.patch(
      `${this.path}/:id`,
      authMiddleware,
      validationMiddleware(CreateProjectDto, true),
      this.modifyProject
    );
    this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteProject);
  }

  private getAllProjects = (req: Request, res: Response) => {
    this.project.find().then((projects) => res.send(projects));
  };

  private getProject = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    this.project.findById(id).then((project) => {
      if (project) {
        res.send(project);
      } else {
        next(new NotFoundException(id, 'Project'));
      }
    });
  };

  private createProject = (req: RequestWithUser, res: Response) => {
    const projectData: Project = req.body;
    const createdProject = new this.project(projectData);
    createdProject.save().then(() => {
      res.send({ message: 'Project created' });
    });
  };

  private modifyProject = (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const projectBody: Project = req.body;
    this.project
      .findByIdAndUpdate(id, projectBody, { new: true })
      .then((post) => {
        if (post) {
          res.send({ message: 'Project update!' });
        } else {
          next(new NotFoundException(id, 'Project'));
        }
      });
  };

  private deleteProject = (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    this.project.findByIdAndDelete(id).then((successResponse) => {
      if (successResponse) {
        res.send({ message: 'Post deleted' });
      } else {
        next(new NotFoundException(id, 'Project'));
      }
    });
  };
}

export default ProjectsController;
