import mongoose from 'mongoose';

const Schema = mongoose.Schema;

interface Skill {
  name: string;
  url: string;
  alt: string;
  type: 'strong' | 'weak' | 'neutral';
}

type SkillDocument = Skill & mongoose.Document;

const skillSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  url: {
    type: String
  },

  alt: {
    type: String
  },

  type: {
    type: String,
    required: true
  }
});

const skillModel = mongoose.model<SkillDocument>('Skill', skillSchema);

export default skillModel;
export { Skill };
