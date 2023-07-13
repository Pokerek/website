import 'dotenv/config';
import validateEnv from './utils/validateEnv';
import App from './app';

import PostRoutes from './routes/posts-route';
import ProjectRoutes from './routes/projects-route';
import AuthenticationRoutes from './routes/authentication-route';
import CVRoutes from './routes/cv-route';
import MailRoutes from './routes/mail-route';
import SkillsRoutes from './routes/skills-route';
import createStorage from './utils/createStorage';
import ImageRoutes from './routes/image-route';

validateEnv();
createStorage(['./uploads', './uploads/images']);

const app = new App([
  new PostRoutes('/posts'),
  new ProjectRoutes(),
  new AuthenticationRoutes('/auth'),
  new CVRoutes(),
  new MailRoutes(),
  new SkillsRoutes(),
  new ImageRoutes()
]);

app.listen();
