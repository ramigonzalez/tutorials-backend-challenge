const BaseError = require('../base-error');
const { HttpCodes } = require('../http-codes');

module.exports = class NotImplementedException extends BaseError {
    constructor(message = 'Not implemented method', innerException) {
        const status = HttpCodes.NOT_IMPLEMENTED;
        super(status.name, status.statusCode, true, message, innerException);
    }
};
