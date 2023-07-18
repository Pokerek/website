import 'dotenv/config';

import validateEnv from './utils/validateEnv';

import AuthenticationRoute from './routes/authentication-route';
import PostsRoute from './routes/posts-route';
import ProjectsRoute from './routes/projects-route';
import MailRoute from './routes/mail-route';
import SkillsRoute from './routes/skills-route';
import uploadsRoute from './routes/uploads-route';

import App from './app';

validateEnv();

const app = new App([
  new AuthenticationRoute(),
  new PostsRoute(),
  new ProjectsRoute(),
  new MailRoute(),
  new SkillsRoute(),
  new uploadsRoute()
]);

app.listen();
