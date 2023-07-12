import projectModel, { Project } from '../models/project-model';
import ServerErrorError from '../errors/server-error';

class ProjectService {
  private project = projectModel;

  public getAllProjects = async () => {
    try {
      return await this.project.find();
    } catch (error) {
      return new ServerErrorError('Something went wrong');
    }
  };

  public getProject = async (id: string) => {
    try {
      return await this.project.findById(id);
    } catch (error) {
      return new ServerErrorError('Something went wrong');
    }
  };

  public createProject = async (projectData: Project) => {
    try {
      return await this.project.create(projectData);
    } catch (error) {
      return new ServerErrorError('Something went wrong');
    }
  };

  public modifyProject = async (id: string, projectBody: Project) => {
    try {
      return this.project.findOneAndUpdate({ _id: id }, projectBody);
    } catch (error) {
      return new ServerErrorError('Something went wrong');
    }
  };

  public deleteProject = async (id: string) => {
    try {
      return await this.project.findByIdAndDelete(id);
    } catch (error) {
      return new ServerErrorError('Something went wrong');
    }
  };
}

export default ProjectService;
