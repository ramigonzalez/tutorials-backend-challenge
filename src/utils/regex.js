const WEB_URL = '^($|(http:\\/\\/|https:\\/\\/)?(www.)?([a-zA-Z0-9]+).[a-zA-Z0-9]*.[a-z]{3}.?([a-z]+)?)$';
const EMAIL_OPTIONAL = '^($|[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+)$';

module.exports.validateEmail = (str) => new RegExp(EMAIL_OPTIONAL).test(str);
module.exports.validateUrl = (str) => new RegExp(WEB_URL).test(str);
