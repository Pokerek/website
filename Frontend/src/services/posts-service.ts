import { BACKEND_URL } from "../constants";

export default class PostsService {
    static async getPosts(page = 1) {
        try {
            const response = await fetch(`${BACKEND_URL}/posts/?page=${page}`, {
                method: "GET"
            });
            if (!response.ok) {
                throw new Error("Failed to fetch posts");
            }

            const data = await response.json() as PostsResponse;

            return data.posts;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    static async getPost(id: string) {
        try {
            const response = await fetch(`${BACKEND_URL}/posts/${id}`, {
                method: "GET"
            });
            if (!response.ok) {
                throw new Error("Failed to fetch post");
            }

            const post = await response.json() as Post;

            return post;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async createPost({ title, text, createdDate }: Post) {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found");
            return null;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/posts/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ title, text, createdDate })
            });
            if (!response.ok) {
                throw new Error("Failed to create post");
            }

            const post = await response.json() as Post;

            return post;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async updatePost({ id, title, text }: Post) {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found");
            return null;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/posts/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ title, text })
            });
            if (!response.ok) {
                throw new Error("Failed to update post");
            }

            const post = await response.json() as Post;

            return post;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}