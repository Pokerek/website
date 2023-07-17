import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const skillSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        default: ''
    },
    imageUrl: {
        type: String,
        required: true,
        default: ''
    },
    category: {
        type: String,
        required: true,
        enum: ['frontend', 'backend', 'tool'],
        default: 'frontend'
    }
});

const SkillModel = mongoose.model('Skill', skillSchema);
export default SkillModel;
