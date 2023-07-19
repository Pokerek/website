import ProjectsService from "../services/projects-service";

export default async function projectsPageLoader() {
    const posts = await ProjectsService.getProjects();

    return posts;
}