import Joi from 'joi';

import GenericValidation from './generic-validation';

import type { MailInput } from '../../services/mail-service';

const createMailSchema = Joi.object({
    name: Joi.string().required().max(32),
    email: Joi.string().required().email(),
    subject: Joi.string().required().max(50),
    message: Joi.string().required()
});

export default class MailValidation extends GenericValidation {
    static createMail = (
        data: unknown
    ) => this.validate<MailInput>(data, createMailSchema);
}