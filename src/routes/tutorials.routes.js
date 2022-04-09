const TutorialsController = require('../controllers/tutorials.controller.js');
const { allowAdminOnly, verifyUserToken } = require('../middlewares');

module.exports = app => {
    
    const controller = new TutorialsController();
    const router = require('express').Router();

    router.get('/', 
        verifyUserToken, 
        controller.getAllTutorials.bind(controller));
    
    router.get('/:id', 
        verifyUserToken, 
        controller.getTutorial.bind(controller));
    
    router.get('/token', 
        verifyUserToken, 
        allowAdminOnly, 
        controller.getTutorialCreationToken.bind(controller));
    
    router.post('/', 
        verifyUserToken, 
        allowAdminOnly, 
        controller.create.bind(controller));
    
    router.put('/:id',
        verifyUserToken, 
        allowAdminOnly, 
        controller.update.bind(controller));
    
    router.delete('/:id', 
        verifyUserToken, 
        allowAdminOnly,
        controller.delete.bind(controller));
    
    router.delete('/mass_delete', 
        verifyUserToken, 
        allowAdminOnly, 
        controller.bulkDelete.bind(controller));

    app.use('/v1/api/tutorials', router);
}