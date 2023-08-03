import SkillsService from '../services/skills-service';
import ProjectsService from '../services/projects-service';
import ExperiencesService from '../services/experiences-service';

export default async function adminSettingsLoader() {
    const skills = await SkillsService.getSkills();
    const projects = await ProjectsService.getProjects();
    const experiences = await ExperiencesService.getExperiences(true);

    return {
        skills,
        projects,
        experiences
    }
}