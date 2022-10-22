import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const creatorSchema = new Schema({
  firstName: String,
  lastName: String,
  location: String,
  bio: String,
  cvUri: String,
  techData: {
    profession: String,
    level: String,
    languages: [String],
    devLanguage: String,
    motivation: String,
    stack: [
      {
        area: String,
        technology: [
          {
            name: String,
            imageUrl: String
          }
        ]
      }
    ]
  },
  experience: [
    {
      position: String,
      company: String,
      duration: String,
      remote: Boolean,
      responsibility: String,
      projects: [
        {
          name: String,
          url: String
        }
      ]
    }
  ],
  social: [{ icon: String, url: String }]
});

export default creatorSchema;
