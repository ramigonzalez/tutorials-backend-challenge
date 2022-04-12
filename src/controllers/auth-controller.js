const AuthService = require('../services/auth-service');

module.exports = class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    async authenticate(req, res, next) {
        try {
            const credentials = this.sanitize(req.body);
            const token = await this.authService.authenticate(credentials);
            res.status(200);
            res.body = { token };
            next();
        } catch (error) {
            next(error);
        }
    }

    sanitize({ email, password }) {
        return {
            email: email.trim(),
            password: password.trim(),
        };
    }
};
