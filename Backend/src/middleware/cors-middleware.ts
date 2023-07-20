import {
    Request,
    Response,
    NextFunction
} from 'express';
import cors from 'cors';
import { corsOptions, corsProtectedOptions } from '../config/cors-options-config';

import { PROJECTS_ROUTES } from '../routes/projects-route';
import { EXPERIENCES_ROUTES } from '../routes/experiences-route';
import { SKILLS_ROUTES } from '../routes/skills-route';
import { AUTHENTICATION_ROUTES } from '../routes/authentication-route';
import { UPLOADS_ROUTES } from '../routes/uploads-route';

const protectedRoutes = [
    ...Object.values(PROJECTS_ROUTES),
    ...Object.values(EXPERIENCES_ROUTES),
    ...Object.values(SKILLS_ROUTES),
    ...Object.values(AUTHENTICATION_ROUTES),
    ...Object.values(UPLOADS_ROUTES)
].filter(route => route.protected);

export default function corsMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const isProtectedRoute = protectedRoutes.some(route => {
        return (route.method === req.method || req.method === 'OPTIONS') && route.path === req.path;
    });

    if (!isProtectedRoute) {
        return cors(corsOptions)(req, res, next);
    }

    cors(corsProtectedOptions)(req, res, next);
}