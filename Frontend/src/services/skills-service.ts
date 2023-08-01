import { BACKEND_URL } from "../constants";

export default class SkillsService {
    static async getSkills() {
        try {
            const response = await fetch(`${BACKEND_URL}/skills`);
            if (!response.ok) throw new Error("Failed to fetch skills");


            const skills = await response.json() as Skill[];


            return skills.sort((a, b) => {
                if (a.category < b.category) { return -1; }
                if (a.category > b.category) { return 1; }

                if (a.order < b.order) { return -1; }
                if (a.order > b.order) { return 1; }

                return b.name < a.name ? 1 : -1;
            });
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    static async getSkill(id: string) {
        try {
            const response = await fetch(`${BACKEND_URL}/skills/${id}`);
            if (!response.ok) throw new Error("Failed to fetch skill");

            return await response.json() as Skill;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async createSkill(skillInput: SkillInput) {
        try {
            const response = await fetch(`${BACKEND_URL}/skills`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(skillInput),
            });
            if (!response.ok) throw new Error("Failed to create skill");

            return await response.json() as Skill;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async updateSkill(skill: Skill) {
        const { id, ...skillInput } = skill;
        try {
            const response = await fetch(`${BACKEND_URL}/skills/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(skillInput),
            });

            if (!response.ok) throw new Error("Failed to update skill");

            return await response.json() as Skill;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}