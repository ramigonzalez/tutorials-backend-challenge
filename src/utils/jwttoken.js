const fs = require('fs')

const signOptions = () => {
    const algorithm = process.env.JWT_ALGORITM || '';
    if(!algorithm) throw new Error('Sign algorithm option cannot be null')

    return {
        expiresIn: process.env.JWT_USER_TOKEN_EXPIRES_IN || '24h',
        algorithm
    } 
}

const checkIfFileExists = (path) => {
    if (!fs.existsSync(path)) throw new Error('File does not exist');
}

const getPrivateKey = () => {
    const path = process.env.JWT_PRIVATE_KEY_PATH || '';
    if (!path) throw new Error('Invalid private key path');
    return readKey(path);
}

const getPublicKey = () => {
    const path = process.env.JWT_PUBLIC_KEY_PATH || '';
    if (!path) throw new Error('Invalid public key path');
    return readKey(path);
}

const readKey = (path) => {
    checkIfFileExists(path);
    return fs.readFileSync(path, 'utf8');
}

const getRandomNumber = () => Math.floor(Math.random() * Date.now());

module.exports = {
    getPrivateKey,
    getPublicKey,
    getRandomNumber,
    signOptions
}