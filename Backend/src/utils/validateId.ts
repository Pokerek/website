import { isValidObjectId } from 'mongoose';
import ValidationError from '../errors/validation-error';

export default function validateId(id: string): string {
    if (isValidObjectId(id) === false) {
        throw new ValidationError(`Invalid id: ${id}`);
    }

    return id;
}