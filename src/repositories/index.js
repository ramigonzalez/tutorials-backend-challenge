const Sequelize = require('sequelize');
const { createDummyData } = require('./dummy.db');
const dbConfig = require('../../config/db.config.js');

module.exports = class Repository {
    static connect() {
        this.connection = new Sequelize(dbConfig.db_name, dbConfig.user, dbConfig.password, {
            host: dbConfig.host,
            port: dbConfig.port,
            dialect: dbConfig.dialect,
            pool: {
                max: dbConfig.pool.max,
                min: dbConfig.pool.min,
                acquire: dbConfig.pool.acquire,
                idle: dbConfig.pool.idle,
            },
            logging: (msg) => console.debug(msg),
        });
    }

    static async initDb() {
        const sequelize = this.connection;

        const Tutorial = require('./tutorial.model')(Sequelize, sequelize);
        const User = require('./user.model')(Sequelize, sequelize);

        Tutorial.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

        module.exports.Tutorial = Tutorial;
        module.exports.User = User;

        const force = false;
        await sequelize.sync({ force });
        console.info('Database sync completed successfully');

        if (force) {
            await createDummyData({ user: User });
            console.info('Seeder completed successfully');
        }
    }

    static async init() {
        try {
            await this.connect();
            await this.initDb();
            console.info('Database connection OK');
        } catch (err) {
            console.error('Error trying to connect to database');
            let error;
            if (err.name && (err.name === 'SequelizeHostNotFoundError' || err.name === 'SequelizeConnectionError')) {
                console.error('Message:', err.message);
                error = new Error(err.message);
            } else error = new Error(err);

            throw error;
        }
    }
};
