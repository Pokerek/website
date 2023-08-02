import SkillsService from '../services/skills-service';
import ProjectsService from '../services/projects-service';

export default async function adminSettingsLoader() {
    const skills = await SkillsService.getSkills();
    const projects = await ProjectsService.getProjects();

    return {
        skills,
        projects
    }
}