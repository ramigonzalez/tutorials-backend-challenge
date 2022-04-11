const { NotFoundException } = require('../exceptions');

module.exports = (req, res, next) => {
    if (typeof req.route === 'undefined') {
        const url = req.url.indexOf('?') !== -1 ? req.url.split('?')[0] : req.url;
        next(new NotFoundException(`Resource: '${url}' not found`));
    }
    next();
};
