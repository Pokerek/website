import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface Skill {
    name: string;
    url: string;
    alt: string;
    type: 'frontend' | 'backend' | 'tool';
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

const SkillModel = mongoose.model<SkillDocument>('Skill', skillSchema);
export default SkillModel;
