import jwt from 'jsonwebtoken';

import JWTVerificationFailedError from './errors/jwt-verification-failed-error';
import SecretNotExistsError from './errors/secret-not-exists';
import { JWTUserInfo } from '../types';

const TOKEN_VALIDITY_PERIOD = 600;

interface JWTSignResult {
    token: string;
    expiresAt: Date;
}

export default class JWTService {
    private static get secret(): string {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new SecretNotExistsError();
        }
        return secret;
    }

    static sign(data: string | object): JWTSignResult {
        const token = jwt.sign(data, this.secret, { expiresIn: TOKEN_VALIDITY_PERIOD });
        const expiresAt = new Date(Date.now() + TOKEN_VALIDITY_PERIOD * 1000)
        return { token, expiresAt }
    }

    static verify(token: string): JWTUserInfo {
        try {
            return jwt.verify(token, this.secret) as JWTUserInfo;
        } catch (error) {
            throw new JWTVerificationFailedError();
        }
    }
}