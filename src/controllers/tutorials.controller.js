const Repository = require('../repositories');

module.exports = class TutorialsController {

    async getTutorials(req, res, next) {
        try {
            const users = await Repository.User.findAll();
            res.status(200);
            res.body = { users };
            console.log(users);
            next();
        } catch (error) {
            next(error);
        }
    }
}