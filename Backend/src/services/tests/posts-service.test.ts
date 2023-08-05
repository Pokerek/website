import mongoose from "mongoose";

import PostsService from "../posts-service";
import PostModel from "../../models/post-model";
import PostNotFoundError from "../errors/post-not-found-error";

jest.mock('../../models/post-model', () => ({
    find: jest.fn(),
    countDocuments: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
}));

describe('Posts Service', () => {
    let postsService: PostsService;
    const ObjectId = mongoose.Types.ObjectId;

    const generateMockPosts = (count: number) => {
        const posts = [];
        for (let i = 0; i < count; i++) {
            posts.push({
                id: new ObjectId().toHexString(),
                title: `Title ${i}`,
                createdDate: new Date(),
                text: `Text ${i}`,
                tags: []
            });
        }

        return posts;
    }

    beforeAll(() => {
        postsService = new PostsService();
    });

    describe('getPosts', () => {
        it('should return posts', async () => {
            const mockTotal = 20;
            const mockLimit = 5;
            const mockPages = Math.ceil(mockTotal / mockLimit);

            const posts = generateMockPosts(mockTotal);
            (PostModel.find as jest.Mock).mockReturnValueOnce({
                sort: jest.fn().mockReturnThis(),
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockReturnValue(posts)
            });
            (PostModel.countDocuments as jest.Mock).mockResolvedValue(mockTotal);

            const result = await postsService.getPosts({});
            expect(result.total).toEqual(mockTotal);
            expect(result.pages).toEqual(mockPages);
            expect(result.posts).toEqual(posts);
        });

        it('should return posts with pagination', async () => {
            const mockTotal = 20;
            const mockLimit = 5;
            const mockPages = Math.ceil(mockTotal / mockLimit);
            const mockPage = 2;

            const posts = generateMockPosts(mockTotal);
            (PostModel.find as jest.Mock).mockReturnValueOnce({
                sort: jest.fn().mockReturnThis(),
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockReturnValue(posts.slice((mockPage - 1) * mockLimit, mockPage * mockLimit))
            });
            (PostModel.countDocuments as jest.Mock).mockResolvedValue(mockTotal);

            const result = await postsService.getPosts({ limit: mockLimit, page: mockPage });
            expect(result.total).toEqual(mockTotal);
            expect(result.pages).toEqual(mockPages);
            expect(result.posts).toEqual(posts.slice((mockPage - 1) * mockLimit, mockPage * mockLimit));
        });

        it('should throw an error if the limit is less than 1', async () => {
            await expect(postsService.getPosts({ limit: 0 })).rejects.toThrow();
        });
    });

    describe('getPost', () => {
        it('should return a post', async () => {
            const mockId = new ObjectId().toHexString();
            const mockPost = {
                id: mockId,
                title: 'Title',
                createdDate: new Date(),
                text: 'Text',
                tags: []
            };

            (PostModel.findById as jest.Mock).mockResolvedValueOnce(mockPost);

            expect(await postsService.getPost(mockId)).toEqual(mockPost);
        });

        it('should throw an error if the post is not found', async () => {
            const mockId = new ObjectId().toHexString();
            (PostModel.findById as jest.Mock).mockResolvedValueOnce(null);

            expect(postsService.getPost(mockId)).rejects.toThrowError(new PostNotFoundError(mockId));
        });
    });

    describe('createPost', () => {
        it('should create a post', async () => {
            const mockPostInput = {
                title: 'Title',
                text: 'Text',
                tags: [],
                createdDate: new Date()
            };

            const mockPost = {
                id: new ObjectId().toHexString(),
                ...mockPostInput
            };

            (PostModel.create as jest.Mock).mockResolvedValueOnce(mockPost);

            expect(await postsService.createPost(mockPostInput)).toEqual(mockPost);
        });

        it('should throw an error if the post is not created', async () => {
            const mockPostInput = {
                title: 'Title',
                text: 'Text',
                tags: [],
                createdDate: new Date()
            };

            (PostModel.create as jest.Mock).mockRejectedValueOnce(new Error());

            expect(postsService.createPost(mockPostInput)).rejects.toThrow();
        });
    });

    describe('updatePost', () => {
        it('should throw an error if the post is not updated', () => {
            const mockId = new ObjectId().toHexString();
            const mockPostInput = {
                title: 'Title',
                text: 'Text',
                tags: [],
                createdDate: new Date()
            };

            (PostModel.findByIdAndUpdate as jest.Mock).mockRejectedValueOnce(new Error());

            expect(postsService.updatePost(mockId, mockPostInput)).rejects.toThrow();
        });

        it('should throw an error if the post is not found', () => {
            const mockId = new ObjectId().toHexString();
            const mockPostInput = {
                title: 'Title',
                text: 'Text',
                tags: [],
                createdDate: new Date()
            };

            (PostModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(null);

            expect(postsService.updatePost(mockId, mockPostInput)).rejects.toThrowError(new PostNotFoundError(mockId));
        });
    });

    describe('deletePost', () => {
        it('should throw an error if the post is not deleted', () => {
            const mockId = new ObjectId().toHexString();

            (PostModel.findByIdAndDelete as jest.Mock).mockRejectedValueOnce(new Error());

            expect(postsService.deletePost(mockId)).rejects.toThrow();
        });

        it('should throw an error if the post is not found', () => {
            const mockId = new ObjectId().toHexString();

            (PostModel.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(null);

            expect(postsService.deletePost(mockId)).rejects.toThrowError(new PostNotFoundError(mockId));
        });
    });
});