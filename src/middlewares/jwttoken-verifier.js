const jwt = require('jsonwebtoken');
const { UnauthorizedException } = require('../exceptions');

const { getPublicKey, userSignOptions, tutorialTokenSignOptions } = require('../utils/jwttoken');

const verifyUserToken = async (req, res, next) => {
    console.info('Validating authorization user token');
    await verifyToken(req, res, next, true);
};

const verifyTutorialToken = async (req, res, next) => {
    console.info('Validating authorization tutorial token');
    await verifyToken(req, res, next, false);
};

const verifyToken = async (req, res, next, isUser) => {
    const token = getToken(req, isUser);
    if (!token) {
        const message = isUser ? 'Session token not found' : 'Tutorial creation token not found';
        console.error(message);
        res.status(401);
        next(new UnauthorizedException(message));
    }

    const signOptions = isUser ? userSignOptions() : tutorialTokenSignOptions();
    const publicKey = await getPublicKey();
    jwt.verify(token, publicKey, { algorithms: [signOptions.algorithm] }, (err, decoded) => {
        const tokenName = isUser ? 'Invalid user token verification' : 'Invalid tutorial creation token verification';
        if (err) next(new UnauthorizedException(tokenName, err));
        if (isUser) res.userInfo = decoded;
        else res.tutorialToken = decoded;
        console.info('Token verified successfully!');
        next();
    });
};

const getToken = (req, isUser) => {
    if (isUser) return getUserToken(req);
    else return getTutorialToken(req);
};

const getUserToken = (req) => {
    const header = req.header('Authorization');
    if (header) {
        const authSplitted = header.split(' ');
        if (authSplitted[0] === 'Bearer') {
            return authSplitted[1];
        }
    }
    return null;
};

const getTutorialToken = (req) => req.header('authentication-token');

module.exports = {
    verifyUserToken,
    verifyTutorialToken,
};
