import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: { type: String, required: true },
    stack: [String],
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    links: {
        online: String,
        github: String
    }
});

const ProjectModel = mongoose.model('Project', ProjectSchema);
export default ProjectModel;
