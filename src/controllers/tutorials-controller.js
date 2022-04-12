const TutorialService = require('../services/tutorials-service');
const UserService = require('../services/user-service');
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
            const pagination = await this.getPagination(options.pagination);
            res.status(200);
            res.body = { tutorials };
            res.pagination = pagination;
            next();
        } catch (error) {
            next(error);
        }
    }

    async getPagination({ limit, offset }) {
        const total = await this.tutorialService.getTotalTutorials();
        let pages = 1;
        if (total === 0 || limit >= total) pages = 1;
        else {
            if (limit === 1) pages = total;
            else pages = Math.floor(total / limit) + 1;
        }
        return { total, pages, page: offset };
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

        if (orderBy) {
            options.sorting.id = 'id';
            if (['DESC', 'ASC'].findIndex((x) => x === orderBy) !== -1) {
                options.sorting.orderBy = orderBy;
            } else {
                options.sorting.orderBy = 'ASC';
            }
        }

        const lim = this.getPagination(limit, 10);
        options.pagination.limit = lim > 100 ? 100 : lim;
        options.pagination.offset = this.getPagination(offset, 0);

        return options;
    }

    getPagination(number, def) {
        let num;
        if (number && !isNaN(number)) {
            num = parseInt(number);
            if (num < 0) num = def;
        } else num = def;
        return num;
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

    async getTutorialCreationToken(req, res, next) {
        try {
            const requestedTimestamp = Date.now();
            const token = await this.tutorialService.getTutorialCreationToken(requestedTimestamp);
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
