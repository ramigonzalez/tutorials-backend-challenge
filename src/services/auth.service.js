const Repository = require('../repositories');
const jwt = require('jsonwebtoken');
const { getPrivateKey, getRandomNumber, userSignOptions } = require('../utils/jwttoken');
const hash = require('../utils/hash');

module.exports = class AuthService {
   
    async authenticate(credentials) {
        try {
            credentials.password = hash(credentials.password);
            const ret = await Repository.User.findOne({ where: credentials });
            if (!ret) throw new Error('The credentials provided does not belong to any user.');
            const user = ret.get();
            check(user);
            return sessionToken(user);
        } catch (error) {
            console.error(error.message)
            throw new Error(error.message);
        }
    }
}

const check = (user) => {
    if (!user) throw new Error('User does not exists') 
};

const sessionToken = (user) => {
    const privateKey = getPrivateKey();

    const { email, role } = user;
    const payload = { 
        email,
        role, 
        randomness: getRandomNumber()
    };
    return jwt.sign(payload, privateKey, userSignOptions());
}






