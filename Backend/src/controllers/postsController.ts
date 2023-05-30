import { NextFunction, Request, Response } from 'express';
import NotFoundException from '../errors/NotFoundException';
import { RequestWithUser } from '../types/request';
import Post from '../types/post';
import postModel from '../database/model/posts.model';

class PostsController {
  private post = postModel;

  public getAllPosts = async (req: Request, res: Response) => {
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

  public getPost = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    this.post.findById(id).then((post) => {
      if (!post) next(new NotFoundException(id, 'Post'));

      res.status(200).json(post);
    });
  };

  public modifyPost = (
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

  public createPost = (req: RequestWithUser, res: Response) => {
    const postData: Post = req.body;
    const createdPost = new this.post(postData);
    createdPost.save().then(() => res.json({ message: 'Post created' }));
  };

  public deletePost = (
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
