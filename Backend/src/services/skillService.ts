import skillModel, { Skill } from '../database/models/skillModel';
import AlreadyExistException from '../errors/AlreadyExistException';
import HttpException from '../errors/HttpException';
import ServerErrorException from '../errors/ServerErrorException';

class SkillService {
  private skill = skillModel;

  public getAllSkills = async () => {
    try {
      return await this.skill.find();
    } catch (error) {
      return new ServerErrorException();
    }
  };

  public createSkill = async (skillBody: Skill) => {
    if (!skillBody.alt) skillBody.alt = `${skillBody.name} logo`;

    try {
      const isUnique = await this.checkUnique(skillBody.name);
      if (isUnique instanceof HttpException) return isUnique;

      const skill = await this.skill.create(skillBody);
      return skill;
    } catch (error) {
      return new ServerErrorException();
    }
  };

  public modifySkill = async (id: string, skillBody: Skill) => {
    try {
      const isUnique = await this.checkUnique(skillBody.name);
      if (isUnique instanceof HttpException) return isUnique;

      return await this.skill.findOneAndUpdate({ _id: id }, skillBody);
    } catch (error) {
      return new ServerErrorException();
    }
  };

  public deleteSkill(id: string) {
    try {
      return this.skill.findByIdAndDelete(id);
    } catch (error) {
      return new ServerErrorException();
    }
  }

  private checkUnique = async (name: string) => {
    try {
      const unique = await this.skill.findOne({ name });
      if (unique) return new AlreadyExistException('Skill');
    } catch (error) {
      return new ServerErrorException();
    }
  };
}

export default SkillService;
