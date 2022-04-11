const AuthController = require('../controllers/auth.controller');
const { allowedMethods } = require('../middlewares/method-not-allowed');
const httpMethods = require('./http-methods');

module.exports = (app) => {
    const controller = new AuthController();
    const router = require('express').Router();

    router
        .post('/', controller.authenticate.bind(controller))
        .use('/', (req, res, next) => allowedMethods(req, res, next, [httpMethods.POST]));

    app.use('/v1/api/auth', router);
};
