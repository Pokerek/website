import NotFoundError from "../../errors/not-found-error";

export default class FileNotExistsError extends NotFoundError {
    constructor(name: string) {
        super(`File ${name} not found`);
    }
}