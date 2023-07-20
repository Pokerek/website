import GenericRoute from "./generic-route";

import UploadController from '../controllers/uploads-controller';

import authorizationMiddleware from '../middleware/authorization-middleware';
import uploadsMiddleware from "../middleware/uploads-middleware";

const PATH = '/uploads';

export const UPLOADS_ROUTES = {
    GET_CV: {
        path: `${PATH}/cv`,
        method: 'GET',
        protected: false,
    },
    GET_IMAGE: {
        path: `${PATH}/images/:name`,
        method: 'GET',
        protected: false,
    },
    UPLOAD_CV: {
        path: `${PATH}/cv`,
        method: 'POST',
        protected: true
    },
    UPLOAD_IMAGE: {
        path: `${PATH}/images`,
        method: 'POST',
        protected: true
    }
}

export default class uploadsRoute extends GenericRoute {
    private uploadsController = new UploadController();

    constructor() {
        super(PATH);

        this.router.get(
            UPLOADS_ROUTES.GET_CV.path,
            this.uploadsController.getCv
        );

        this.router.get(
            UPLOADS_ROUTES.GET_IMAGE.path,
            this.uploadsController.getImage
        );

        this.router.post(
            UPLOADS_ROUTES.UPLOAD_CV.path,
            authorizationMiddleware,
            uploadsMiddleware.single('cv'),
            this.uploadsController.uploadCv
        );

        this.router.post(
            UPLOADS_ROUTES.UPLOAD_IMAGE.path,
            authorizationMiddleware,
            uploadsMiddleware.single('image'),
            this.uploadsController.uploadImage
        );
    }
}