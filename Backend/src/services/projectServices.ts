import projectModel, { Project } from '../database/models/projectModel';

class ProjectService {
  private project = projectModel;

  public getAllProjects = async () => {
    try {
      return await this.project.find();
    } catch (error) {
      throw new Error('Server error!');
    }
  };

  public getProject = async (id: string) => {
    try {
      return await this.project.findById(id);
    } catch (error) {
      throw new Error('Server error!');
    }
  };

  public createProject = async (projectData: Project) => {
    try {
      return await this.project.create(projectData);
    } catch (error) {
      throw new Error('Server error!');
    }
  };

  public modifyProject = async (id: string, projectBody: Project) => {
    try {
      return this.project.findOneAndUpdate({ _id: id }, projectBody);
    } catch (error) {
      throw new Error('Server error!');
    }
  };

  public deleteProject = async (id: string) => {
    try {
      return await this.project.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Server error!');
    }
  };
}

export default ProjectService;
