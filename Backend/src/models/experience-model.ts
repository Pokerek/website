import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const experienceSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
    },
    technologies: [String],
    description: {
        type: String,
        required: true,
    },
});

const ExperienceModel = mongoose.model('Experience', experienceSchema);
export default ExperienceModel;