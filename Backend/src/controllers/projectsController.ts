import { NextFunction, Request, Response } from 'express';
import NotFoundException from '../errors/NotFoundException';
import { RequestWithUser } from '../types/request';
import projectModel, { Project } from '../database/model/projects.model';

class ProjectsController {
  private project = projectModel;

  public getAllProjects = (req: Request, res: Response) => {
    this.project.find().then((projects) => res.send(projects));
  };

  public getProject = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    this.project.findById(id).then((project) => {
      if (project) {
        res.send(project);
      } else {
        next(new NotFoundException(id, 'Project'));
      }
    });
  };

  public createProject = (req: RequestWithUser, res: Response) => {
    const projectData: Project = req.body;
    const createdProject = new this.project(projectData);
    createdProject.save().then(() => {
      res.send({ message: 'Project created' });
    });
  };

  public modifyProject = (
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

  public deleteProject = (
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
