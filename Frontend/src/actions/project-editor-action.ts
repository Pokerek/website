import { redirect } from "react-router-dom";

import ProjectsService from "../services/projects-service";

import { routesPaths } from "../routes";

export default async function projectEditorAction({ request }: any) {
    const form = await request.formData();
    const id = form.get("id");
    const name = form.get("name");
    const description = form.get("description");
    const imageUrl = form.get("imageUrl");
    const stack = form.get("stack");
    const github = form.get("github");
    const online = form.get("online");

    let project = null;
    switch (request.method) {
        case "POST":
            project = await ProjectsService.createProject({
                name,
                description,
                imageUrl,
                stack: JSON.parse(stack),
                links: {
                    github,
                    online
                }
            });
            break;

        case "PATCH":
            project = await ProjectsService.updateProject({
                id,
                name,
                description,
                imageUrl,
                stack: JSON.parse(stack),
                links: {
                    github,
                    online
                }
            });
            break;
    }

    if (!project) {
        return null;
    }

    return redirect(routesPaths.ADMIN_PAGE)
}
