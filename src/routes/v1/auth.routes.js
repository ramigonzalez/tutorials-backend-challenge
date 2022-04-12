const AuthController = require('../../controllers/auth-controller');
const { allowedMethods, validateErrors, rules } = require('../../middlewares');
const httpMethods = require('../http-methods');

module.exports = (app) => {
    const authController = new AuthController();

    const router = require('express').Router();
    router
        .post('/', rules.auth.authentication(), validateErrors, authController.authenticate.bind(authController))
        .use('/', (req, res, next) => allowedMethods(req, res, next, [httpMethods.POST]));

    app.use('/api/v1/auth', router);
};
