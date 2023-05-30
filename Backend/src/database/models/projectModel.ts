import mongoose from 'mongoose';

const Schema = mongoose.Schema;

interface Project {
  name: string;
  stack: string[];
  description: string;
  imageUrl: string;
  links: {
    online: string;
    github: string;
  };
}

type ProjectDocument = Project & mongoose.Document;

const projectSchema = new Schema({
  name: { type: String, required: true },
  stack: [String],
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  links: {
    online: String,
    github: String
  }
});

const projectModel = mongoose.model<ProjectDocument>('Project', projectSchema);
export default projectModel;
export { Project };
