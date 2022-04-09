const { parse } = require("dotenv");
const TutorialService = require("../services/tutorials.service");

module.exports = class TutorialsController {

    constructor() {
        this.tutorialService = new TutorialService();
    }

    async getAllTutorials(req, res, next) {
        try {
            const options = this.prepareParams(req);
            const user = res.userInfo;
            const tutorials = await this.tutorialService.findAll(options, user);
            res.status(200);
            res.body = { tutorials };
            next();
        } catch (error) {
            next(error);
        }
    }

    prepareParams(req) {
        const options = { 
            filters: {},
            sorting: {},
            pagination: {}
        };

        console.log('req.query', req.query);

        const { title, description, id, orderBy, limit, offset } = req.query;
        
        options.filters.title = (title ? title : null);
        options.filters.description = (description ? description : null);
        
        options.sorting.id = (id ? id : null);
        options.sorting.orderBy = (orderBy === 'DESC' ? orderBy : 'ASC');

        options.pagination.limit = (limit && !isNaN(limit) ? parseInt(limit) : 10);
        options.pagination.offset = (offset && !isNaN(limit) ? parseInt(offset) : 0);

        return options;
    }

    async getTutorial(req, res, next) {
        throw new Error('Not Implemented');
    }

    async getTutorial(req, res, next) {
        throw new Error('Not Implemented');
    }

    async getTutorialCreationToken(req, res, next) {
        throw new Error('Not Implemented');
    }

    async create(req, res, next) {
        throw new Error('Not Implemented');
    }
    
    async update(req, res, next) {
        throw new Error('Not Implemented');
    }

    async delete(req, res, next) {
        throw new Error('Not Implemented');
    }

    async bulkDelete(req, res, next) {
        throw new Error('Not Implemented');
    }
}