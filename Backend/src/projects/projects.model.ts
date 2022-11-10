import mongoose from 'mongoose';
import Project from './project.interface';

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: true },
  stack: [String],
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  links: {
    online: String,
    github: String
  },
  showInCv: { type: Boolean, required: true }
});

const projectModel = mongoose.model<Project & mongoose.Document>(
  'Project',
  projectSchema
);
export default projectModel;
