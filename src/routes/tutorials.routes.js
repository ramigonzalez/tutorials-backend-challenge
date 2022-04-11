const TutorialsController = require('../controllers/tutorials.controller.js');
const {
    allowAdminOnly,
    tutorialTokenExpiration,
    verifyUserToken,
    verifyTutorialToken,
} = require('../middlewares');

const { allowedMethods } = require('../middlewares/method-not-allowed');
const httpMethods = require('./http-methods');

module.exports = (app) => {
    const controller = new TutorialsController();
    const router = require('express').Router();

    router
        .post(
            path.TUTORIALS,
            verifyUserToken,
            allowAdminOnly,
            verifyTutorialToken,
            tutorialTokenExpiration,
            controller.create.bind(controller)
        )
        .get(path.TUTORIALS, verifyUserToken, controller.getAllTutorials.bind(controller))
        .use(path.TUTORIALS, (req, _, next) =>
            allowedMethods(req, _, next, [httpMethods.POST, httpMethods.GET])
        );

    router
        .get(
            path.TUTORIAL_TOKEN,
            verifyUserToken,
            allowAdminOnly,
            controller.getTutorialCreationToken.bind(controller)
        )
        .use(path.TUTORIAL_TOKEN, (req, _, next) => allowedMethods(req, _, next, [httpMethods.GET]));

    router
        .get(path.SINGLE_TUTORIAL, verifyUserToken, controller.getTutorial.bind(controller))
        .put(path.SINGLE_TUTORIAL, verifyUserToken, allowAdminOnly, controller.update.bind(controller))
        .delete(path.SINGLE_TUTORIAL, verifyUserToken, allowAdminOnly, controller.delete.bind(controller))
        .use(path.SINGLE_TUTORIAL, (req, _, next) =>
            allowedMethods(req, _, next, [httpMethods.GET, httpMethods.PUT, httpMethods.DELETE])
        );

    router
        .delete(path.MASS_DELETE, verifyUserToken, allowAdminOnly, controller.bulkDelete.bind(controller))
        .use(path.MASS_DELETE, (req, _, next) => allowedMethods(req, _, next, [httpMethods.DELETE]));

    app.use('/v1/api/tutorials', router);
};

const path = {
    TUTORIALS: '/',
    TUTORIAL_TOKEN: '/token',
    SINGLE_TUTORIAL: '/:id([\\d]+)',
    MASS_DELETE: '/mass_delete',
};
