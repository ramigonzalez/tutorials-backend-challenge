const TutorialsController = require('../../controllers/tutorials-controller');
const {
    allowAdminOnly,
    tutorialTokenExpiration,
    verifyUserToken,
    verifyTutorialToken,
    allowedMethods,
    validateErrors,
    rules,
} = require('../../middlewares');
const httpMethods = require('../http-methods');

module.exports = (app) => {
    const controller = new TutorialsController();
    const router = require('express').Router();

    router.use(path.TUTORIAL_TOKEN, (req, res, next) => allowedMethods(req, res, next, [httpMethods.GET]));
    router.get(
        path.TUTORIAL_TOKEN,
        verifyUserToken,
        allowAdminOnly,
        controller.getTutorialCreationToken.bind(controller)
    );

    router.use(path.SINGLE_TUTORIAL, (req, res, next) =>
        allowedMethods(req, res, next, [httpMethods.GET, httpMethods.PUT, httpMethods.DELETE])
    );
    router.get(path.SINGLE_TUTORIAL, verifyUserToken, controller.getTutorial.bind(controller));
    router.put(
        path.SINGLE_TUTORIAL,
        rules.tutorials.update(),
        validateErrors,
        verifyUserToken,
        allowAdminOnly,
        controller.update.bind(controller)
    );
    router.delete(path.SINGLE_TUTORIAL, verifyUserToken, allowAdminOnly, controller.delete.bind(controller));

    router.use(path.MASS_DELETE, (req, res, next) => allowedMethods(req, res, next, [httpMethods.DELETE]));
    router.delete(path.MASS_DELETE, verifyUserToken, allowAdminOnly, controller.bulkDelete.bind(controller));

    router.use(path.TUTORIALS, (req, res, next) => allowedMethods(req, res, next, [httpMethods.POST, httpMethods.GET]));
    router.post(
        path.TUTORIALS,
        verifyUserToken,
        allowAdminOnly,
        verifyTutorialToken,
        tutorialTokenExpiration,
        rules.tutorials.create(),
        validateErrors,
        controller.create.bind(controller)
    );
    router.get(
        path.TUTORIALS,
        verifyUserToken,
        rules.tutorials.getAll(),
        validateErrors,
        controller.getAllTutorials.bind(controller)
    );

    app.use('/api/v1', router);
};

const path = {
    TUTORIALS: /\/tutorials((\?\w+\=\w*)(&\w+\=\w*)*)*$/,

    TUTORIAL_TOKEN: '/tutorials/token',
    SINGLE_TUTORIAL: /\/tutorials\/\d+$/,
    MASS_DELETE: '/tutorials/mass_delete',
};
