const { NotImplementedException } = require('../../exceptions');
const { V2_API_PATH } = require('../../utils/regex');

module.exports = (app) => {
    app.use(V2_API_PATH, notImplementedHandler);
};

const notImplementedHandler = (req, res, next) => {
    next(new NotImplementedException('v2.0.0 API is not implemented yet'));
};
