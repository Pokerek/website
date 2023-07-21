import { redirect } from "react-router-dom";

import SkillsService from "../services/skills-service";

import { routesPaths } from "../routes";

export default async function skillEditorLoader({ params }: any) {
    const { id } = params;
    if (!id) return null;

    const skill = await SkillsService.getSkill(id);
    if (!skill) {
        return redirect(routesPaths.SKILL_FORM_PAGE);
    }

    return skill;
}