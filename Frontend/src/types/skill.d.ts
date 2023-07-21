interface Skill {
  id?: string;
  name: string;
  category: "frontend" | "backend" | "tool";
  imageUrl: string;
}

type SkillInput = Omit<Skill, "id">;
