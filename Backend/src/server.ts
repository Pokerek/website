import 'dotenv/config';

import validateEnv from './utils/validateEnv';
import createStorage from './utils/createStorage';

import AuthenticationRoute from './routes/authentication-route';
import PostsRoute from './routes/posts-route';
import ProjectsRoute from './routes/projects-route';
import CVRoutes from './routes/cv-route';
import MailRoutes from './routes/mail-route';
import SkillsRoutes from './routes/skills-route';
import ImageRoute from './routes/image-route';

import App from './app';

validateEnv();
createStorage(['./uploads', './uploads/images']);

const app = new App([
  new AuthenticationRoute('/auth'),
  new PostsRoute('/posts'),
  new ProjectsRoute('/projects'),
  // new CVRoutes(),
  // new MailRoutes(),
  // new SkillsRoutes(),
  new ImageRoute()
]);

app.listen();
