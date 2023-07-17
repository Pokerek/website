import { BACKEND_URL } from "../constants";

export default class ProjectsService {
    static async getProjects(): Promise<Project[]> {
        try {
            const response = await fetch(`${BACKEND_URL}/projects`, {
                method: "GET"
            });
            if (!response.ok) {
                throw new Error("Failed to fetch projects");
            }

            const projects = await response.json() as Project[];

            return projects;
        }
        catch (error) {
            console.error(error);
            return [];
        }
    }

    static async getProject(id: string): Promise<Project | null> {
        try {
            const response = await fetch(`${BACKEND_URL}/projects/${id}`, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error("Failed to fetch project");
            }

            const project = await response.json() as Project;

            return project;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}