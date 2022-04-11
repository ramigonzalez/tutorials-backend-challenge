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

    buildInnerException(inner) {
        const stackTrace = inner.stack ? inner.stack.split('\n', 2).join('') : '';
        const message = inner.message || '';
        return { name: inner.name, message, stackTrace };
    }

    buildStackTrace(err) {
        return err.stack.split('\n', 2).join('');
    }

    static isTrustedError(error) {
        return error && error.isOperational;
    }
};
