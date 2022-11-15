export type TProject = {
  name: string;
  technology: [string];
  description: string;
  imageUrl: string;
  links: {
    online?: string;
    github?: string;
  };
  showInCv: boolean;
};
