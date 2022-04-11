const BaseError = require('../base-error');
const { HttpCodes } = require('../http-codes');

module.exports = class MethodNotAllowedException extends BaseError {
    constructor(message = 'Internal server error', innerException) {
        const status = HttpCodes.METHOD_NOT_ALLOWED;
        super(status.name, status.statusCode, true, message, innerException);
    }
};
