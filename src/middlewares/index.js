const notFound = require('./notfound.handler');
const errorHandler = require('./error.handler');
const okHandler = require('./ok.handler');

const { verifyUserToken } = require('./jwttoken.handler');
const allowAdminOnly = require('./authorization.handler');

module.exports = {
    notFound,
    errorHandler,
    okHandler,
    verifyUserToken,
    allowAdminOnly,
}