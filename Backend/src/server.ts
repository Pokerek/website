import 'dotenv/config';
import validateEnv from './utils/validateEnv';
import App from './app';

import CVRoutes from './routes/cvRoutes';
import PostsRoutes from './routes/postRoutes';
import ProjectsRoutes from './routes/projectsRoutes';

validateEnv();

const app = new App([
  new PostsRoutes(),
  new ProjectsRoutes(),
  // new AuthenticationController(),
  new CVRoutes()
]);

app.listen();
