module.exports = class BaseError extends Error {
    constructor(name, httpStatusCode, isOperational, message, innerException = {}) {
        super(message);
        this.name = name;
        this.httpStatusCode = httpStatusCode;
        this.isOperational = isOperational;
        this.innerException = this.buildInnerException(innerException);
        this.stackTrace = this.buildStackTrace(this);
        Error.captureStackTrace(this);
        console.error('Message:', message, '\nStackTrace:', this.stackTrace);
    }

    buildInnerException(err) {
        return err.stack ? err.stack.split('\n', 2).join('') : '';
    }

    buildStackTrace(err) {
        return err.stack.split('\n', 2).join('');
    }

    static handleError(err) {
        if (err && err.isOperational) throw err;
    }
};
