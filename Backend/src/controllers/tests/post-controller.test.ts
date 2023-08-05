import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import PostsController from '../posts-controller';
import PostsService from '../../services/posts-service';
import mongoose from 'mongoose';

jest.mock('../../services/posts-service');

describe('PostsController', () => {
    let postsController: PostsController;
    let postsService: PostsService;
    let req: Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
        postsService = {} as PostsService;
        postsController = new PostsController(postsService);
        req = {} as Request;
        res = {} as Response;
        req.query = {};
        res.json = jest.fn().mockReturnValue(res);
        res.status = jest.fn().mockReturnValue(res);
        next = jest.fn();
    });

    describe('getPosts', () => {
        it('should return posts', async () => {
            const response = {
                posts: [],
                total: 0,
                pages: 1,
            };

            postsService.getPosts = jest.fn().mockResolvedValue(response);

            await postsController.getPosts(req, res, next);

            expect(res.json).toHaveBeenCalledWith(response);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        });

        it('should call next with error', async () => {
            const error = new Error('error');
            postsService.getPosts = jest.fn().mockRejectedValue(error);

            await postsController.getPosts(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });

    describe('getPost', () => {
        it('should return a post', async () => {
            const ObjectId = mongoose.Types.ObjectId;
            const id = new ObjectId().toHexString();
            const post = {
                _id: id,
                title: 'title',
                content: 'content',
            };
            postsService.getPost = jest.fn().mockResolvedValue(post);
            req.params = { id };

            await postsController.getPost(req, res, next);

            expect(res.json).toHaveBeenCalledWith(post);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        });

        it('should call error if id is not valid', async () => {
            const id = 'id';
            postsService.getPost = jest.fn();
            req.params = { id };

            await postsController.getPost(req, res, next);

            expect(postsService.getPost).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(new Error(`Invalid id: ${id}`));
            expect(next).toHaveBeenCalledTimes(1);
        });

        it('should call next with error', async () => {
            const ObjectId = mongoose.Types.ObjectId;
            const id = new ObjectId().toHexString();
            const error = new Error('error');
            postsService.getPost = jest.fn().mockRejectedValue(error);
            req.params = { id };

            await postsController.getPost(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });

    describe('createPost', () => {
        it('should create a post', async () => {
            const post = {
                title: 'title',
                text: 'text',
                tags: ['tag1', 'tag2'],
                createdDate: new Date(),
            };
            postsService.createPost = jest.fn().mockResolvedValue(post);
            req.body = post;

            await postsController.createPost(req, res, next);

            expect(res.json).toHaveBeenCalledWith(post);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
        });

        it('should call next with error if title is not provided', async () => {
            const post = {
                text: 'text',
                tags: ['tag1', 'tag2'],
                createdDate: new Date(),
            };
            req.body = post;

            await postsController.createPost(req, res, next);

            expect(next).toHaveBeenCalledWith(new Error('"title" is required'));
            expect(next).toHaveBeenCalledTimes(1);
        });

        it('should call next with error if add extra property', async () => {
            const ObjectId = mongoose.Types.ObjectId;
            const id = new ObjectId().toHexString();
            const post = {
                title: 'title',
                text: 'content',
                extra: 'extra',
            };

            postsService.updatePost = jest.fn();
            req.params = { id };
            req.body = post;

            await postsController.updatePost(req, res, next);

            expect(postsService.updatePost).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(new Error(`"extra" is not allowed`));
            expect(next).toHaveBeenCalledTimes(1);
        });

        it('should call next with error', async () => {
            const post = {
                title: 'title',
                text: 'text',
                tags: ['tag1', 'tag2'],
                createdDate: new Date(),
            }
            const error = new Error('error');
            postsService.createPost = jest.fn().mockRejectedValue(error);
            req.body = post;

            await postsController.createPost(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });

    describe('updatePost', () => {
        it('should update a post', async () => {
            const ObjectId = mongoose.Types.ObjectId;
            const id = new ObjectId().toHexString();
            const post = {
                title: 'title',
                text: 'content',
            };
            postsService.updatePost = jest.fn();
            req.params = { id };
            req.body = post;

            await postsController.updatePost(req, res, next);

            expect(res.json).toHaveBeenCalledWith({ message: 'Post modified successfully' });
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        });

        it('should call next with error if id is not valid', async () => {
            const id = 'id';
            postsService.updatePost = jest.fn();
            req.params = { id };

            await postsController.updatePost(req, res, next);

            expect(postsService.updatePost).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(new Error(`Invalid id: ${id}`));
            expect(next).toHaveBeenCalledTimes(1);
        });

        it('should call next with error if add extra property', async () => {
            const ObjectId = mongoose.Types.ObjectId;
            const id = new ObjectId().toHexString();
            const post = {
                title: 'title',
                text: 'content',
                extra: 'extra',
            };

            postsService.updatePost = jest.fn();
            req.params = { id };
            req.body = post;

            await postsController.updatePost(req, res, next);

            expect(postsService.updatePost).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(new Error(`"extra" is not allowed`));
            expect(next).toHaveBeenCalledTimes(1);
        });

        it('should call next with error', async () => {
            const ObjectId = mongoose.Types.ObjectId;
            const id = new ObjectId().toHexString();
            const post = {
                title: 'title',
                text: 'content',
            };
            const error = new Error('error');
            postsService.updatePost = jest.fn().mockRejectedValue(error);
            req.params = { id };
            req.body = post;

            await postsController.updatePost(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });

    describe('deletePost', () => {
        it('should delete a post', async () => {
            const ObjectId = mongoose.Types.ObjectId;
            const id = new ObjectId().toHexString();
            postsService.deletePost = jest.fn();
            req.params = { id };

            await postsController.deletePost(req, res, next);

            expect(res.json).toHaveBeenCalledWith({ message: 'Post deleted successfully' });
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        });

        it('should call next with error if id is not valid', async () => {
            const id = 'id';
            postsService.deletePost = jest.fn();
            req.params = { id };

            await postsController.deletePost(req, res, next);

            expect(postsService.deletePost).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(new Error(`Invalid id: ${id}`));
            expect(next).toHaveBeenCalledTimes(1);
        });

        it('should call next with error', async () => {
            const ObjectId = mongoose.Types.ObjectId;
            const id = new ObjectId().toHexString();
            const error = new Error('error');
            postsService.deletePost = jest.fn().mockRejectedValue(error);
            req.params = { id };

            await postsController.deletePost(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });
});