import { Router } from 'express';
import PostsController from '../controllers/posts.controller';
import RouterWithPath from '../types/router';
import authMiddleware from '../middleware/authMiddleware';

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
      authMiddleware,
      // validationMiddleware(CreatePostDto),
      this.postsController.createPost
    );
    this.router.patch(
      `${this.path}/:id`,
      authMiddleware,
      // validationMiddleware(CreatePostDto, true),
      this.postsController.modifyPost
    );
    this.router.delete(
      `${this.path}/:id`,
      authMiddleware,
      this.postsController.deletePost
    );
  }
}

export default PostsRoutes;
