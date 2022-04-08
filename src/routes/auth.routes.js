const AuthController = require('../controllers/auth.controller');

module.exports = app => {
    
    const authController = new AuthController();
    const router = require('express').Router();

    router.post('/', authController.authenticate.bind(authController));

    app.use('/v1/api/auth', router);
}