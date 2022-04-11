const BaseError = require('../exceptions/base-error');
const { isDevelopmentOrTesting } = require('../../config/environment');
module.exports = (err, _, res, _) => {
    if (isTrustedError(err)) {
        const statusCode = err.httpStatusCode;
        const response = {
            statusCode,
            error: {
                message: err.message,
                exceptionName: err.name,
            },
        };

        if (isDevelopmentOrTesting()) {
            if (err.innerException) response.innerException = err.innerException;
            if (err.stackTrace) response.stackTrace = err.stackTrace;
        }

        res.status(statusCode).json(response);
    } else {
        res.status(500).json({ err });
    }
};

const isTrustedError = (err) => err instanceof BaseError;
