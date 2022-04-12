const TutorialService = require('../services/tutorials.service');
const UserService = require('../services/user.service');
const Repository = require('../repositories');

module.exports = class TutorialsController {
    constructor() {
        this.tutorialService = new TutorialService(Repository);
        this.userService = new UserService(Repository);
    }

    async getAllTutorials(req, res, next) {
        try {
            const options = this.prepareParams(req);
            const tutorials = await this.tutorialService.findAll(options);
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
            pagination: {},
        };

        console.log('req.query', req.query);

        const { title, description, condition, id, orderBy, limit, offset } = req.query;

        options.filters.title = title ? title : null;
        options.filters.description = description ? description : null;
        options.filters.condition = condition ? condition : null;

        options.sorting.id = id ? id : null;
        options.sorting.orderBy = !orderBy ? null : (orderBy === 'DESC' ? orderBy : 'ASC');

        options.pagination.limit = limit && !isNaN(limit) ? parseInt(limit) : 10;
        options.pagination.offset = offset && !isNaN(limit) ? parseInt(offset) : 0;

        return options;
    }

    async getTutorial(req, res, next) {
        try {
            const id = this.getParam(req);
            const tutorial = await this.tutorialService.find(id);
            res.status(200);
            res.body = { tutorial };
            next();
        } catch (error) {
            next(error);
        }
    }

    getParam(req) {
        return req.url.split('/')[2];
    }

    getTutorialCreationToken(req, res, next) {
        try {
            const requestedTimestamp = Date.now();
            const token = this.tutorialService.getTutorialCreationToken(requestedTimestamp);
            res.status(200);
            res.body = { token };
            next();
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const { email } = res.userInfo;
            const { id } = await this.userService.getLoggedUser(email);
            const tutorialRequested = this.sanitize(req.body);
            const tutorial = await this.tutorialService.create(tutorialRequested, id);
            res.status(201);
            res.body = { tutorial };
            next();
        } catch (error) {
            next(error);
        }
    }

    sanitize({ title, videoUrl, description, publishedStatus }) {
        return {
            title: title ? title.trim() : title,
            videoUrl: videoUrl ? videoUrl.trim() : videoUrl,
            description: description ? description.trim() : description,
            publishedStatus: publishedStatus || null,
        };
    }

    async update(req, res, next) {
        try {
            const tutorialId = this.getParam(req);
            const { email } = res.userInfo;
            const user = await this.userService.getLoggedUser(email);
            const tutorialRequested = this.sanitize(req.body);
            const tutorial = await this.tutorialService.update(tutorialRequested, tutorialId, user.id);
            res.status(200);
            res.body = { tutorial };
            next();
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const tutorialId = this.getParam(req);
            const { email } = res.userInfo;
            const { id } = await this.userService.getLoggedUser(email);
            const message = await this.tutorialService.delete(tutorialId, id);
            res.status(204);
            res.body = { message };
            next();
        } catch (error) {
            next(error);
        }
    }

    async bulkDelete(req, res, next) {
        try {
            const { email } = res.userInfo;
            const { id } = await this.userService.getLoggedUser(email);
            const message = await this.tutorialService.deleteAllByUser(id);
            res.status(204);
            res.body = { message };
            next();
        } catch (error) {
            next(error);
        }
    }
};
