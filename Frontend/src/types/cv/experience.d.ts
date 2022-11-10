export type TExperience = {
  position: string;
  company: string;
  duration: string;
  location: string;
  responsibility: string;
  stack: [string];
  projects: [
    {
      name: string;
      url: string;
    },
  ];
};
