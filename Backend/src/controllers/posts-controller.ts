import { Request, Response, NextFunction } from 'express';

import PostsService from '../services/posts-service';
import PostValidation from './validations/post-validation';

export default class PostsController {
  private postsService = new PostsService();

  getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    const page = req.query.page ? +req.query.page : 1;

    try {
      const response = await this.postsService.getAllPosts({ page, limit: 5 });

      res.json(response);
    } catch (error) {
      next(error);
    };
  };

  getPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    try {
      const post = await this.postsService.getPost(id);

      res.json(post);
    } catch (error) {
      next(error);
    };
  };

  createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const validatedBodyPost = PostValidation.createPost(req.body);

      const post = await this.postsService.createPost(validatedBodyPost);

      res.json(post);
    } catch (error) {
      next(error)
    };
  };

  modifyPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    try {
      const validatedBodyPost = PostValidation.updatePost(req.body);

      await this.postsService.modifyPost(id, validatedBodyPost);

      res.json({ message: 'Post updated' });
    } catch (error) {
      next(error)
    };
  };

  deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    try {
      await this.postsService.deletePost(id);

      res.json({ message: 'Post deleted' });
    } catch (error) {
      next(error);
    };
  };
}