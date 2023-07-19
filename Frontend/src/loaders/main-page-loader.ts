import ExperiencesService from "../services/experiences-service";
import SkillsService from "../services/skills-service";

const mainPageLoader = async () => {
    const [skills, experiences] = await Promise.all([
        SkillsService.getSkills(),
        ExperiencesService.getExperiences()
    ])

    return {
        skills,
        experiences
    }
}

export default mainPageLoader;