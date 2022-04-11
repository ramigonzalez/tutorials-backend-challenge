const jwt = require('jsonwebtoken');

const { getPublicKey, userSignOptions, tutorialTokenSignOptions } = require('../utils/jwttoken');

const verifyUserToken = (req, res, next) => {
    console.info('Validating authorization user token');
    verifyToken(req, res, next, true);
};

const verifyTutorialToken = (req, res, next) => {
    console.info('Validating authorization tutorial token');
    verifyToken(req, res, next, false);
};

const verifyToken = (req, res, next, isUser) => {
    const token = getToken(req, isUser);
    if (!token) {
        const message = isUser ? 'Session token not found' : 'Tutorial creation token not found';
        console.error(message);
        res.status(401);
        next(new UnauthorizedException(message));
    }

    const signOptions = isUser ? userSignOptions() : tutorialTokenSignOptions();

    jwt.verify(token, getPublicKey(), { algorithms: [signOptions.algorithm] }, (err, decoded) => {
        if (err) next(new UnauthorizedException('Invalid token verification', err));
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
