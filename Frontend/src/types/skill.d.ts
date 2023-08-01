interface Skill {
  id?: string;
  name: string;
  category: "frontend" | "backend" | "tool";
  imageUrl: string;
  order: number;
}

type SkillInput = Omit<Skill, "id">;
