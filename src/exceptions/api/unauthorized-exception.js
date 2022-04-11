const BaseError = require('../base-error');
const { HttpCodes } = require('../http-codes');

module.exports = class UnauthorizedException extends BaseError {
    constructor(message = 'Unauthorized request', innerException) {
        const status = HttpCodes.UNAUTHORIZED;
        super(status.name, status.statusCode, true, message, innerException);
    }
};
