const WEB_URL = '^($|(http:\\/\\/|https:\\/\\/)?(www.)?([a-zA-Z0-9]+).[a-zA-Z0-9]*.[a-z]{3}.?([a-z]+)?)$';

module.exports.V2_API_PATH = /\/api\/v2(?:(\/.*)|)/;

module.exports.isValidVideoUrl = (str) => new RegExp(WEB_URL).test(str);
