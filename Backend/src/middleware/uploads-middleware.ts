import multer from 'multer';

import { multerOptions } from '../config/multer-options-config';

const uploadsMiddleware = multer(multerOptions);
export default uploadsMiddleware;