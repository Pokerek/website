import 'dotenv/config';

import validateEnv from './utils/validateEnv';

import AuthenticationRoute from './routes/authentication-route';
import PostsRoute from './routes/posts-route';
import ProjectsRoute from './routes/projects-route';
import MailRoute from './routes/mail-route';
import SkillsRoute from './routes/skills-route';
import UploadsRoute from './routes/uploads-route';

import App from './app';
import ExperiencesRoute from './routes/experiences-route';

validateEnv();

const app = new App([
  new AuthenticationRoute(),
  new PostsRoute(),
  new ProjectsRoute(),
  new MailRoute(),
  new SkillsRoute(),
  new UploadsRoute(),
  new ExperiencesRoute()
]);

app.listen();
