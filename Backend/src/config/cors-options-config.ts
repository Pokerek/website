import { CorsOptions } from 'cors';
import AuthorizationError from '../errors/authorization-error';

const createWhiteList = () => {
    const URLString = process.env.FRONTEND_URL;
    if (!URLString) {
        throw new Error('FRONTEND_URL environment variable is not set');
    }

    const urls = URLString.split(';');

    return urls;
}
const whiteList = createWhiteList();

export const corsProtectedOptions: CorsOptions = {
    origin: function (origin: any, callback: any) {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new AuthorizationError('Not allowed by CORS'));
        }
    },
    credentials: true,
}

export const corsOptions: CorsOptions = {
    origin: '*',
}


