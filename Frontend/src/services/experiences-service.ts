import { BACKEND_URL } from "../constants";

export default class ExperiencesService {
    static async getExperiences(): Promise<Experience[]> {
        try {
            const response = await fetch(`${BACKEND_URL}/experiences/`, {
                method: "GET"
            });
            if (!response.ok) {
                throw new Error("Failed to fetch experiences");
            }

            const experiences = await response.json() as Experience[];

            return experiences;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}