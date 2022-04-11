const notFound = require('./notfound.handler');
const errorHandler = require('./error.handler');
const okHandler = require('./ok.handler');

const { verifyUserToken, verifyTutorialToken } = require('./jwttoken.handler');
const { allowAdminOnly, tutorialTokenExpiration } = require('./authorization.handler');

const { allowedMethods } = require('./method-not-allowed');

module.exports = {
    notFound,
    errorHandler,
    okHandler,
    verifyUserToken,
    verifyTutorialToken,
    allowAdminOnly,
    tutorialTokenExpiration,
    allowedMethods,
};
