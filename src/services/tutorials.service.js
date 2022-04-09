const Repository = require('../repositories');
const UserService = require('./user.service');

module.exports = class TutorialService {

    constructor() {
        this.userService = new UserService();
    }

    async findAll(reqOptions, { email }) {
        try {
            const user = await this.userService.getLoggedUser(email);
            const queryOptions = this.buildQueryOptions(reqOptions, user);
            return await Repository.Tutorial.findAll(queryOptions);
        } catch (err) {
            console.error(`[TutorialService.findAll] Error while retrieving tutorials ${err.message}`);
            throw err;
            // throw new BadRequestException("", err);
        }
    }

    buildQueryOptions({ filters, sorting, pagination }, { id }) {
        const reqOptions = {} ;

        // Add not null conditions.
        if (filters) reqOptions.filters = filters; 
        if (sorting) reqOptions.sorting = sorting; 
        if (pagination) reqOptions.pagination = pagination; 

        console.log('reqOptions', reqOptions);

        let queryOptions = {};

        queryOptions = this.prepareWhereCondition(queryOptions, reqOptions, id);
        queryOptions = this.prepareOrderByCondition(queryOptions, reqOptions);
        queryOptions = this.preparePagination(queryOptions, reqOptions);

        return queryOptions;
    }

    prepareWhereCondition(opt = {}, { filters }, userId) {
        if (filters) {
            opt.where = filters;
        }
        opt.where.userId = userId;
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
}
