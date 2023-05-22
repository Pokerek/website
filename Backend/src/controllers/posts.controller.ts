import { NextFunction, Request, Response, Router } from 'express';
import NotFoundException from '../errors/NotFoundException';
import Controller from '../types/controller';
import RequestWithUser from '../types/requestWithUser';
import authMiddleware from '../middleware/authMiddleware';
import validationMiddleware from '../middleware/validation.middleware';
import CreatePostDto from '../validations/post.dto';
import Post from '../types/post';
import postModel from '../database/model/posts.model';

class PostsController implements Controller {
  public path = '/posts';
  public router = Router();
  private post = postModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPost);
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

  private getAllPosts = async (req: Request, res: Response) => {
    const page = req.query.page ? +req.query.page : 1;

    const posts = await this.post
      .find()
      .sort({ createdDate: -1 })
      .skip((page - 1) * 5)
      .limit(5);
    const total = await this.post.countDocuments();

    const pages = parseInt((total / 5 + 1).toFixed());

    res.status(200).json({ total, pages, posts });
  };

  private getPost = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    this.post.findById(id).then((post) => {
      if (!post) next(new NotFoundException(id, 'Post'));

      res.status(200).json(post);
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
