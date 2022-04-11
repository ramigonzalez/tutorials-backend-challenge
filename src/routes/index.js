const routesV1 = require('./v1');
const routesV2 = require('./v2');

module.exports = (app) => {
    app.get('/', (req, res, next) => res.send());
    app.get('/healthcheck', (req, res) => res.status(200).json({ message: 'Server OK' }));
    routesV1(app);
    routesV2(app);
};
