const crypto = require('crypto');

module.exports = (pwd) => crypto.createHash('sha256').update(pwd).digest('base64');