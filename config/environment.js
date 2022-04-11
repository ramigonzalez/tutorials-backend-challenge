module.exports.isDevelopmentOrTesting = () => {
    const env = process.env.NODE_ENV;
    return env === 'development' || env === 'test';
};

module.exports.loadConfiguration = () => {
    require('dotenv').config({
        path: resolvePath(),
    });
};

const resolvePath = () => {
    let path;
    switch (process.env.NODE_ENV) {
        case 'test':
            path = './config/test.env';
            break;
        case 'production':
            path = './config/prod.env';
            break;
        default:
            path = './config/dev.env';
    }
    return path;
};
