const { isDevelopmentOrTesting } = require('../../config/environment');

module.exports = (err, req, res, next) => {
    const statusCode = err.httpStatusCode;
    const response = {
        statusCode,
        exception: {
            message: err.message,
            exceptionName: err.name,
        },
    };

    if (isDevelopmentOrTesting() && err.stackTrace) {
        response.exception = { ...response.exception, stackTrace: err.stackTrace };
    }

    if (err.innerException) {
        const innerException = isDevelopmentOrTesting()
            ? err.innerException
            : { name: err.innerException.name, message: err.innerException.message };
        response.exception = { ...response.exception, innerException };
    }

    res.status(statusCode).json(response);
};
