import GenericRoute from './generic-route';
import PostsController from '../controllers/posts-controller';
import authorizationMiddleware from '../middleware/authorization-middleware';

export default class PostsRoutes extends GenericRoute {
  private postsController = new PostsController();

  constructor() {
    super('/posts');

    this.router.get(
      this.path,
      this.postsController.getPosts
    );

    this.router.get(
      `${this.path}/:id`,
      this.postsController.getPost
    );

    this.router.post(
      this.path,
      authorizationMiddleware,
      this.postsController.createPost
    );

    this.router.patch(
      `${this.path}/:id`,
      authorizationMiddleware,
      this.postsController.updatePost
    );

    this.router.delete(
      `${this.path}/:id`,
      authorizationMiddleware,
      this.postsController.deletePost
    );
  }
}
