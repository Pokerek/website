import 'dotenv/config';
import validateEnv from './utils/validateEnv';
import App from './app';

import PostRoutes from './routes/postRoutes';
import ProjectRoutes from './routes/projectRoutes';
import AuthenticationRoutes from './routes/authenticationRoutes';
import CVRoutes from './routes/cvRoutes';
import MailRoutes from './routes/mailRoutes';
import SkillsRoutes from './routes/skillRoutes';
import createStorage from './utils/createStorage';

validateEnv();
createStorage(['./uploads', './uploads/skills']);

const app = new App([
  new PostRoutes(),
  new ProjectRoutes(),
  new AuthenticationRoutes(),
  new CVRoutes(),
  new MailRoutes(),
  new SkillsRoutes()
]);

app.listen();
