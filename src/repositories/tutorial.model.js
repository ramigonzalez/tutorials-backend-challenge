module.exports = (Types, sequelize) =>
    sequelize.define(
        'tutorial',
        {
            id: {
                type: Types.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            title: {
                type: Types.STRING,
                allowNull: false,
            },
            video_url: {
                type: Types.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Video URL cannot be null',
                    },
                    notEmpty: {
                        msg: 'Video URL cannot be empty',
                    },
                    isUrl: {
                        msg: 'Invalid Video URL format',
                    },
                },
            },
            description: {
                type: Types.STRING,
            },
            published_status: {
                type: Types.ENUM('PENDING', 'IN PROGRESS', 'PUBLISHED'),
                allowNull: false,
                validate: {
                    isIn: [['PENDING', 'IN PROGRESS', 'PUBLISHED']],
                },
            },
        },
        {
            paranoid: true,
            timestamps: true,
        }
    );
