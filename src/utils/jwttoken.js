const fs = require('fs');
const { InternalServerException, BaseError } = require('../exceptions');

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

const getPrivateKey = async () => {
    const path = process.env.JWT_PRIVATE_KEY_PATH || '';
    if (!path) throw new InternalServerException('Private key path configuration is missing');
    return await readKey(path);
};

const getPublicKey = async () => {
    const path = process.env.JWT_PUBLIC_KEY_PATH || '';
    if (!path) throw new InternalServerException('Public key path configuration is missing');
    return await readKey(path);
};

const readKey = async (path) => {
    try {
        const fileExists = await checkIfFileExists(path);
        if (!fileExists) throw new InternalServerException(`File on path: '${path}' does not exist`);
        return await fs.promises.readFile(path, 'utf8');
    } catch (error) {
        if (BaseError.isTrustedError(error)) throw error;
        throw new InternalServerException(`Something went wrong while reading keys on path: '${path}'`, error);
    }
};

const checkIfFileExists = async (path) => !!(await fs.promises.stat(path).catch((e) => false));

const getRandomNumber = () => Math.floor(Math.random() * Date.now());

module.exports = {
    getPrivateKey,
    getPublicKey,
    getRandomNumber,
    userSignOptions,
    tutorialTokenSignOptions,
};
