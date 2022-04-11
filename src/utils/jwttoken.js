const fs = require('fs');
const { InternalServerException } = require('../exceptions');

const userSignOptions = () => {
    const isUser = true;
    return signOptions(isUser);
};

const tutorialTokenSignOptions = () => {
    const isUser = false;
    return signOptions(isUser);
};

const signOptions = (isUser) => {
    const algorithm = process.env.JWT_ALGORITM || '';
    if (!algorithm) throw new InternalServerException('Missing sign option algorithm');

    const expiresIn = isUser
        ? process.env.JWT_USER_TOKEN_EXPIRES_IN || '24h'
        : process.env.JWT_TUTORIAL_TOKEN_EXPIRES_IN || '5m';

    return {
        expiresIn,
        algorithm,
    };
};

const getPrivateKey = () => {
    const path = process.env.JWT_PRIVATE_KEY_PATH || '';
    if (!path) throw new InternalServerException('Private key path configuration is missing');
    return readKey(path);
};

const getPublicKey = () => {
    const path = process.env.JWT_PUBLIC_KEY_PATH || '';
    if (!path) throw new InternalServerException('Public key path configuration is missing');
    return readKey(path);
};

const readKey = (path) => {
    try {
        checkIfFileExists(path);
        return fs.readFileSync(path, 'utf8');
    } catch (error) {
        throw new InternalServerException(
            `Something went wrong while reading keys on path: '${path}'`,
            error
        );
    }
};

const checkIfFileExists = (path) => {
    if (!fs.existsSync(path))
        throw new InternalServerException(`File on path: '${path}' does not exist`);
};

const getRandomNumber = () => Math.floor(Math.random() * Date.now());

module.exports = {
    getPrivateKey,
    getPublicKey,
    getRandomNumber,
    userSignOptions,
    tutorialTokenSignOptions,
};
