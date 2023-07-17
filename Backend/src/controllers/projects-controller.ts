import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import ProjectService from '../services/projects-service';
import ProjectValidation from './validations/project-validation';

export default class ProjectsController {
  private projectService = new ProjectService();

  getProjects = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const projects = await this.projectService.getProjects();

      res.json(projects);
    } catch (error) {
      next(error);
    }
  };

  getProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    try {
      const project = await this.projectService.getProjectById(id);

      res.json(project);
    } catch (error) {
      next(error);
    }
  };

  createProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const validatedBodyProject = ProjectValidation.createProject(req.body);

      const project = await this.projectService.createProject(validatedBodyProject);

      res.status(StatusCodes.CREATED).json(project);
    } catch (error) {
      next(error);
    }
  };

  updateProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    try {
      const validatedBodyProject = ProjectValidation.updateProject(req.body);

      await this.projectService.updateProject(id, validatedBodyProject);

      res.send({ message: 'Project modified successfully!' });
    } catch (error) {
      next(error);
    }
  };

  deleteProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    try {
      await this.projectService.deleteProject(id);

      res.json({ message: 'Project deleted successfully!' });
    } catch (error) {
      next(error);
    }
  };
}