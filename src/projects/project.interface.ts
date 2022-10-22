interface Project {
  name: string;
  image: { src: string; alt: string };
  link: string;
  tags: [string];
  technologies: [string];
}

export default Project;
