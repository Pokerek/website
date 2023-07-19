import { redirect } from "react-router-dom";
import PostsService from "../services/posts-service";
import { routesPaths } from "../routes";

export default async function postPageLoader({ params }: any) {
    const { id } = params;
    if (!id) return null;

    const post = await PostsService.getPost(id);
    if (!post) {
        return redirect(routesPaths.WRITE_POST_PAGE);
    }

    return post;
}