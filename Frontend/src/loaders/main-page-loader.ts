import SkillsService from "../services/skills-service";

const mainPageLoader = async () => {
    return await SkillsService.getSkills();
}

export default mainPageLoader;