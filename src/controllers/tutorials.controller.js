const TutorialService = require('../services/tutorials.service');
const UserService = require('../services/user.service');
const Repository = require('../repositories');

const { validateUrl } = require('../utils/regex');

module.exports = class TutorialsController {
    constructor() {
        this.tutorialService = new TutorialService(Repository);
        this.userService = new UserService();
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
        options.sorting.orderBy = orderBy === 'DESC' ? orderBy : 'ASC';

        options.pagination.limit = limit && !isNaN(limit) ? parseInt(limit) : 10;
        options.pagination.offset = offset && !isNaN(limit) ? parseInt(offset) : 0;

        return options;
    }

    async getTutorial(req, res, next) {
        try {
            const id = req.params.id;
            const tutorial = await this.tutorialService.find(id);
            res.status(200);
            res.body = { tutorial };
            next();
        } catch (error) {
            next(error);
        }
    }

    getTutorialCreationToken(req, res, next) {
        try {
            const requestedTimestamp = Date.now();
            const token =
                this.tutorialService.getTutorialCreationToken(requestedTimestamp);
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
            this.validateTutorialCreate(req.body);
            const tutorialRequested = this.sanitize(req.body);
            const tutorial = await this.tutorialService.create(tutorialRequested, id);
            res.status(201);
            res.body = { tutorial };
            next();
        } catch (error) {
            next(error);
        }
    }

    validateTutorialUpdate(tutorial) {
        if (!tutorial) throw Error('Request body cannot be null or empty');

        const { title, videoUrl, description, publishedStatus } = tutorial;

        if (title && (typeof title != 'string' || title.trim() === ''))
            throw Error("'title' param is invalid");

        if (
            videoUrl &&
            (typeof videoUrl != 'string' ||
                videoUrl.trim() === '' ||
                !validateUrl(videoUrl))
        )
            throw Error("'videoUrl' param is invalid");

        if (description && (typeof description != 'string' || description.trim() === ''))
            throw Error("'description' param is invalid");

        if (
            publishedStatus &&
            (typeof publishedStatus != 'string' ||
                publishedStatus.trim() === '' ||
                ['PENDING', 'IN PROGRESS', 'PUBLISHED'].findIndex(publishedStatus) === -1)
        )
            throw Error("'publishedStatus' param is invalid");
    }

    validateTutorialCreate(tutorial) {
        if (!tutorial) throw Error('Request body cannot be null or empty');

        const { title, videoUrl, description } = tutorial;

        if (!title || typeof title != 'string' || title.trim() === '')
            throw Error("'title' param is invalid");
        if (
            !videoUrl ||
            typeof videoUrl != 'string' ||
            videoUrl.trim() === '' ||
            !validateUrl(videoUrl)
        )
            throw Error("'videoUrl' param is invalid");
        if (!description || typeof description != 'string' || description.trim() === '')
            throw Error("'description' param is invalid");
    }

    sanitize({ title, videoUrl, description }) {
        return {
            title: title.trim(),
            videoUrl: videoUrl.trim(),
            description: description.trim(),
        };
    }

    async update(req, res, next) {
        try {
            const user = res.userInfo;
            this.validateTutorialUpdate(req.body);
            const tutorialRequested = this.sanitize(req.body);
            const tutorial = await this.tutorialService.update(tutorialRequested, user);
            res.status(200);
            res.body = { tutorial };
            next();
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        const id = req.params.id;
        try {
            const message = await this.tutorialService.delete(id);
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
