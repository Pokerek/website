import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const techSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  area: { type: String, required: true },
  learned: { type: Boolean, required: true }
});

const cvSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true },
  bio: { type: String, required: true },
  cvUri: { type: String, required: true },
  profession: { type: String, required: true },
  level: { type: String, required: true },
  languages: [String],
  devLanguage: { type: String, required: true },
  motivation: { type: String, required: true },
  skills: [techSchema],
  experience: [
    {
      position: { type: String, required: true },
      company: { type: String, required: true },
      duration: { type: String, required: true },
      location: { type: String, default: false },
      responsibility: { type: String, required: true },
      stack: [String],
      projects: [
        {
          name: { type: String, required: true },
          url: { type: String, required: true }
        }
      ]
    }
  ],
  projects: [
    {
      name: { type: String, required: true },
      technology: [String],
      description: { type: String, required: true },
      links: {
        online: { type: String, required: true },
        github: { type: String, required: true }
      }
    }
  ],
  social: [
    {
      name: { type: String, required: true },
      icon: { type: String, required: true },
      url: { type: String, required: true }
    }
  ],
  contact: [
    {
      name: { type: String, required: true },
      link: { type: String, required: true }
    }
  ]
});

export type CV = mongoose.InferSchemaType<typeof cvSchema>;

const cvModel = mongoose.model<CV & mongoose.Document>('CV', cvSchema);
export default cvModel;
