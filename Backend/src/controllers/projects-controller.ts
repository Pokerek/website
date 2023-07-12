import { NextFunction, Request, Response } from 'express';
import NotFoundError from '../errors/not-found-error';
import { RequestWithUser } from '../types/request';
import { Project } from '../models/project-model';
import ProjectService from '../services/projects-service';
import HttpError from '../errors/http-error';

export default class ProjectsController {
  private projectService = new ProjectService();

  public getAllProjects = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const data = await this.projectService.getAllProjects();
    if (data instanceof HttpError) return next(data);

    const projects = data.map((project) => {
      return {
        name: project.name,
        stack: project.stack,
        description: project.description,
        imageUrl: project.imageUrl,
        links: project.links
      };
    });

    res.send(projects);
  };

  public getProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const data = await this.projectService.getProject(id);
    if (data instanceof HttpError) return next(data);
    if (!data) return next(new NotFoundError(id, 'Project'));

    const project = {
      name: data.name,
      stack: data.stack,
      description: data.description,
      imageUrl: data.imageUrl,
      links: data.links
    };

    res.send(project);
  };

  public createProject = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const projectBody = req.body as Project;

    const data = await this.projectService.createProject(projectBody);
    if (data instanceof HttpError) return next(data);

    const project = {
      name: data.name,
      stack: data.stack,
      description: data.description,
      imageUrl: data.imageUrl,
      links: data.links
    };

    res.send({
      status: 'success',
      message: 'Project added successfully!',
      project
    });
  };

  public modifyProject = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const projectBody = req.body as Project;

    const data = await this.projectService.modifyProject(id, projectBody);
    if (data instanceof HttpError) return next(data);
    if (!data) return next(new NotFoundError(id, 'Project'));

    res.send({ status: 'success', message: 'Project modified successfully!' });
  };

  public deleteProject = (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    const data = this.projectService.deleteProject(id);
    if (data instanceof HttpError) return next(data);
    if (!data) return next(new NotFoundError(id, 'project'));

    res.send({ status: 'success', message: 'Project deleted successfully!' });
  };
}