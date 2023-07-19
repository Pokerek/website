import NotFoundError from "../../errors/not-found-error";

export default class SkillNotFoundError extends NotFoundError {
    constructor(id: string) {
        super(`Skill with id ${id} not found`);
    }
}