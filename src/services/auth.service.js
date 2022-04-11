const Repository = require('../repositories');
const jwt = require('jsonwebtoken');
const { getPrivateKey, getRandomNumber, userSignOptions } = require('../utils/jwttoken');
const UserService = require('./user.service');
const { NotFoundException } = require('../exceptions');

module.exports = class AuthService {
    constructor(repository = Repository) {
        this.repository = repository;
        this.userService = new UserService(repository);
    }

    async authenticate(credentials) {
        try {
            const user = await this.userService.login(credentials);
            return sessionToken(user);
        } catch (error) {
            if (error.isOperational) throw error;
            throw new NotFoundException('Could not authenticate requested user', error);
        }
    }
};

const sessionToken = (user) => {
    const privateKey = getPrivateKey();

    const { email, role } = user;
    const payload = {
        email,
        role,
        randomness: getRandomNumber(),
    };
    return jwt.sign(payload, privateKey, userSignOptions());
};
