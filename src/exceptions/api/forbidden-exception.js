const BaseError = require('../base-error');
const { HttpCodes } = require('../http-codes');

module.exports = class ForbiddenException extends BaseError {
    constructor(message = 'Forbidden request', innerException) {
        const status = HttpCodes.FORBIDDEN;
        super(status.name, status.statusCode, true, message, innerException);
    }
};
