import mongoose from 'mongoose';

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
export type Project = {
  name: string;
  image: { src: string; alt: string };
  link: string;
  tags: [string];
  technologies: [string];
};

const projectModel = mongoose.model<Project & mongoose.Document>(
  'Project',
  projectSchema
);
export default projectModel;
