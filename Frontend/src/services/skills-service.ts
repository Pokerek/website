import { BACKEND_URL } from "../constants";
import Skill from "../types/skill";

export default class SkillsService {
    static async getSkills() {
        try {
            const response = await fetch(`${BACKEND_URL}/skills`);
            if (!response.ok) throw new Error("Failed to fetch skills");


            return await response.json() as Skill[];
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}