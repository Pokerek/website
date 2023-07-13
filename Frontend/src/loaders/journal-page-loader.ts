import PostsService from "../services/posts-service";

export default async function journalPageLoader() {
    return await PostsService.getPosts();
}