import {
    Request,
    Response,
    NextFunction
} from 'express';
import cors from 'cors';
import { corsOptions, corsProtectedOptions } from '../config/cors-options-config';

export default function corsMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    switch (req.method) {
        case 'POST':
        case 'PUT':
        case 'PATCH':
        case 'DELETE':
            cors(corsProtectedOptions)(req, res, next);
            break;
        default:
            cors(corsOptions)(req, res, next);
            break;
    }
}