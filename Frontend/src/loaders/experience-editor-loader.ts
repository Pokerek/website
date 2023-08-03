import { redirect } from "react-router-dom";

import SkillsService from "../services/skills-service";
import ExperiencesService from "../services/experiences-service";

import { routesPaths } from "../routes";

export default async function experienceEditorLoader({ params }: any) {
    const { id } = params;
    const skills = (await SkillsService.getSkills())
        .filter(skill => skill.category !== 'tool')

    if (!id) {
        return {
            experience: null,
            skills
        }
    }

    const experience = await ExperiencesService.getExperience(id);
    if (!experience) {
        return redirect(routesPaths.EXPERIENCE_FORM_PAGE);
    }

    experience.startDate = experience.startDate.split('T')[0];
    if (experience.endDate) {
        experience.endDate = experience.endDate.split('T')[0];
    }

    return {
        experience,
        skills
    };
}
