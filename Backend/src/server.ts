import 'dotenv/config';
import App from './app';
import AuthenticationController from './controllers/authentication.controller';
import CVController from './pdf/cv.controller';
import PostsController from './controllers/posts.controller';
import ProjectsController from './controllers/projects.controller';
import validateEnv from './utils/validateEnv';
import CVRouter from './routes/cvRoutes';

validateEnv();

const app = new App([
  // new PostsController(),
  // new ProjectsController(),
  // new AuthenticationController(),
  new CVRouter()
]);

app.listen();
