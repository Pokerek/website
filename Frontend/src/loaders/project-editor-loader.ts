import { redirect } from "react-router-dom";

import SkillsService from "../services/skills-service";
import ProjectsService from "../services/projects-service";

import { routesPaths } from "../routes";

export default async function projectEditorLoader({ params }: any) {
    const { id } = params;
    const skills = (await SkillsService.getSkills())
        .filter(skill => skill.category !== 'tool')

    if (!id) {
        return {
            project: null,
            skills
        }
    }

    const project = await ProjectsService.getProject(id);
    if (!project) {
        return redirect(routesPaths.PROJECT_FORM_PAGE);
    }

    return {
        project,
        skills
    };
}