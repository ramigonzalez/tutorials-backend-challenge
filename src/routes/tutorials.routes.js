const TutorialsController = require('../controllers/tutorials.controller.js');
const {
    allowAdminOnly,
    tutorialTokenExpiration,
    verifyUserToken,
    verifyTutorialToken,
} = require('../middlewares');

module.exports = (app) => {
    const controller = new TutorialsController();
    const router = require('express').Router();

    router.post(
        '/',
        verifyUserToken,
        allowAdminOnly,
        verifyTutorialToken,
        tutorialTokenExpiration,
        controller.create.bind(controller)
    );

    router.get(
        '/token',
        verifyUserToken,
        allowAdminOnly,
        controller.getTutorialCreationToken.bind(controller)
    );

    router.get(
        '/:id([\\d]+)',
        verifyUserToken,
        controller.getTutorial.bind(controller)
    );

    router.get(
        '/',
        verifyUserToken,
        controller.getAllTutorials.bind(controller)
    );

    router.put(
        '/:id',
        verifyUserToken,
        allowAdminOnly,
        controller.update.bind(controller)
    );

    router.delete(
        '/:id([\\d]+)',
        verifyUserToken,
        allowAdminOnly,
        controller.delete.bind(controller)
    );

    router.delete(
        '/mass_delete',
        verifyUserToken,
        allowAdminOnly,
        controller.bulkDelete.bind(controller)
    );
    app.use('/v1/api/tutorials', router);
};
