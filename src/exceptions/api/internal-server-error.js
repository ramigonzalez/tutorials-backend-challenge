const BaseError = require('../base-error');
const { HttpCodes } = require('../http-codes');

module.exports = class InternalServerException extends BaseError {
    constructor(message = 'Internal server error', innerException) {
        const status = HttpCodes.INTERNAL_SERVER;
        super(status.name, status.statusCode, true, message, innerException);
    }
};
