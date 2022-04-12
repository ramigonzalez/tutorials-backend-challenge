const Repository = require('../repositories');
const jwt = require('jsonwebtoken');
const { getPrivateKey, getRandomNumber, userSignOptions } = require('../utils/jwttoken');
const UserService = require('./user-service');
const { NotFoundException, BaseError } = require('../exceptions');

module.exports = class AuthService {
    constructor(repository = Repository) {
        this.repository = repository;
        this.userService = new UserService(repository);
    }

    async authenticate(credentials) {
        try {
            const user = await this.userService.login(credentials);
            if (!user) throw new NotFoundException('Requested user does not exists');
            return await sessionToken(user);
        } catch (error) {
            if (BaseError.isTrustedError(error)) throw error;
            throw new InternalServerException('Somethig went wrong authenticating user', error);
        }
    }
};

const sessionToken = async (user) => {
    try {
        const privateKey = await getPrivateKey();

        const { email, role } = user;
        const payload = {
            email,
            role,
            randomness: getRandomNumber(),
        };
        return jwt.sign(payload, privateKey, userSignOptions());
    } catch (error) {
        if (BaseError.isTrustedError(error)) throw error;
        throw new InternalServerException('Somethig went while creating session token', error);
    }
};
