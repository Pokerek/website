import ProjectModel from '../models/project-model';
import ProjectNotFoundError from './errors/project-not-found-error';

interface ProjectLinks {
  online?: string;
  github?: string;
}

interface Project {
  id: string;
  name: string;
  stack: string[];
  description: string;
  imageUrl: string;
  links?: ProjectLinks;
}

export type ProjectInput = Omit<Project, 'id'>;
export type ProjectUpdateInput = Partial<ProjectInput>;

export default class ProjectService {
  getProjects = async (): Promise<Project[]> => {
    const projects = await ProjectModel.find();

    return projects.map(project => {
      return {
        id: project._id.toString(),
        name: project.name as string,
        stack: project.stack,
        description: project.description as string,
        imageUrl: project.imageUrl as string,
        links: project.links as ProjectLinks
      }
    });
  };

  getProjectById = async (id: string): Promise<Project> => {
    const project = await ProjectModel.findById(id);

    if (!project) throw new ProjectNotFoundError(id);

    return {
      id: project._id.toString(),
      name: project.name as string,
      stack: project.stack,
      description: project.description as string,
      imageUrl: project.imageUrl as string,
      links: project.links as ProjectLinks
    };
  };

  createProject = async (
    projectData: ProjectInput
  ): Promise<Project> => {
    const project = await ProjectModel.create(projectData);

    return {
      id: project._id.toString(),
      name: project.name as string,
      stack: project.stack,
      description: project.description as string,
      imageUrl: project.imageUrl as string,
      links: project.links
    };
  };

  updateProject = async (
    id: string,
    projectBody: ProjectUpdateInput
  ): Promise<void> => {
    const post = await ProjectModel.findByIdAndUpdate(
      id,
      projectBody,
      { new: true }
    );

    if (!post) throw new ProjectNotFoundError(id);
  };

  deleteProject = async (id: string): Promise<void> => {
    const post = await ProjectModel.findByIdAndDelete(id);
    if (!post) throw new ProjectNotFoundError(id);
  };
}