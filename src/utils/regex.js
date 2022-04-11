const WEB_URL = '^($|(http:\\/\\/|https:\\/\\/)?(www.)?([a-zA-Z0-9]+).[a-zA-Z0-9]*.[a-z]{3}.?([a-z]+)?)$';
const EMAIL_OPTIONAL = '^($|[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+)$';

module.exports.V2_API_PATH = /^\/(api\/v2)\/.+$/;

module.exports.isValidEmail = (str) => new RegExp(EMAIL_OPTIONAL).test(str);
module.exports.isValidUrl = (str) => new RegExp(WEB_URL).test(str);
