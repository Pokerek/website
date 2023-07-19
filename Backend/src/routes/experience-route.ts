import GenericRoute from "./generic-route";
import ExperiencesController from "../controllers/experiences-controller";
import authorizationMiddleware from "../middleware/authorization-middleware";

export default class ExperiencesRoute extends GenericRoute {
    private experiencesController = new ExperiencesController();

    constructor() {
        super('/experiences');

        this.router.get(
            this.path,
            this.experiencesController.getExperiences
        );

        this.router.post(
            this.path,
            authorizationMiddleware,
            this.experiencesController.createExperience
        );

        this.router.patch(
            `${this.path}/:id`,
            authorizationMiddleware,
            this.experiencesController.updateExperience
        );

        this.router.delete(
            `${this.path}/:id`,
            authorizationMiddleware,
            this.experiencesController.deleteExperience
        );
    }
}