import skillModel, { Skill } from '../database/models/skillModel';
import AlreadyExistException from '../errors/AlreadyExistException';

class SkillService {
  private skill = skillModel;

  public getAllSkills = async () => {
    try {
      return await this.skill.find();
    } catch (error) {
      throw new Error('Server error!');
    }
  };

  public createSkill = async (skillBody: Skill) => {
    if (!skillBody.alt) skillBody.alt = `${skillBody.name} logo`;

    try {
      await this.checkUnique(skillBody.name);

      return await this.skill.create(skillBody);
    } catch (error) {
      throw new Error('Server error!');
    }
  };

  public modifySkill = async (id: string, skillBody: Skill) => {
    try {
      await this.checkUnique(skillBody.name);

      return await this.skill.findOneAndUpdate({ _id: id }, skillBody);
    } catch (error) {
      throw new Error('Server error!');
    }
  };

  public deleteSkill(id: string) {
    try {
      return this.skill.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Server error!');
    }
  }

  private checkUnique = async (name: string) => {
    try {
      const unique = await this.skill.findOne({ name });
      if (unique) throw new AlreadyExistException('Skill');
    } catch (error) {
      throw new Error('Server error!');
    }
  };
}

export default SkillService;
