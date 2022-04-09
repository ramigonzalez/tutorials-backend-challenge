const Repository = require("../repositories")
const location = 'UserService';

module.exports = class UserService {

    async login({ email, password }) {
        //extract logic inside authService
    }

    async getLoggedUser(email) {
        try {
            /** CHECK EMAIL REGEX  */
            if (!email) throw new Error('Invalid email requested'); //BadRequestException
            const user = await Repository.User.findOne({ email });
            if (!user) throw new Error(`User with email: ${email} not found`); //NotFoundException
            return user.get();
        } catch (err) {
            console.error(location, this.getLoggedUser.name(), err.message);
        }
    }
}