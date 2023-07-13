import { redirect } from "react-router-dom";
import PostsService from "../services/posts-service";
import ROUTES from "../constants/routes";

export default async function postPageLoader({ params }: any) {
    const { id } = params;
    if (!id) return null;

    const post = await PostsService.getPost(id);
    if (!post) {
        return redirect(ROUTES.WRITE_POST_PAGE.PATH);
    }

    return post;
}