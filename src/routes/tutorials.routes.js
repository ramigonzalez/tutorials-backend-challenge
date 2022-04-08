const TutorialsController = require('../controllers/tutorials.controller.js');
const { allowAdminOnly, verifyUserToken } = require('../middlewares');

module.exports = app => {
    
    const tutorialsController = new TutorialsController();
    const router = require('express').Router();

    router.get('/', verifyUserToken, allowAdminOnly, tutorialsController.getTutorials.bind(tutorialsController));

    app.use('/v1/api/tutorials', router);
}