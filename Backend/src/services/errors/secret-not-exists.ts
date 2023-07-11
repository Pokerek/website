import ServerError from "../../errors/server-error";

export default class SecretNotExistsError extends ServerError {
    constructor() {
        super('Secret not exists!');
    }
}