import GenericRoute from './generic-route';
import PostsController from '../controllers/posts-controller';
import authorizationMiddleware from '../middleware/authorization-middleware';
import PostsService from '../services/posts-service';

const PATH = '/posts';

export const POSTS_ROUTES = {
  GET_POSTS: {
    path: PATH,
    method: 'GET',
    protected: false,
  },
  GET_POST: {
    path: `${PATH}/:id`,
    method: 'GET',
    protected: true,
  },
  CREATE_POST: {
    path: PATH,
    method: 'POST',
    protected: true
  },
  UPDATE_POST: {
    path: `${PATH}/:id`,
    method: 'PATCH',
    protected: true
  },
  DELETE_POST: {
    path: `${PATH}/:id`,
    method: 'DELETE',
    protected: true
  }
}

export default class PostsRoutes extends GenericRoute {
  private postsController = new PostsController(new PostsService());

  constructor() {
    super(PATH);

    this.router.get(
      POSTS_ROUTES.GET_POSTS.path,
      this.postsController.getPosts
    );

    this.router.get(
      POSTS_ROUTES.GET_POST.path,
      this.postsController.getPost
    );

    this.router.post(
      POSTS_ROUTES.CREATE_POST.path,
      authorizationMiddleware,
      this.postsController.createPost
    );

    this.router.patch(
      POSTS_ROUTES.UPDATE_POST.path,
      authorizationMiddleware,
      this.postsController.updatePost
    );

    this.router.delete(
      POSTS_ROUTES.DELETE_POST.path,
      authorizationMiddleware,
      this.postsController.deletePost
    );
  }
}
