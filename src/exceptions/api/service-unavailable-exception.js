const BaseError = require('../base-error');
const { HttpCodes } = require('../http-codes');
module.exports = class ServiceUnavailableException extends BaseError {
    constructor(message = 'Service unavailable', innerException = {}) {
        const status = HttpCodes.SERVICE_UNAVAILABLE;
        super(status.name, status.statusCode, true, message, innerException);
    }
};
