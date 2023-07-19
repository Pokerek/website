import NotFoundError from "../../errors/not-found-error";

export default class ExperienceNotFoundError extends NotFoundError {
    constructor(id: string) {
        super(`Experience with id ${id} not found`);
    }
}