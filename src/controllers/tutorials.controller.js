module.exports = class TutorialController {
    
    constructor() {
        console.log('TutorialController INITIALIZED')
    }

    async get(req, res, next) {
        try {
            res.status(200);
            res.json([]);
            next();
        } catch (error) {
            next(error);
        }
    }
}