import 'dotenv/config';
import validateEnv from './utils/validateEnv';
import App from './app';

import PostsRoutes from './routes/postRoutes';
import ProjectsRoutes from './routes/projectsRoutes';
import AuthenticationRoutes from './routes/authenticationRoutes';
import CVRoutes from './routes/cvRoutes';

validateEnv();

const app = new App([
  new PostsRoutes(),
  new ProjectsRoutes(),
  new AuthenticationRoutes(),
  new CVRoutes()
]);

app.listen();
