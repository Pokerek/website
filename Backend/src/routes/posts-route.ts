import { Router } from 'express';
import PostsController from '../controllers/posts-controller';
import RouterWithPath from '../types/router';
import validationMiddleware from '../middleware/validation-middleware';
import { createPostSchema, updatePostSchema } from '../controllers/validations/post-validation';
import authorizationMiddleware from '../middleware/authorization-middleware';

class PostsRoutes implements RouterWithPath {
  public path = '/posts';
  public router = Router();

  private postsController = new PostsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.postsController.getAllPosts);
    this.router.get(`${this.path}/:id`, this.postsController.getPost);
    this.router.post(
      this.path,
      authorizationMiddleware,
      validationMiddleware(createPostSchema),
      this.postsController.createPost
    );
    this.router.patch(
      `${this.path}/:id`,
      authorizationMiddleware,
      validationMiddleware(updatePostSchema),
      this.postsController.modifyPost
    );
    this.router.delete(
      `${this.path}/:id`,
      authorizationMiddleware,
      this.postsController.deletePost
    );
  }
}

export default PostsRoutes;
