import projectModel, { Project } from '../database/models/projectModel';
import ServerErrorException from '../errors/ServerErrorException';

class ProjectService {
  private project = projectModel;

  public getAllProjects = async () => {
    try {
      return await this.project.find();
    } catch (error) {
      return new ServerErrorException();
    }
  };

  public getProject = async (id: string) => {
    try {
      return await this.project.findById(id);
    } catch (error) {
      return new ServerErrorException();
    }
  };

  public createProject = async (projectData: Project) => {
    try {
      return await this.project.create(projectData);
    } catch (error) {
      return new ServerErrorException();
    }
  };

  public modifyProject = async (id: string, projectBody: Project) => {
    try {
      return this.project.findOneAndUpdate({ _id: id }, projectBody);
    } catch (error) {
      return new ServerErrorException();
    }
  };

  public deleteProject = async (id: string) => {
    try {
      return await this.project.findByIdAndDelete(id);
    } catch (error) {
      return new ServerErrorException();
    }
  };
}

export default ProjectService;
