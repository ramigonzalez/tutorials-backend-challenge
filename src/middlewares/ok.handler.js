module.exports = (req, res, next) => {
    const response = {
        statusCode: res.statusCode,
        data: res.body,
    };
    res.json(response);
};
