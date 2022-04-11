const { NotFoundException } = require('../exceptions');

module.exports = (req, res, next) => {
    if (typeof req.route === 'undefined') {
        next(new NotFoundException(`Resource: ${req.url} not found`));
    }
    next();
};
