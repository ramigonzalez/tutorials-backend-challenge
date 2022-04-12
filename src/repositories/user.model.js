module.exports = (Types, sequelize) =>
    sequelize.define(
        'users',
        {
            id: {
                type: Types.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            first_name: {
                type: Types.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'User first name cannot be null',
                    },
                    notEmpty: {
                        msg: 'User first name cannot be empty',
                    },
                },
            },
            last_name: {
                type: Types.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'User last name cannot be null',
                    },
                    notEmpty: {
                        msg: 'User last name cannot be empty',
                    },
                },
            },
            email: {
                type: Types.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notNull: {
                        msg: 'User EMAIL cannot be null',
                    },
                    notEmpty: {
                        msg: 'User EMAIL cannot be empty',
                    },
                    isEmail: {
                        msg: 'User EMAIL has incorrect format',
                    },
                },
            },
            password: {
                type: Types.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'User PASSWORD cannot be null',
                    },
                    notEmpty: {
                        msg: 'User PASSWORD cannot be empty',
                    },
                },
            },
            role: {
                type: Types.ENUM('ADMIN', 'USER'),
                allowNull: false,
                validate: {
                    isIn: [['ADMIN', 'USER']],
                },
            },
        },
        {
            timestamps: true,
        }
    );
