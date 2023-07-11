import BusinessLogicError from "../../errors/business-logic-error";

export default class AccountAlreadyExistsError extends BusinessLogicError {
    constructor(email: string) {
        super(`Account with email ${email} already exists.`);
    }
}