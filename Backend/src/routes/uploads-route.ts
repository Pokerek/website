import GenericRoute from "./generic-route";

import UploadController from '../controllers/uploads-controller';

import authorizationMiddleware from '../middleware/authorization-middleware';
import uploadsMiddleware from "../middleware/uploads-middleware";

export default class uploadsRoute extends GenericRoute {
    private uploadsController = new UploadController();

    constructor() {
        super("/uploads");

        this.router.get(
            `${this.path}/cv`,
            this.uploadsController.getCv
        );

        this.router.post(
            `${this.path}/cv`,
            authorizationMiddleware,
            uploadsMiddleware.single('cv'),
            this.uploadsController.uploadCv
        );

        this.router.get(
            `${this.path}/images/:name`,
            this.uploadsController.getImage
        );

        this.router.post(
            `${this.path}/images`,
            authorizationMiddleware,
            uploadsMiddleware.single('image'),
            this.uploadsController.uploadImage
        );
    }
}