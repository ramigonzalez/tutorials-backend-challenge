const Repository = require('../repositories');
const Op = require('Sequelize').Op;

const jwt = require('jsonwebtoken');
const {
    getPrivateKey,
    getRandomNumber,
    tutorialTokenSignOptions,
} = require('../utils/jwttoken');

module.exports = class TutorialService {
    constructor(repository = Repository) {
        this.repository = repository;
    }

    async findAll(reqOptions) {
        try {
            const queryOptions = this.buildQueryOptions(reqOptions);
            return await this.repository.Tutorial.findAll(queryOptions);
        } catch (err) {
            console.error(
                `[TutorialService.findAll] Error while retrieving tutorials ${err.message}`
            );
            throw err;
            // throw new BadRequestException("", err);
        }
    }

    buildQueryOptions({ filters, sorting, pagination }) {
        const reqOptions = {};

        // Add not null conditions.
        if (filters) reqOptions.filters = filters;
        if (sorting) reqOptions.sorting = sorting;
        if (pagination) reqOptions.pagination = pagination;

        console.log('reqOptions', reqOptions);

        let queryOptions = {};

        queryOptions = this.prepareWhereCondition(queryOptions, reqOptions);
        queryOptions = this.prepareOrderByCondition(queryOptions, reqOptions);
        queryOptions = this.preparePagination(queryOptions, reqOptions);
        queryOptions = this.prepareIncludeCondition(queryOptions);
        queryOptions.attributes = { exclude: ['deletedAt'] };

        return queryOptions;
    }

    prepareIncludeCondition(opt = {}) {
        opt.include = [
            {
                model: Repository.User,
                attributes: ['id', 'first_name', 'last_name', 'email', 'role'],
            },
        ];
        return opt;
    }

    prepareWhereCondition(opt = {}, { filters }) {
        let condition;
        if (filters) {
            const conditionArray = [];

            if (filters.title)
                conditionArray.push({ title: { [Op.like]: `%${filters.title}%` } });
            if (filters.description)
                conditionArray.push({
                    description: { [Op.like]: `%${filters.description}%` },
                });

            if (conditionArray.length !== 0) {
                if (!filters.condition || filters.condition === 'OR') {
                    condition = { [Op.or]: conditionArray };
                } else if (filters.condition === 'AND') {
                    condition = { [Op.and]: conditionArray };
                }
            }
        }
        if (condition) opt.where = condition;
        return opt;
    }

    prepareOrderByCondition(opt = {}, { sorting }) {
        const order = [];
        if (sorting) {
            order.push(Object.entries(sorting).map(([_, value]) => value));
            opt.order = order;
        }
        return opt;
    }

    preparePagination(opt = {}, { pagination }) {
        if (pagination) {
            opt.limit = pagination.limit;
            opt.offset = pagination.offset;
        }
        return opt;
    }

    async find(id) {
        try {
            const ret = await Repository.Tutorial.findByPk(
                id,
                this.prepareIncludeCondition()
            );
            if (!ret) throw new Error(`Tutorial with id: ${id} not found`); //NotFoundException
            return ret.get();
        } catch (err) {
            console.error(
                `[TutorialService.find] Error while retrieving tutorial with id: ${id}`,
                err.message
            );
            throw err;
            // throw new BadRequestException("", err);
        }
    }

    getTutorialCreationToken(timestamp) {
        const privateKey = getPrivateKey();
        const createdAt = new Date(timestamp).toISOString();
        const payload = {
            timestamp,
            createdAt,
            randomness: getRandomNumber(),
        };
        return jwt.sign(payload, privateKey, tutorialTokenSignOptions());
    }

    async create(tutorial, userId) {
        const ret = await Repository.Tutorial.create({
            ...tutorial,
            userId,
            video_url: tutorial.videoUrl,
            published_status: 'PENDING',
        });
        return ret.get();
    }

    async update(tutorial, id) {
        const ret = await Repository.Tutorial.update(tutorial, { where: { id } });
        return ret.get();
    }

    async delete(id) {
        try {
            const count = await Repository.Tutorial.destroy({ where: { id } });
            if (count === 1) return `Tutorial with id: ${id} was deleted successfully`;
            else return `No deletion occurred`;
        } catch (error) {
            throw new Error(`Could not delete tutorial with id: ${id}`, error.message);
        }
    }

    async deleteAllByUser(userId) {
        try {
            const count = await Repository.Tutorial.destroy({
                where: { userId },
                truncate: false,
            });
            if (count === 1) return `Tutorial with id: ${id} was deleted successfully`;
            else return `No deletion occurred`;
        } catch (error) {
            throw new Error(
                `Could not delete tutorials of logged user: ${userId}`,
                error.message
            );
        }
    }
};
