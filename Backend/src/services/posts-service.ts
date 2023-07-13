import { isValidObjectId } from 'mongoose';
import PostModel from '../models/post-model';

import PostNotFoundError from './errors/post-not-found-error';

interface Post {
    id: string;
    title: string;
    createdDate: Date;
    text: string;
    tags: string[];
}

export type PostInput = Omit<Post, 'id'>;
export type PostUpdateInput = Partial<PostInput>;

export default class PostsService {
    getAllPosts = async ({
        limit = 5,
        page = 1
    }): Promise<{
        total: number,
        pages: number,
        posts: Post[]
    }> => {
        const posts = await PostModel
            .find()
            .sort({ createdDate: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await PostModel.countDocuments();
        const pages = parseInt((total / limit + 1).toFixed());

        return {
            total,
            pages,
            posts: posts.map(post => ({
                id: post._id.toString(),
                title: post.title as string,
                createdDate: post.createdDate,
                text: post.text as string,
                tags: post.tags
            }))
        }
    }

    getPost = async (
        id: string
    ): Promise<Post> => {
        if (isValidObjectId(id) === false) {
            throw new PostNotFoundError(id);
        }

        const post = await PostModel.findById(id);
        if (!post) throw new PostNotFoundError(id);

        return {
            id: post._id.toString(),
            title: post.title as string,
            createdDate: post.createdDate,
            text: post.text as string,
            tags: post.tags
        };
    }

    createPost = async (
        postData: PostInput
    ): Promise<Post> => {
        const createdPost = new PostModel(postData);
        await createdPost.save();

        return {
            id: createdPost._id.toString(),
            title: createdPost.title as string,
            createdDate: createdPost.createdDate,
            text: createdPost.text as string,
            tags: createdPost.tags
        };
    }

    modifyPost = async (
        id: string,
        postBody: PostUpdateInput
    ): Promise<void> => {
        const post = await PostModel.findByIdAndUpdate(id, postBody, { new: true });

        if (!post) throw new PostNotFoundError(id);
    }

    deletePost = async (
        id: string
    ): Promise<void> => {
        const post = await PostModel.findByIdAndDelete(id);

        if (!post) throw new PostNotFoundError(id);
    }
} 