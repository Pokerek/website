import mongoose from 'mongoose';
import Project from './project.interface';

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  link: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: Object,
    required: true
  },
  tags: [String],
  technologies: [String]
});

const projectModel = mongoose.model<Project & mongoose.Document>(
  'Project',
  projectSchema
);
export default projectModel;
