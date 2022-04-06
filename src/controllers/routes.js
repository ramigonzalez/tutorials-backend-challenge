
module.exports = app => {
    
    const TutorialController = require('./tutorials.controller');
    const tutorialsController = new TutorialController();
    const router = require('express').Router();

    router.get('/', tutorialsController.get);

    app.use('/api/tutorials', router);
}