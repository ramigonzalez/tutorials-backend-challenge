module.exports = (req, res, next) => {
    let response = {
        statusCode: res.statusCode,
        data: res.body,
    };
    const pagination = res.pagination || null;
    if (pagination) response = { ...response, pagination };
    res.json(response);
};
