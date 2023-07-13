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

            const data = await response.json() as GetPostsResponse;

            return data.posts;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}