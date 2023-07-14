import Joi from 'joi';

import ValidationError from '../../errors/validation-error';

export default class GenericValidation {
    static validate<T>(data: unknown, schema: Joi.ObjectSchema<any>): T {
        const { error, value } = schema.validate(data, { abortEarly: false });

        if (error) {
            throw new ValidationError(error.message);
        }

        return value as T;
    };
}