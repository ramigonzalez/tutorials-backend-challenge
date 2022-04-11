const { ForbiddenException } = require('../exceptions');

const allowAdminOnly = (req, res, next) => {
    const { role } = res.userInfo;
    if (role !== 'ADMIN') {
        next(new ForbiddenException('User has insufficient permission to proceed'));
    }
    next();
};

const tutorialTokenExpiration = (req, res, next) => {
    const { timestamp } = res.tutorialToken;
    const timeDiff = Date.now() - timestamp;
    const fiveMinutes = 60 * 5 * 1000;
    if (timeDiff > fiveMinutes) {
        res.status(403);
        next(new ForbiddenException('Token has passed 5 minutes duration'));
    }
    next();
};

module.exports = {
    allowAdminOnly,
    tutorialTokenExpiration,
};
