import 'dotenv/config';
import App from './app';
import CVRoutes from './routes/cvRoutes';
import PostsRoutes from './routes/postRoutes';
import AuthenticationController from './controllers/authentication.controller';
import CVController from './pdf/cv.controller';
import ProjectsController from './controllers/projects.controller';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([
  new PostsRoutes(),
  // new ProjectsController(),
  // new AuthenticationController(),
  new CVRoutes()
]);

app.listen();
