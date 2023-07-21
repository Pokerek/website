import { redirect } from "react-router-dom";

import SkillsService from "../services/skills-service";


import { routesPaths } from "../routes";

export default async function skillEditorAction({ request }: any) {
    const form = await request.formData();
    const id = form.get("id");
    const name = form.get("name");
    const category = form.get("category");
    const imageUrl = form.get("imageUrl");

    let skill = null;
    switch (request.method) {
        case "POST":
            skill = await SkillsService.createSkill({ name, category, imageUrl });
            break;

        case "PATCH":
            skill = await SkillsService.updateSkill({ id, name, category, imageUrl });
            break;
    }

    if (!skill) {
        return null;
    }

    return redirect(routesPaths.ADMIN_PAGE);
}