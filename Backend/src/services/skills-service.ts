import SkillModel from '../models/skill-model';
import SkillNotFoundError from './errors/skill-not-found-error';

type SkillCategory = 'frontend' | 'backend' | 'tool';

interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  imageUrl: string;
  order: number;
}

export type SkillInput = Omit<Skill, 'id'>;
export type SkillUpdateInput = Partial<SkillInput>;

export default class SkillService {
  getSkills = async () => {
    const skills = (await SkillModel.find()).map(skill => {
      return {
        id: skill._id.toString(),
        name: skill.name,
        category: skill.category as SkillCategory,
        imageUrl: skill.imageUrl,
        order: skill.order
      };
    });

    return skills;
  };

  getSkill = async (
    id: string
  ): Promise<Skill> => {
    const skill = await SkillModel.findById(id);

    if (!skill) {
      throw new SkillNotFoundError(id);
    }

    return {
      id: skill._id.toString(),
      name: skill.name,
      category: skill.category as SkillCategory,
      imageUrl: skill.imageUrl,
      order: skill.order
    };
  }

  createSkill = async (skillBody: SkillInput): Promise<Skill> => {
    const skill = await SkillModel.create(skillBody);

    return {
      id: skill._id.toString(),
      name: skill.name,
      category: skill.category as SkillCategory,
      imageUrl: skill.imageUrl,
      order: skill.order
    };
  };

  updateSkill = async (
    id: string,
    skillBody: SkillUpdateInput
  ): Promise<void> => {
    const skill = await SkillModel.findByIdAndUpdate(id, skillBody);
    if (!skill) throw new SkillNotFoundError(id);
  };

  deleteSkill = async (
    id: string
  ): Promise<void> => {
    const skill = await SkillModel.findByIdAndDelete(id);
    if (!skill) throw new SkillNotFoundError(id);
  }
}