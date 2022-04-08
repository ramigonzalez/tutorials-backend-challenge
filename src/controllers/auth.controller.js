const AuthService = require('../services/auth.service');

module.exports = class AuthController {
    
    constructor() {
        this.authservice = new AuthService();
    }

    async authenticate(req, res, next) {
        try {
            const credentials = this.sanitize(req.body);
            const token = await this.authservice.authenticate(credentials);
            res.status(200);
            res.body = { token };
            next();
        } catch (error) {
            next(error);
        }
    } 

    validate(requestBody) {
        if (!requestBody) throw Error('Request body cannot be null or empty');
        const { email, password } = requestBody;
        if (!email || typeof(email) != 'string' || email.trim() === '') throw Error("'email' param is invalid");
        if (!password || typeof(email) != 'string' || password.trim() === '') throw Error("'password' param is invalid");
    }

    sanitize({ email, password }) {
        return { 
            email: email.trim(),
            password: password.trim()
        }
    }
}