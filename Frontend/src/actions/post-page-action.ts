import { redirect } from 'react-router-dom';

import PostsService from '../services/posts-service';

import ROUTES from '../constants/routes';

export default async function postPageAction({ request }: any) {
    const form = await request.formData()
    const id = form.get('id')
    const title = form.get('title')
    const text = form.get('text')

    switch (request.method) {
        case 'POST': {
            const post = await PostsService.createPost({ title, text, createdDate: new Date() });
            if (!post) {
                return null;
            }

            return redirect(ROUTES.JOURNAL_PAGE.PATH);
        }
        case 'PATCH': {
            const post = await PostsService.updatePost({ id, title, text, createdDate: new Date() });
            if (!post) {
                return null;
            }

            return redirect(ROUTES.JOURNAL_PAGE.PATH);
        }
    }

    return null;
}