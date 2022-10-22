import 'dotenv/config';
import App from './app';
import AuthenticationController from './authentication/authentication.controller';
import PostsController from './posts/posts.controller';
import ProjectsController from './projects/projects.controller';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([
  new PostsController(),
  new ProjectsController(),
  new AuthenticationController()
]);

app.listen();
