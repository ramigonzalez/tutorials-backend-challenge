const BaseError = require('../base-error');
const { HttpCodes } = require('../http-codes');

module.exports = class BadRequestException extends BaseError {
    constructor(message = 'Bad request', innerException = {}) {
        const status = HttpCodes.BAD_REQUEST;
        super(status.name, status.statusCode, true, message, innerException);
    }
};
