import SkillsService from '../services/skills-service';

export default async function authLoader() {
    const skills = await SkillsService.getSkills();

    return {
        skills
    }
}