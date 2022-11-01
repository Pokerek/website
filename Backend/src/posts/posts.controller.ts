import { NextFunction, Request, Response, Router } from 'express';
import NotFoundException from '../exceptions/NotFoundException';
import Controller from '../interface/controller.interface';
import RequestWithUser from '../interface/requestWithUser.interface';
import authMiddleware from '../middleware/authMiddleware';
import validationMiddleware from '../middleware/validation.middleware';
import CreatePostDto from './post.dto';
import Post from './post.interface';
import postModel from './posts.model';

class PostsController implements Controller {
  public path = '/posts';
  public router = Router();
  private post = postModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.post(
      this.path,
      authMiddleware,
      validationMiddleware(CreatePostDto),
      this.createPost
    );
    this.router.patch(
      `${this.path}/:id`,
      authMiddleware,
      validationMiddleware(CreatePostDto, true),
      this.modifyPost
    );
    this.router.delete(`${this.path}/:id`, authMiddleware, this.deletePost);
  }

  private getAllPosts = (req: Request, res: Response) => {
    this.post
      .find()
      .sort({ createdDate: -1 })
      .then((posts) => {
        res.status(200).json(posts);
      });
  };

  private modifyPost = (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const postBody: Post = req.body;
    this.post.findByIdAndUpdate(id, postBody, { new: true }).then((post) => {
      if (post) {
        res.json({ message: 'Post update!' });
      } else {
        next(new NotFoundException(id, 'Post'));
      }
    });
  };

  private createPost = (req: RequestWithUser, res: Response) => {
    const postData: Post = req.body;
    const createdPost = new this.post(postData);
    createdPost.save().then(() => res.json({ message: 'Post created' }));
  };

  private deletePost = (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    this.post.findByIdAndDelete(id).then((successResponse) => {
      if (successResponse) {
        res.json({ message: 'Post deleted' });
      } else {
        next(new NotFoundException(id, 'Post'));
      }
    });
  };
}
export default PostsController;
