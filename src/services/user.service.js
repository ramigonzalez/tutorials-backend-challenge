const Repository = require('../repositories');
const hash = require('../utils/hash');
const { NotFoundException, BadRequestException } = require('../exceptions');

module.exports = class UserService {
    constructor(repository = Repository) {
        this.repository = repository;
    }

    async login(credentials) {
        credentials.password = hash(credentials.password);
        const ret = await this.repository.User.findOne({ where: credentials });
        if (!ret)
            throw new NotFoundException('Credentials provided does not correspond to any user');
        return ret.get();
    }

    async getLoggedUser(email) {
        if (!email) throw new BadRequestException('Invalid email requested');
        const user = await this.repository.User.findOne({ email });
        if (!user) throw new NotFoundException(`User email '${email}' was not found`);
        return user.get();
    }
};
