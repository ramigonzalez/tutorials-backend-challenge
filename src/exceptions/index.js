const BadRequestException = require('./api/bad-request-exception');
const ForbiddenException = require('./api/forbidden-exception');
const InternalServerException = require('./api/internal-server-error');
const MethodNotAllowedException = require('./api/method-not-allowed');
const NotFoundException = require('./api/not-found-exception');
const ServiceUnavailableException = require('./api/service-unavailable-exception');
const UnauthorizedException = require('./api/unauthorized-exception');
const ValidationException = require('./api/validation-exception');
const NotImplementedException = require('./api/not-implemented-exception');

const BaseError = require('./base-error');

module.exports = {
    BadRequestException,
    ForbiddenException,
    InternalServerException,
    MethodNotAllowedException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
    ValidationException,
    BaseError,
    NotImplementedException,
};
