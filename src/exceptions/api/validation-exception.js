const BadRequestException = require('./bad-request-exception');

module.exports = class ValidationException extends BadRequestException {
    constructor(message = 'Validation error', innerException) {
        super(message, innerException);
    }
};
