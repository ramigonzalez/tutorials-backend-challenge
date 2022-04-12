const { MethodNotAllowedException } = require('../exceptions');
module.exports.allowedMethods = (req, res, next, allowedMethods = []) => {
    if (allowedMethods.length !== 0 && allowedMethods.findIndex((method) => method === req.method) === -1)
        next(new MethodNotAllowedException(`'${req.baseUrl}' url does not support '${req.method}' method`));
    else next();
};
