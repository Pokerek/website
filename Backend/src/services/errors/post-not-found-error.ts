import NotFoundError from '../../errors/not-found-error';

export default class PostNotFoundError extends NotFoundError {
    constructor(postId: string) {
        super(`Post with id ${postId} not found`);
    }
}