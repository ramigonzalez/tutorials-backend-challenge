const authRoutes = require('./auth.routes');
const tutorialRoutes = require('./tutorials.routes');

module.exports = (app) => {
    authRoutes(app);
    tutorialRoutes(app);
};
