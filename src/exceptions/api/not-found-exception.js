const BaseError = require('../base-error');
const { HttpCodes } = require('../http-codes');

module.exports = class NotFoundException extends BaseError {
    constructor(message = 'Resource not found', innerException) {
        const status = HttpCodes.NOT_FOUND;
        super(status.name, status.statusCode, true, message, innerException);
    }
};
