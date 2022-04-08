const Repository = require('../repositories');
const jwt = require('jsonwebtoken');
const {
    getPrivateKey,
    getRandomNumber,
    signOptions
} = require('../utils/jwttoken');


module.exports = class AuthService {
   
    async authenticate(credentials) {
        try {
            const ret = await Repository.User.findOne({ where: credentials });
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
    return jwt.sign(payload, privateKey, signOptions());
}






