const fs = require('fs');

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
    if (!algorithm) throw new Error('Sign algorithm option cannot be null');

    const expiresIn = isUser
        ? process.env.JWT_USER_TOKEN_EXPIRES_IN || '24h'
        : process.env.JWT_TUTORIAL_TOKEN_EXPIRES_IN || '5m';

    return {
        expiresIn,
        algorithm,
    };
};

const checkIfFileExists = (path) => {
    if (!fs.existsSync(path)) throw new Error('File does not exist');
};

const getPrivateKey = () => {
    const path = process.env.JWT_PRIVATE_KEY_PATH || '';
    if (!path) throw new Error('Invalid private key path');
    return readKey(path);
};

const getPublicKey = () => {
    const path = process.env.JWT_PUBLIC_KEY_PATH || '';
    if (!path) throw new Error('Invalid public key path');
    return readKey(path);
};

const readKey = (path) => {
    try {
        checkIfFileExists(path);
        return fs.readFileSync(path, 'utf8');
    } catch (err) {
        console.error('Error:', err.stack);
    }
};

const getRandomNumber = () => Math.floor(Math.random() * Date.now());

module.exports = {
    getPrivateKey,
    getPublicKey,
    getRandomNumber,
    userSignOptions,
    tutorialTokenSignOptions,
};
