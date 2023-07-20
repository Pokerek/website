import GenericRoute from "./generic-route";
import ExperiencesController from "../controllers/experiences-controller";
import authorizationMiddleware from "../middleware/authorization-middleware";

const PATH = '/experiences'

export const EXPERIENCES_ROUTES = {
    GET_EXPERIENCES: {
        path: PATH,
        method: 'GET',
        protected: false,
    },
    GET_EXPERIENCE: {
        path: `${PATH}/:id`,
        method: 'GET',
        protected: true,
    },
    CREATE_EXPERIENCE: {
        path: PATH,
        method: 'POST',
        protected: true
    },
    UPDATE_EXPERIENCE: {
        path: `${PATH}/:id`,
        method: 'PATCH',
        protected: true
    },
    DELETE_EXPERIENCE: {
        path: `${PATH}/:id`,
        method: 'DELETE',
        protected: true
    }
}

export default class ExperiencesRoute extends GenericRoute {
    private experiencesController = new ExperiencesController();

    constructor() {
        super(PATH);

        this.router.get(
            EXPERIENCES_ROUTES.GET_EXPERIENCES.path,
            this.experiencesController.getExperiences
        );

        this.router.get(
            EXPERIENCES_ROUTES.GET_EXPERIENCE.path,
            authorizationMiddleware,
            this.experiencesController.getExperience
        );

        this.router.post(
            EXPERIENCES_ROUTES.CREATE_EXPERIENCE.path,
            authorizationMiddleware,
            this.experiencesController.createExperience
        );

        this.router.patch(
            EXPERIENCES_ROUTES.UPDATE_EXPERIENCE.path,
            authorizationMiddleware,
            this.experiencesController.updateExperience
        );

        this.router.delete(
            EXPERIENCES_ROUTES.DELETE_EXPERIENCE.path,
            authorizationMiddleware,
            this.experiencesController.deleteExperience
        );
    }
}