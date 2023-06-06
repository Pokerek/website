import { NextFunction, Request, Response } from 'express';
import NotFoundException from '../errors/NotFoundException';
import { RequestWithUser } from '../types/request';
import { Project } from '../database/models/projectModel';
import ProjectService from '../services/projectService';

class ProjectsController {
  private projectService = new ProjectService();

  public getAllProjects = async (req: Request, res: Response) => {
    const data = await this.projectService.getAllProjects();

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

    if (!data) return next(new NotFoundException(id, 'Project'));

    const project = {
      name: data.name,
      stack: data.stack,
      description: data.description,
      imageUrl: data.imageUrl,
      links: data.links
    };

    res.send(project);
  };

  public createProject = async (req: RequestWithUser, res: Response) => {
    const projectBody = req.body as Project;

    const addedProject = await this.projectService.createProject(projectBody);

    res.send(addedProject);
  };

  public modifyProject = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const projectBody = req.body as Project;

    const modifiedProject = await this.projectService.modifyProject(
      id,
      projectBody
    );

    if (!modifiedProject) return next(new NotFoundException(id, 'Project'));

    res.send({ status: 'success', message: 'Project modified successfully!' });
  };

  public deleteProject = (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    const deletedProject = this.projectService.deleteProject(id);
    if (!deletedProject) return next(new NotFoundException(id, 'project'));

    res.send({ status: 'success', message: 'Project deleted successfully!' });
  };
}

export default ProjectsController;
