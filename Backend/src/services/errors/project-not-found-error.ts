import NotFoundError from "../../errors/not-found-error";

export default class ProjectNotFoundError extends NotFoundError {
    constructor(id: string) {
        super(`Project with id ${id} not found`);
    }
}