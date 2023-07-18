import SkillModel from '../models/skill-model';
import SkillNotFoundError from './errors/skill-not-found-error';

type SkillCategory = 'frontend' | 'backend' | 'tool';

interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  imageUrl: string;
}

export type SkillInput = Omit<Skill, 'id' | 'imageUrl'>;
export type SkillUpdateInput = Partial<SkillInput>;

export default class SkillService {
  getSkills = async () => {
    const skills = (await SkillModel.find()).map(skill => {
      return {
        id: skill._id.toString(),
        name: skill.name,
        category: skill.category as SkillCategory,
        imageUrl: skill.imageUrl
      };
    });

    return skills;
  };

  createSkill = async (skillBody: SkillInput): Promise<Skill> => {
    const skill = await SkillModel.create(skillBody);

    return {
      id: skill._id.toString(),
      name: skill.name,
      category: skill.category as SkillCategory,
      imageUrl: skill.imageUrl
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