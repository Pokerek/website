import { redirect } from 'react-router-dom';

import PostsService from '../services/posts-service';

import { routesPaths } from '../routes';

export default async function postPageAction({ request }: any) {
    const form = await request.formData()
    const id = form.get('id')
    const title = form.get('title')
    const text = form.get('text')

    let post = null;
    switch (request.method) {
        case 'POST':
            post = await PostsService.createPost({ title, text });
            break;

        case 'PATCH':
            post = await PostsService.updatePost({ id, title, text });
            break;
    }

    if (!post) {
        return null;
    }

    return redirect(routesPaths.JOURNAL_PAGE)
}