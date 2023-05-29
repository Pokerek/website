import { Router } from 'express';

interface RouterWithPath {
  router: Router;
  path: string;
}

export default RouterWithPath;
