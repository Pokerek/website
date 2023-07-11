import 'dotenv/config';
import validateEnv from './utils/validateEnv';
import App from './app';

import PostRoutes from './routes/postRoutes';
import ProjectRoutes from './routes/projectRoutes';
import AuthenticationRoutes from './routes/authentication-route';
import CVRoutes from './routes/cvRoutes';
import MailRoutes from './routes/mailRoutes';
import SkillsRoutes from './routes/skillRoutes';
import createStorage from './utils/createStorage';
import ImageRoutes from './routes/imageRoutes';

validateEnv();
createStorage(['./uploads', './uploads/images']);

const app = new App([
  new PostRoutes(),
  new ProjectRoutes(),
  new AuthenticationRoutes(),
  new CVRoutes(),
  new MailRoutes(),
  new SkillsRoutes(),
  new ImageRoutes()
]);

app.listen();
