import { TExperience } from "./experience";
import { TSkill } from "./skill";

export type TCV = {
  firstName: string;
  lastName: string;
  location: string;
  email: string;
  bio: string;
  cvUri: string;
  profession: string;
  level: string;
  languages: [string];
  devLanguage: string;
  motivation: string;
  skills: [TSkill];
  experience: [TExperience];
  social: [
    {
      name: string;
      body: string;
      url: string;
    },
  ];
  contact: [
    {
      name: string;
      link: string;
    },
  ];
};
