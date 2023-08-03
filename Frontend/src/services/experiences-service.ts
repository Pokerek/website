import { BACKEND_URL } from "../constants";

export default class ExperiencesService {
    static async getExperiences(cache = false): Promise<Experience[]> {
        try {
            const response = await fetch(`${BACKEND_URL}/experiences/`, {
                method: "GET",
                cache: cache ? "default" : "reload"
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

    static async getExperience(id: string): Promise<Experience | null> {
        try {
            const response = await fetch(`${BACKEND_URL}/experiences/${id}`, {
                method: "GET",
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error("Failed to fetch experience");
            }

            const experience = await response.json() as Experience;

            return experience;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async createExperience(experienceInput: ExperienceInput) {
        try {
            const response = await fetch(`${BACKEND_URL}/experiences`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(experienceInput),
            });

            if (!response.ok) {
                throw new Error("Failed to create experience");
            }

            return await response.json() as Experience;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async updateExperience(id: string, experienceInput: ExperienceInput) {
        try {
            const response = await fetch(`${BACKEND_URL}/experiences/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(experienceInput),
            });

            if (!response.ok) {
                throw new Error("Failed to update experience");
            }

            return await response.json() as Experience;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}