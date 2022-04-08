
module.exports = (req, res, next) => {
    const statusCode = res.statusCode;
    res.json({
        statusCode,
        data: res.body,
    });
}