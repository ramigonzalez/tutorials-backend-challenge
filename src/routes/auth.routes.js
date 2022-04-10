const AuthController = require('../controllers/auth.controller');

module.exports = (app) => {
    const controller = new AuthController();
    const router = require('express').Router();

    router.post('/', controller.authenticate.bind(controller));

    app.use('/v1/api/auth', router);
};
