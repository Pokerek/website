import { redirect } from "react-router-dom";

import ExperiencesService from "../services/experiences-service";

import { routesPaths } from "../routes";

export default async function experienceEditorAction({ request }: any) {
    const form = await request.formData();
    const id = form.get("id");
    const title = form.get("title");
    const company = form.get("company");
    const description = form.get("description");
    const location = form.get("location");
    const startDate = form.get("startDate");
    const endDate = form.get("endDate");
    const technologies = form.get("technologies");

    const experienceInput: ExperienceInput = {
        title,
        company,
        description,
        location,
        startDate: new Date(startDate).toISOString(),
        technologies: JSON.parse(technologies)
    };

    if (endDate) {
        experienceInput.endDate = new Date(endDate).toISOString();
    }

    let experience = null;
    switch (request.method) {
        case "POST":
            experience = await ExperiencesService.createExperience(experienceInput);
            break;

        case "PATCH":
            experience = await ExperiencesService.updateExperience(id, experienceInput);
            break;
    }

    if (!experience) {
        return null;
    }

    return redirect(routesPaths.ADMIN_PAGE)
}