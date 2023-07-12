import BusinessLogicError from "../../errors/business-logic-error";

export default class AccountAlreadyExistsError extends BusinessLogicError {
    constructor() {
        super(`Account already exists.`);
    }
}