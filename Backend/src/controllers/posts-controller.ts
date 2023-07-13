import { Request, Response } from 'express';

import PostsService from '../services/posts-service';
import PostValidation from './validations/post-validation';

export default class PostsController {
  private postsService = new PostsService();

  getAllPosts = async (req: Request, res: Response) => {
    const page = req.query.page ? +req.query.page : 1;

    const response = await this.postsService.getAllPosts({ page, limit: 5 });

    res.json(response);
  };

  getPost = async (req: Request, res: Response) => {
    const { id } = req.params;

    const post = await this.postsService.getPost(id);

    res.json(post);
  };

  createPost = async (req: Request, res: Response) => {
    const validatedBodyPost = PostValidation.createPost(req.body);

    const post = await this.postsService.createPost(validatedBodyPost);

    res.json(post);
  };

  modifyPost = async (
    req: Request,
    res: Response
  ) => {
    const { id } = req.params;
    const validatedBodyPost = PostValidation.updatePost(req.body);

    await this.postsService.modifyPost(id, validatedBodyPost);

    res.json({ message: 'Post updated' });
  };

  deletePost = async (
    req: Request,
    res: Response
  ) => {
    const { id } = req.params;

    await this.postsService.deletePost(id);

    res.json({ message: 'Post deleted' });
  };
}