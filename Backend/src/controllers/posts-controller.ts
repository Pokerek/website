import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import type PostsService from '../services/posts-service';
import PostValidation from './validations/post-validation';
import validateId from '../utils/validateId';

export default class PostsController {
  private postsService: PostsService;

  constructor(postsService: PostsService) {
    this.postsService = postsService;
  }

  getPosts = async (req: Request, res: Response, next: NextFunction) => {
    const page = req.query.page ? +req.query.page : 1;

    try {
      const response = await this.postsService.getPosts({ page, limit: 5 });

      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    };
  };

  getPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = validateId(req.params.id);
      const post = await this.postsService.getPost(id);

      res.status(StatusCodes.OK).json(post);
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

      res.status(StatusCodes.CREATED).json(post);
    } catch (error) {
      next(error)
    };
  };

  updatePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = validateId(req.params.id);
      const validatedBodyPost = PostValidation.updatePost(req.body);

      await this.postsService.updatePost(id, validatedBodyPost);

      res.status(StatusCodes.OK).json({ message: 'Post modified successfully' });
    } catch (error) {
      next(error)
    };
  };

  deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = validateId(req.params.id);
      await this.postsService.deletePost(id);

      res.status(StatusCodes.OK).json({ message: 'Post deleted successfully' });
    } catch (error) {
      next(error);
    };
  };
}